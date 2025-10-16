// /app/api/gallery/route.ts (Portfolio)
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

interface GalleryRecord {
  id: number;
  title: string;
  medium: string;
  year: string;
  image_url?: string | null;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    const filled: GalleryRecord[] = Array.from({ length: 6 }, (_, i) => {
      const found = data?.find((item) => item.id === i + 1);
      return (
        found || {
          id: i + 1,
          title: '',
          medium: '',
          year: '',
          image_url: null,
        }
      );
    });

    return NextResponse.json({ success: true, data: filled });
  } catch (err) {
    console.error('❌ Gallery GET error:', err);
    return NextResponse.json(
      { success: false, message: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const titles = formData.getAll('title[]') as string[];
    const mediums = formData.getAll('medium[]') as string[];
    const years = formData.getAll('year[]') as string[];
    const files = formData.getAll('image[]');

    console.log('📥 Received data:', {
      titles,
      mediums,
      years,
      fileCount: files.length,
    });

    const totalSlots = 6;
    const updates: GalleryRecord[] = [];

    for (let i = 0; i < totalSlots; i++) {
      const file = files[i];
      let image_url: string | null = null;

      // ✅ Upload only valid images
      if (file instanceof File && file.size > 0 && file.type.startsWith('image/')) {
        const fileName = `gallery/${Date.now()}_${file.name}`;
        console.log(`🆙 Uploading file to Supabase: ${fileName}`);

        const { error: uploadError } = await supabase.storage
          .from('artworks') // ✅ your actual bucket
          .upload(fileName, file, { upsert: true });

        if (uploadError) {
          console.error('❌ Supabase upload error:', uploadError);
          throw new Error(uploadError.message);
        }

        const { data: urlData } = supabase.storage
          .from('artworks')
          .getPublicUrl(fileName);

        image_url = urlData?.publicUrl ?? null;
      }

      const record: GalleryRecord = {
        id: i + 1,
        title: titles[i] || '',
        medium: mediums[i] || '',
        year: years[i] || '',
      };
      if (image_url) record.image_url = image_url;

      console.log(`💾 Upserting slot ${i + 1}`, record);

      const { error: upsertError } = await supabase
        .from('gallery')
        .upsert(record, { onConflict: 'id' });

      if (upsertError) {
        console.error('❌ Supabase upsert error:', upsertError);
        throw new Error(upsertError.message);
      }

      updates.push(record);
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
        message:
          err instanceof Error ? err.message : 'Unknown error updating gallery',
      },
      { status: 500 }
    );
  }
}
