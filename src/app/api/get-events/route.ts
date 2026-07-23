import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export type EventsData = {
  name: string;
  event_type: string;
}[];

export async function GET() {
  try {
    const result: EventsData = await sql`
      SELECT * 
      FROM event s
    `;

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('Get event error:', err);
    return new NextResponse();
  }
}
