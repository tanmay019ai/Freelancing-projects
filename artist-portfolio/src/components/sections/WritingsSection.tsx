'use client';

import { useState, useEffect } from 'react';

interface Writing {
  id: number;
  title?: string;
  type?: string;
  date?: string;
  content?: string;
}

interface WritingItemProps {
  writing: Writing;
  index: number;
  onClick: () => void;
}

function WritingItem({ writing, index, onClick }: WritingItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 🗓️ Safe date formatting
  const formattedDate = writing.date
    ? new Date(writing.date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Date not provided';

  // 🧠 Fallbacks for all fields
  const title = writing.title?.trim() || 'Untitled Writing';
  const type = writing.type?.trim() || 'Unspecified Type';
  const content = writing.content?.trim() || 'No content available.';

  return (
    <div
      className="group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl bg-stone-100 shadow-lg p-6 hover:shadow-2xl transition-all duration-500">
        <h3 className="text-2xl font-semibold text-stone-900 mb-2 tracking-wide">{title}</h3>
        <p className="text-amber-600 text-sm mb-2">{type}</p>
        <p className="text-stone-400 text-xs mb-4">{formattedDate}</p>
        <div
          className={`text-stone-700 leading-relaxed text-base transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-90'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export default function WritingsSection({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [writings, setWritings] = useState<Writing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Fetch writings data
  async function fetchWritings() {
    try {
      setLoading(true);
      const res = await fetch('/api/writings', { cache: 'no-store' });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to load writings');
      }

      setWritings(data.data);
    } catch (err) {
      console.error('Error fetching writings:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWritings();
  }, [refreshTrigger]); // ✅ Refetch on refreshTrigger change

  // 🕓 Loading
  if (loading) {
    return (
      <section id="writings" className="py-32 px-6 lg:px-12 text-center">
        <p className="text-stone-500 text-lg">Loading writings...</p>
      </section>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <section id="writings" className="py-32 px-6 lg:px-12 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </section>
    );
  }

  // ✅ Loaded
  return (
    <section id="writings" className="py-32 px-6 lg:px-12 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Writings
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-transparent mx-auto rounded-full mb-8" />
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Explore my thoughts, shayaris, and writings — each piece a window into my creative world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {writings.map((writing, index) => (
            <WritingItem
              key={writing.id}
              writing={writing}
              index={index}
              onClick={() => alert(`Selected: ${writing.title || 'Untitled Writing'}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
