import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './client';
import { Post, Project, Message } from '@/lib/types';

const postsCol = collection(db, 'posts');
const projectsCol = collection(db, 'projects');

export async function getPublishedPosts(): Promise<Post[]> {
  const q = query(postsCol, where('published', '==', true), orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Post));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(postsCol, where('slug', '==', slug), where('published', '==', true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Post;
}

export async function getProjects(): Promise<Project[]> {
  const q = query(projectsCol, orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
}

export async function submitContactMessage(data: Omit<Message, 'id' | 'createdAt' | 'read'>) {
  return addDoc(collection(db, 'messages'), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
}
