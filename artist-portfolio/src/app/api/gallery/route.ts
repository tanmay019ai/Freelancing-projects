// /app/api/gallery/route.ts (Portfolio Side)
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

// ✅ POST — Safe update (handles empty slots)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const titles = formData.getAll('title[]') as string[];
    const mediums = formData.getAll('medium[]') as string[];
    const years = formData.getAll('year[]') as string[];
    const files = formData.getAll('image[]');

    const totalSlots = 6;
    const updates = [];

    for (let i = 0; i < totalSlots; i++) {
      const file = files[i];
      let image_url: string | null = null;

      // ✅ Only upload valid images (skip placeholders or empty blobs)
      if (file instanceof File && file.size > 0 && file.type.startsWith('image/')) {
        const fileName = `gallery/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('artworks')
          .upload(fileName, file, { upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('artworks')
          .getPublicUrl(fileName);

        image_url = urlData.publicUrl;
      }

      // ✅ Prepare slot update data
      const updateData: Record<string, any> = {
        title: titles[i] || '',
        medium: mediums[i] || '',
        year: years[i] || '',
      };

      if (image_url) updateData.image_url = image_url;

      // ✅ Upsert ensures it creates if missing, updates if exists
      const { error: upsertError } = await supabase
        .from('gallery')
        .upsert({ id: i + 1, ...updateData }, { onConflict: 'id' });

      if (upsertError) throw upsertError;

      updates.push({ slot: i + 1, ...updateData });
    }

    return NextResponse.json({
      success: true,
      message: '✅ Gallery updated successfully!',
      updated: updates.length,
    });
  } catch (err) {
    console.error('❌ Gallery POST error (portfolio side):', err);
    return NextResponse.json(
      {
        success: false,
        message: (err as Error).message || 'Failed to update gallery',
      },
      { status: 500 }
    );
  }
}
