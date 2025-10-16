'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Artwork {
  id: number;
  title: string;
  medium: string;
  year: string;
  image_url: string; // Updated to match API
}

interface GalleryItemProps {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}

export default function GalleryItem({ artwork, index, onClick }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="button"
      aria-label={`View artwork: ${artwork.title}`}
      className="group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-3xl bg-stone-200 aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500">
        <Image
          src={artwork.image_url} // updated property
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={index < 3} // prioritize first few images
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
            <h3 className="text-2xl font-light text-white mb-2 tracking-wide">
              {artwork.title}
            </h3>
            <p className="text-stone-300 text-sm tracking-wider">{artwork.medium}</p>
            <p className="text-amber-500 text-sm tracking-wider mt-1">{artwork.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
