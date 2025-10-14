// artista/app/api/contact/route.ts
import { NextResponse } from 'next/server';

let contacts: Array<{ id: number; name: string; email: string; message: string; createdAt: string }> = [];

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const id = contacts.length + 1;
    const item = { id, name, email, message, createdAt: new Date().toISOString() };
    contacts.unshift(item); // newest first
    return NextResponse.json({ success: true, item });
  } catch (err) {
    console.error('/api/contact POST error', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  // Return all (admin will call this)
  return NextResponse.json({ success: true, contacts });
}
