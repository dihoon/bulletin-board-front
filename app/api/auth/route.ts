import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const refreshToken = cookies().get('refreshToken')?.value || '';
  return NextResponse.json(refreshToken);
}
