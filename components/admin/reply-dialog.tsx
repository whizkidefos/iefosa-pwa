'use client';

import { useState } from 'react';
import { Message } from '@/lib/types';
import { sendReply } from '@/lib/firebase/admin-client-services';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ReplyDialogProps {
  message: Message;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSent: () => void;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function ReplyDialog({ message, open, onOpenChange, onSent }: ReplyDialogProps) {
  const [subject, setSubject] = useState('Re: Your message to Efosa');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const send = async () => {
    if (!body.trim()) {
      toast.error('Write a reply first');
      return;
    }
    setSending(true);
    try {
      const html = `<p style="font-family:sans-serif">${escapeHtml(body).replace(/\n/g, '<br>')}</p>
        <p style="font-family:sans-serif">— Efosa<br><a href="https://iefosa.me">iefosa.me</a></p>`;
      await sendReply({ to: message.email, subject, text: body, html, messageId: message.id });
      toast.success('Reply queued for delivery');
      setBody('');
      onOpenChange(false);
      onSent();
    } catch (e) {
      toast.error('Failed to send reply');
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reply to {message.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>To</Label>
            <Input value={message.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-subject">Subject</Label>
            <Input
              id="reply-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-body">Message</Label>
            <Textarea
              id="reply-body"
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your reply…"
            />
          </div>
          <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
            Replying to: “{message.message.slice(0, 140)}
            {message.message.length > 140 ? '…' : ''}”
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={send} disabled={sending}>
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reply'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
