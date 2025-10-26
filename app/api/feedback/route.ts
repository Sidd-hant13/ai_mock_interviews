import { NextResponse } from 'next/server';
import { createFeedback } from '@/lib/actions/general.action';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createFeedback(body);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { success: false, error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}
