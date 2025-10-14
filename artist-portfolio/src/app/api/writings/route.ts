import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase client (service role key recommended for admin operations)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// GET — fetch writings
export async function GET() {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      throw new Error('Supabase URL or KEY is missing in environment variables.');
    }

    const { data, error } = await supabase
      .from('writings')
      .select('id, title, type, date, content')
      .order('id', { ascending: true });

    if (error) throw error;
    if (!data) throw new Error('No data returned from Supabase.');

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('❌ Portfolio API GET error:', err);
    return NextResponse.json(
      { success: false, message: (err as Error).message || 'Failed to load writings' },
      { status: 500 }
    );
  }
}

// POST — update or insert writings
export async function POST(req: Request) {
  try {
    const { writings } = await req.json();

    if (!Array.isArray(writings)) {
      return NextResponse.json(
        { success: false, message: 'Invalid writings array' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('writings')
      .upsert(writings, { onConflict: 'id' });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Writings updated successfully' });
  } catch (err) {
    console.error('❌ Portfolio API POST error:', err);
    return NextResponse.json(
      { success: false, message: (err as Error).message || 'Failed to update writings' },
      { status: 500 }
    );
  }
}
