// /app/api/gallery/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ✅ Create Supabase client using environment variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('❌ SUPABASE_URL or SUPABASE_KEY is missing in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET — Fetch all artworks for portfolio display
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('id, title, medium, year, image_url')
      .order('id', { ascending: true });

    if (error) throw error;
    if (!data) throw new Error('No data returned from Supabase.');

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('❌ Gallery API GET error:', err);
    return NextResponse.json(
      { success: false, message: (err as Error).message || 'Failed to load gallery' },
      { status: 500 }
    );
  }
}

/**
 * POST — Upload artworks and metadata from admin panel
 */
export async function POST(req: Request) {
  try {
    // Parse FormData from admin panel
    const formData = await req.formData();
    const titles = formData.getAll('title[]') as string[];
    const mediums = formData.getAll('medium[]') as string[];
    const years = formData.getAll('year[]') as string[];
    const files = formData.getAll('image[]') as File[];

    if (!titles.length && !files.length) {
      return NextResponse.json(
        { success: false, message: 'No gallery data provided.' },
        { status: 400 }
      );
    }

    const savedRecords = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let image_url = '';

      // Upload image file to Supabase Storage
      if (file && file.size > 0) {
        const fileName = `gallery/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('artworks') // your Supabase bucket name
          .upload(fileName, file, { upsert: false }); // no overwriting

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('artworks')
          .getPublicUrl(fileName);

        image_url = urlData.publicUrl;
      }

      // Save record in "gallery" table
      const record = {
        title: titles[i] || '',
        medium: mediums[i] || '',
        year: years[i] || '',
        image_url,
      };

      const { error: insertError } = await supabase.from('gallery').insert(record);
      if (insertError) throw insertError;

      savedRecords.push(record);
    }

    return NextResponse.json({
      success: true,
      message: '✅ Gallery items uploaded successfully.',
      saved: savedRecords.length,
    });
  } catch (err) {
    console.error('❌ Gallery API POST error:', err);
    return NextResponse.json(
      { success: false, message: (err as Error).message || 'Failed to save gallery data' },
      { status: 500 }
    );
  }
}
