import { NextResponse } from 'next/server';
import { messages } from '@/lib/firebase/admin-services';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ref = await messages.add({
      name,
      email,
      message,
      read: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: ref.id, success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}