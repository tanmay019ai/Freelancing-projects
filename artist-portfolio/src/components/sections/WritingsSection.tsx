'use client';

import { useState } from 'react';

interface Writing {
  id: number;
  title: string;
  type: string; // e.g., Shayari, Poem, Essay
  date: string;
  content: string;
}

interface WritingItemProps {
  writing: Writing;
  index: number;
  onClick: () => void;
}

export default function WritingItem({ writing, index, onClick }: WritingItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer animate-fade-in-up"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl bg-stone-100 shadow-lg p-6 hover:shadow-2xl transition-all duration-500">
        <h3 className="text-2xl font-semibold text-stone-900 mb-2 tracking-wide">
          {writing.title}
        </h3>
        <p className="text-amber-600 text-sm mb-2">{writing.type}</p>
        <p className="text-stone-400 text-xs mb-4">{writing.date}</p>
        <div
          className={`text-stone-700 leading-relaxed text-base transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-90'
          }`}
        >
          {writing.content}
        </div>
      </div>
    </div>
  );
}

interface WritingsSectionProps {
  writings: Writing[];
}

export function WritingsSection({ writings }: WritingsSectionProps) {
  return (
    <section id="writings" className="py-32 px-6 lg:px-12 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Writings
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-transparent mx-auto rounded-full mb-8" />
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Explore my thoughts, shayaris, and writings. Each piece is a window into my creative world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {writings.map((writing, index) => (
            <WritingItem
              key={writing.id}
              writing={writing}
              index={index}
              onClick={() => alert(`Selected: ${writing.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Example usage with 6 writings
export const sampleWritings: Writing[] = [
  {
    id: 1,
    title: 'Raindrops of Thought',
    type: 'Shayari',
    date: '2024-09-01',
    content: 'Every drop of rain whispers a story, and my heart listens silently.',
  },
  {
    id: 2,
    title: 'Silent Streets',
    type: 'Poem',
    date: '2024-08-20',
    content: 'In the stillness of empty streets, memories echo louder than voices.',
  },
  {
    id: 3,
    title: 'Colors Unspoken',
    type: 'Shayari',
    date: '2024-07-15',
    content: 'Some colors speak only in silence, painting emotions words cannot.',
  },
  {
    id: 4,
    title: 'Fading Horizon',
    type: 'Essay',
    date: '2024-06-10',
    content: 'The horizon fades, yet hope remains painted in gold.',
  },
  {
    id: 5,
    title: 'Whispers of Wind',
    type: 'Shayari',
    date: '2024-05-05',
    content: 'Wind carries secrets, soft and fleeting, only hearts can understand.',
  },
  {
    id: 6,
    title: 'Moonlit Solitude',
    type: 'Poem',
    date: '2024-04-01',
    content: 'Under the moon, solitude becomes a companion, gentle and wise.',
  },
];
