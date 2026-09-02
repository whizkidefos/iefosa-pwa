import { adminDb } from './admin';
import { Post, Project, Message } from '@/lib/types';

const posts = adminDb.collection('posts');
const projects = adminDb.collection('projects');
const messagesCol = adminDb.collection('messages');
const users = adminDb.collection('users');

export const messages = messagesCol;

const now = () => new Date().toISOString();

export async function getAllPosts(): Promise<Post[]> {
  const snap = await posts.orderBy('date', 'desc').get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Post));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const snap = await posts.where('slug', '==', slug).where('published', '==', true).limit(1).get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Post;
}

export async function createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
  const t = now();
  const ref = posts.doc();
  await ref.set({ ...data, createdAt: t, updatedAt: t });
  return ref.id;
}

export async function updatePost(id: string, data: Partial<Post>) {
  await posts.doc(id).update({ ...data, updatedAt: now() });
}

export async function deletePost(id: string) {
  await posts.doc(id).delete();
}

export async function getAllProjects(): Promise<Project[]> {
  const snap = await projects.orderBy('order', 'asc').get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
  const t = now();
  const ref = projects.doc();
  await ref.set({ ...data, createdAt: t, updatedAt: t });
  return ref.id;
}

export async function updateProject(id: string, data: Partial<Project>) {
  await projects.doc(id).update({ ...data, updatedAt: now() });
}

export async function deleteProject(id: string) {
  await projects.doc(id).delete();
}

export async function getAllMessages(): Promise<Message[]> {
  const snap = await messagesCol.orderBy('createdAt', 'desc').get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message));
}

export async function markMessageRead(id: string) {
  await messagesCol.doc(id).update({ read: true, updatedAt: now() });
}

export async function deleteMessage(id: string) {
  await messagesCol.doc(id).delete();
}

export async function getAdminUser(uid: string) {
  const d = await users.doc(uid).get();
  if (!d.exists) return null;
  return d.data() as { email: string; role: string };
}
