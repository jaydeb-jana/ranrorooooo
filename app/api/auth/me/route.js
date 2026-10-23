import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user });
  } catch (err) {
    console.error('[Auth Me Error]:', err);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
