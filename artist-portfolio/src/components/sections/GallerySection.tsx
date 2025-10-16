'use client';

import { useState, useEffect, useCallback } from 'react';
import GalleryItem from '../gallery/GalleryItem';
import Image from 'next/image';
import axios from 'axios';

interface GallerySectionProps {
  scrollY: number;
  refreshTrigger?: number; // ✅ optional prop to re-fetch when Navigation triggers refresh
}

interface Artwork {
  id: number;
  title: string;
  medium: string;
  year: string;
  image_url: string | null;
}

export default function GallerySection({ scrollY, refreshTrigger }: GallerySectionProps) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logic wrapped in useCallback
  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ success: boolean; data?: Artwork[] }>('/api/gallery');

      if (res.data.success && res.data.data) {
        // Fill exactly 6 slots (Image 1 → Card 1)
        const filled = Array.from({ length: 6 }, (_, i) => {
          const found = res.data.data.find((item) => item.id === i + 1);
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
        setArtworks(filled);
      } else {
        console.error('❌ Failed to load gallery:', res.data);
      }
    } catch (err) {
      console.error('❌ Gallery fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Load on mount
  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // ✅ Refresh trigger from Navigation
  useEffect(() => {
    if (refreshTrigger !== undefined) {
      fetchGallery();
    }
  }, [refreshTrigger, fetchGallery]);

  if (loading) {
    return (
      <section id="gallery" className="py-32 px-6 lg:px-12 text-center">
        <p className="text-stone-500">Loading gallery...</p>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Selected Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {artworks.map((artwork, index) => (
            <GalleryItem
              key={artwork.id}
              artwork={artwork}
              index={index}
              onClick={() => artwork.image_url && setSelectedArtwork(artwork)}
            />
          ))}
        </div>
      </div>

      {selectedArtwork && selectedArtwork.image_url && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Artwork: ${selectedArtwork.title}`}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="max-w-5xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedArtwork.image_url}
              alt={selectedArtwork.title || 'Artwork'}
              width={1200}
              height={1600}
              className="w-full h-auto rounded-3xl shadow-2xl"
              priority
            />
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-light text-white mb-2">
                {selectedArtwork.title || 'Untitled'}
              </h3>
              <p className="text-stone-300">
                {selectedArtwork.medium || '—'} • {selectedArtwork.year || '—'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
