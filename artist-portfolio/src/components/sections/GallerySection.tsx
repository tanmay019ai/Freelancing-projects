'use client';

import { useState, useEffect } from 'react';
import GalleryItem from '../gallery/GalleryItem';
import Image from 'next/image';
import axios from 'axios';

interface GallerySectionProps {
  scrollY: number;
}

interface Artwork {
  id: number;
  title: string;
  medium: string;
  year: string;
  image_url: string; // URL from Supabase storage
}

export default function GallerySection({ scrollY }: GallerySectionProps) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get<{ success: boolean; data?: Artwork[]; message?: string }>('/api/gallery');
        if (res.data.success) {
          setArtworks(res.data.data || []); // assuming your route returns { success, data }
        } else {
          console.error('Failed to load gallery:', res.data.message);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

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
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Selected Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {artworks.map((artwork, index) => (
            <GalleryItem
              key={artwork.id}
              artwork={artwork}
              index={index}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {selectedArtwork && (
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
              alt={selectedArtwork.title}
              width={1200}
              height={1600}
              className="w-full h-auto rounded-3xl shadow-2xl"
              priority
            />
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-light text-white mb-2">{selectedArtwork.title}</h3>
              <p className="text-stone-300">
                {selectedArtwork.medium} • {selectedArtwork.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
