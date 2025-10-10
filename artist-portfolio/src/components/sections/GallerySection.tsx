'use client';

import { useState } from 'react';
import GalleryItem from '../gallery/GalleryItem';

interface GallerySectionProps {
  scrollY: number;
}

const artworks = [
  {
    id: 1,
    title: 'Golden Horizons',
    medium: 'Acrylic on Canvas',
    year: '2024',
    image: 'https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Whispers of Time',
    medium: 'Oil on Canvas',
    year: '2024',
    image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Urban Dreams',
    medium: 'Mixed Media',
    year: '2023',
    image: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Silent Echo',
    medium: 'Acrylic on Canvas',
    year: '2023',
    image: 'https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    title: 'Ethereal Dance',
    medium: 'Oil on Canvas',
    year: '2024',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    title: 'Autumn Reverie',
    medium: 'Acrylic on Canvas',
    year: '2023',
    image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function GallerySection({ scrollY }: GallerySectionProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);

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
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </div>
      </div>

      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="max-w-5xl w-full">
            <img
              src={selectedArtwork.image}
              alt={selectedArtwork.title}
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-light text-white mb-2">
                {selectedArtwork.title}
              </h3>
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
