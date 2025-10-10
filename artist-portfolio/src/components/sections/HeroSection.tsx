'use client';

import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  scrollY: number;
}

export default function HeroSection({ scrollY }: HeroSectionProps) {
  const parallaxOffset = scrollY * 0.5;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          backgroundImage: `radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, #d97706 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 text-center max-w-5xl">
        <div className="overflow-hidden mb-6">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-stone-900 animate-fade-in-up"
            style={{
              lineHeight: '1.1',
              fontWeight: 300,
            }}
          >
            Where Vision
          </h1>
        </div>
        <div className="overflow-hidden mb-12">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-amber-700 animate-fade-in-up"
            style={{
              lineHeight: '1.1',
              fontWeight: 300,
              animationDelay: '0.2s',
            }}
          >
            Meets Canvas
          </h1>
        </div>

        <p
          className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{
            animationDelay: '0.4s',
          }}
        >
          Contemporary art that speaks to the soul. Exploring the intersection
          of emotion, texture, and timeless beauty.
        </p>

        <button
          onClick={() => {
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-16 group animate-fade-in-up"
          style={{
            animationDelay: '0.6s',
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm tracking-widest text-stone-500 group-hover:text-amber-700 transition-colors">
              EXPLORE WORKS
            </span>
            <div className="w-12 h-12 rounded-full border-2 border-stone-300 group-hover:border-amber-700 flex items-center justify-center transition-all group-hover:transform group-hover:translate-y-1">
              <ArrowDown size={20} className="text-stone-500 group-hover:text-amber-700" />
            </div>
          </div>
        </button>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-1 h-16 bg-gradient-to-b from-amber-600 to-transparent rounded-full animate-pulse" />
      </div>
    </section>
  );
}
