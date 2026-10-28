import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret, defineString } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as nodemailer from 'nodemailer';
import * as logger from 'firebase-functions/logger';

initializeApp();
const db = getFirestore();

const REGION = 'us-central1';

const smtpHost = defineString('SMTP_HOST', { default: 'smtp.hostinger.com' });
const smtpPort = defineString('SMTP_PORT', { default: '465' });
const smtpUser = defineString('SMTP_USER', { default: 'me@iefosa.me' });
const smtpPass = defineSecret('SMTP_PASS');
const mailFrom = defineString('MAIL_FROM', { default: 'Efosa <me@iefosa.me>' });
const adminEmail = defineString('ADMIN_EMAIL', { default: 'me@iefosa.me' });
const siteUrl = defineString('SITE_URL', { default: 'https://iefosa.me' });

interface MailDoc {
  to?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  from?: string;
  replyTo?: string;
  message?: {
    subject?: string;
    text?: string;
    html?: string;
  };
}

const now = () => new Date().toISOString();

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function buildTransport() {
  return nodemailer.createTransport({
    host: smtpHost.value(),
    port: Number(smtpPort.value() || '465'),
    secure: Number(smtpPort.value() || '465') === 465,
    auth: { user: smtpUser.value(), pass: smtpPass.value() },
  });
}

function enqueueMail(mail: MailDoc & Record<string, unknown>) {
  return db.collection('mail').add({
    ...mail,
    createdAt: now(),
    delivery: { state: 'PENDING', attempts: 0 },
  });
}

/**
 * Delivers documents written to the `mail` collection — a self-managed
 * replacement for the deprecated firestore-send-email (Trigger Email) extension.
 */
export const processMailQueue = onDocumentCreated(
  {
    document: 'mail/{mailId}',
    region: REGION,
    secrets: [smtpPass],
    retry: true,
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const ref = snap.ref;
    const mail = snap.data() as MailDoc;
    const attempts = (snap.get('delivery.attempts') as number | undefined) || 0;

    await ref.update({
      'delivery.state': 'PROCESSING',
      'delivery.attempts': attempts + 1,
      'delivery.startTime': now(),
    });

    if (!mail.to || !mail.message?.subject || (!mail.message.text && !mail.message.html)) {
      await ref.update({
        'delivery.state': 'ERROR',
        'delivery.error': 'Missing to/subject/body',
        'delivery.endTime': now(),
      });
      logger.error('Invalid mail doc, not retrying', { mailId: ref.id });
      return;
    }

    try {
      const info = await buildTransport().sendMail({
        from: mail.from || mailFrom.value(),
        to: mail.to,
        cc: mail.cc,
        bcc: mail.bcc,
        replyTo: mail.replyTo,
        subject: mail.message.subject,
        text: mail.message.text,
        html: mail.message.html,
      });
      await ref.update({
        'delivery.state': 'SUCCESS',
        'delivery.info': {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected,
        },
        'delivery.endTime': now(),
      });
      logger.info('Mail delivered', { mailId: ref.id, to: mail.to });
    } catch (err) {
      logger.error('Mail delivery failed', { mailId: ref.id, err });
      await ref.update({
        'delivery.state': 'ERROR',
        'delivery.error': err instanceof Error ? err.message : String(err),
        'delivery.endTime': now(),
      });
      throw err;
    }
  }
);

/**
 * When a contact-form message lands in `messages`, queue a notification
 * email to the site owner and an acknowledgement to the visitor.
 */
export const onMessageCreated = onDocumentCreated(
  { document: 'messages/{messageId}', region: REGION },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;
    const { name, email, message } = data as { name: string; email: string; message: string };
    const safeName = escapeHtml(name || 'there');
    const safeEmail = escapeHtml(email || '');
    const safeMessage = escapeHtml(message || '').replace(/\n/g, '<br>');

    await enqueueMail({
      to: adminEmail.value(),
      replyTo: email,
      message: {
        subject: `New contact message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `
          <h2 style="font-family:sans-serif">New contact message</h2>
          <p style="font-family:sans-serif"><b>From:</b> ${safeName} &lt;${safeEmail}&gt;</p>
          <p style="font-family:sans-serif;white-space:pre-wrap">${safeMessage}</p>
          <p style="font-family:sans-serif"><a href="${siteUrl.value()}/admin">Open admin portal</a></p>
        `,
      },
    });

    await enqueueMail({
      to: email,
      message: {
        subject: 'Thanks for reaching out',
        text: `Hi ${name},\n\nThanks for your message — I've received it and will get back to you soon.\n\n— Efosa\n${siteUrl.value()}`,
        html: `
          <p style="font-family:sans-serif">Hi ${safeName},</p>
          <p style="font-family:sans-serif">Thanks for your message — I've received it and will get back to you soon.</p>
          <p style="font-family:sans-serif">— Efosa<br><a href="${siteUrl.value()}">${siteUrl.value()}</a></p>
        `,
      },
    });
  }
);

/**
 * Admin-only callable to send a reply email (queued through `mail` so
 * delivery is tracked). Optionally flags the source message as replied.
 */
export const sendMail = onCall({ region: REGION }, async (request) => {
  if (request.auth?.token?.admin !== true) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }

  const { to, subject, text, html, replyTo, messageId } = request.data as {
    to?: string;
    subject?: string;
    text?: string;
    html?: string;
    replyTo?: string;
    messageId?: string;
  };

  if (!to || !subject || (!text && !html)) {
    throw new HttpsError('invalid-argument', 'to, subject and a body are required.');
  }

  const ref = await enqueueMail({ to, replyTo, message: { subject, text, html } });

  if (messageId) {
    await db
      .collection('messages')
      .doc(messageId)
      .update({ replied: true, updatedAt: now() });
  }

  return { mailId: ref.id };
});
