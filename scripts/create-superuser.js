require('dotenv').config({ path: '.env' });

const fs = require('fs');
const path = require('path');
const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

function loadServiceAccount() {
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
    const fullPath = path.resolve(process.cwd(), filePath);
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  }

  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 or FIREBASE_SERVICE_ACCOUNT_PATH.');
}

const email = process.env.SUPERUSER_EMAIL;
const password = process.env.SUPERUSER_INITIAL_PASSWORD;

if (!email || !password) {
  throw new Error('Missing SUPERUSER_EMAIL or SUPERUSER_INITIAL_PASSWORD');
}

const serviceAccount = loadServiceAccount();

const app = getApps().length === 0
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

async function main() {
  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log('User already exists:', user.uid);
  } catch {
    user = await auth.createUser({ email, password });
    console.log('Created superuser:', user.uid);
  }

  await auth.setCustomUserClaims(user.uid, { admin: true });
  await db.collection('users').doc(user.uid).set(
    {
      email,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  console.log('Superuser is ready:', email);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
