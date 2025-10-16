// /app/api/gallery/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// ✅ GET — Fetch all artworks for portfolio display
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('❌ Gallery GET error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to load gallery' },
      { status: 500 }
    );
  }
}

// ✅ POST — Only update provided slots, keep others intact
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const titles = formData.getAll('title[]') as string[];
    const mediums = formData.getAll('medium[]') as string[];
    const years = formData.getAll('year[]') as string[];
    const files = formData.getAll('image[]') as File[];

    // Ensure exactly 6 records (slots)
    const totalSlots = 6;
    const updates = [];

    for (let i = 0; i < totalSlots; i++) {
      const file = files[i];
      let image_url: string | null = null;

      // ✅ Upload only if a new file was provided
      if (file && file.size > 0) {
        const fileName = `gallery/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('artworks') // your Supabase bucket name
          .upload(fileName, file, { upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('artworks')
          .getPublicUrl(fileName);

        image_url = urlData.publicUrl;
      }

      // ✅ Build slot update object
      const updateData: {
        title: string;
        medium: string;
        year: string;
        image_url?: string | null;
      } = {
        title: titles[i] || '',
        medium: mediums[i] || '',
        year: years[i] || '',
      };

      if (image_url) {
        updateData.image_url = image_url;
      }

      // ✅ Only update the slot that changed
      const { error } = await supabase
        .from('gallery')
        .update(updateData)
        .eq('id', i + 1);

      if (error) throw error;

      updates.push({ slot: i + 1, ...updateData });
    }

    return NextResponse.json({
      success: true,
      message: '✅ Gallery updated successfully!',
      updated: updates.length,
    });
  } catch (err) {
    console.error('❌ Gallery POST error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update gallery' },
      { status: 500 }
    );
  }
}
