'use client';

import { useState } from 'react';
import Image from 'next/image';

// ✅ Match the same Artwork interface used in GallerySection
interface Artwork {
  id: number;
  title: string;
  medium: string;
  year: string;
  image_url: string | null; // can be null from Supabase
  order?: number; // optional (not required)
}

interface GalleryItemProps {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}

export default function GalleryItem({ artwork, index, onClick }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Safe image check
  const hasImage = Boolean(artwork.image_url && artwork.image_url.trim() !== '');

  return (
    <div
      role="button"
      aria-label={`View artwork: ${artwork.title || `Image ${artwork.id}`}`}
      className="group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => hasImage && onClick()}
    >
      <div className="relative overflow-hidden rounded-3xl bg-stone-200 aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500">
        {hasImage ? (
          <Image
            src={artwork.image_url!}
            alt={artwork.title || `Artwork ${artwork.id}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={index < 3}
          />
        ) : (
          // ✅ Placeholder (for empty slots)
          <div className="flex items-center justify-center w-full h-full bg-stone-300 text-stone-500 text-sm font-medium">
            No Image Available
          </div>
        )}

        {/* ✅ Overlay text (title, medium, year) */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
            <h3 className="text-2xl font-light text-white mb-2 tracking-wide">
              {artwork.title?.trim() || `Image #${artwork.id}`}
            </h3>
            <p className="text-stone-300 text-sm tracking-wider">
              {artwork.medium?.trim() || '—'}
            </p>
            <p className="text-amber-500 text-sm tracking-wider mt-1">
              {artwork.year?.trim() || '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
