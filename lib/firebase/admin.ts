import { readFileSync } from 'fs';
import { resolve } from 'path';
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

function loadServiceAccount(): Record<string, unknown> {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (base64) {
    try {
      return JSON.parse(base64);
    } catch {
      try {
        return JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
      } catch {
        if (!filePath) throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not valid JSON or base64.');
      }
    }
  }

  if (filePath) {
    const fullPath = resolve(process.cwd(), filePath);
    return JSON.parse(readFileSync(fullPath, 'utf8'));
  }

  throw new Error(
    'Missing Firebase service account. Set either FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 or FIREBASE_SERVICE_ACCOUNT_PATH.'
  );
}

const serviceAccount = loadServiceAccount();

const app: App = getApps().length === 0
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApps()[0];

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
