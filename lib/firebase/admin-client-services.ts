import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import { db, storage, functions } from './client';
import { Post, Project, Message, MailDoc } from '@/lib/types';

const postsCol = collection(db, 'posts');
const projectsCol = collection(db, 'projects');
const messagesCol = collection(db, 'messages');
const mailCol = collection(db, 'mail');

const now = () => new Date().toISOString();

// Posts
export async function getAdminPosts(): Promise<Post[]> {
  const snap = await getDocs(query(postsCol, orderBy('date', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Post));
}

export async function createAdminPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
  const ref = await addDoc(postsCol, { ...data, createdAt: now(), updatedAt: now() });
  return ref.id;
}

export async function updateAdminPost(id: string, data: Partial<Post>) {
  await updateDoc(doc(postsCol, id), { ...data, updatedAt: now() });
}

export async function deleteAdminPost(id: string) {
  await deleteDoc(doc(postsCol, id));
}

// Projects
export async function getAdminProjects(): Promise<Project[]> {
  const snap = await getDocs(query(projectsCol, orderBy('order', 'asc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
}

export async function createAdminProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
  const ref = await addDoc(projectsCol, { ...data, createdAt: now(), updatedAt: now() });
  return ref.id;
}

export async function updateAdminProject(id: string, data: Partial<Project>) {
  await updateDoc(doc(projectsCol, id), { ...data, updatedAt: now() });
}

export async function deleteAdminProject(id: string) {
  await deleteDoc(doc(projectsCol, id));
}

// Messages
export async function getAdminMessages(): Promise<Message[]> {
  const snap = await getDocs(query(messagesCol, orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message));
}

export async function markAdminMessageRead(id: string) {
  await updateDoc(doc(messagesCol, id), { read: true, updatedAt: now() });
}

export async function deleteAdminMessage(id: string) {
  await deleteDoc(doc(messagesCol, id));
}

// Mail log
export async function getAdminMail(): Promise<MailDoc[]> {
  const snap = await getDocs(query(mailCol, orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as MailDoc));
}

interface SendReplyData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  messageId?: string;
}

// Admin reply — routed through the sendMail callable so delivery is tracked
export async function sendReply(data: SendReplyData) {
  const callable = httpsCallable<SendReplyData, { mailId: string }>(functions, 'sendMail');
  const res = await callable(data);
  return res.data;
}

export async function uploadImage(file: File, folder = 'images'): Promise<string> {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
