import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";
dotenv.config();

// ✅ Create Supabase client with service role key (server-side only)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// ✅ GET — return the "about" record
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;

    const formatted = {
      name: data.name,
      bio1: data.bio1,
      bio2: data.bio2,
      bio3: data.bio3,
      stats: {
        years: data.years,
        exhibitions: data.exhibitions,
        collectors: data.collectors,
      },
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    console.error('❌ GET /api/about error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to load data' },
      { status: 500 }
    );
  }
}

// ✅ POST — update "about" record
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Flatten stats to avoid undefined keys
    const updateData = {
      name: body.name ?? null,
      bio1: body.bio1 ?? null,
      bio2: body.bio2 ?? null,
      bio3: body.bio3 ?? null,
      years: body.stats?.years ?? body.years ?? null,
      exhibitions: body.stats?.exhibitions ?? body.exhibitions ?? null,
      collectors: body.stats?.collectors ?? body.collectors ?? null,
    };

    // ✅ Make sure the update actually modifies data
    const { data, error } = await supabase
      .from('about')
      .update(updateData)
      .eq('id', 1)
      .select(); // returning updated row triggers realtime properly

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'About updated successfully',
      data: data?.[0],
    });
  } catch (error) {
    console.error('❌ POST /api/about error:', error);
    return NextResponse.json(
      { success: false, message: 'Update failed' },
      { status: 500 }
    );
  }
}
