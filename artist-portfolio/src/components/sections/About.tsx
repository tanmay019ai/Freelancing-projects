'use client';

import { useState, useEffect } from 'react';
import { Palette, Award, Heart, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// ✅ Supabase client (frontend)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AboutData {
  name: string;
  bio1: string;
  bio2: string;
  bio3: string;
  stats: { years: number; exhibitions: number; collectors: number };
}

export default function AboutSection({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [about, setAbout] = useState<AboutData | null>(null);

  // 🔁 Fetch About data
  async function fetchAbout() {
    try {
      const res = await fetch('/api/about', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setAbout(data.data);
    } catch (err) {
      console.error('Error fetching About data:', err);
    }
  }

  // 🧠 Fetch once on mount + again whenever refreshTrigger changes
  useEffect(() => {
    fetchAbout();
  }, [refreshTrigger]);

  // 🕓 Loading state
  if (!about) {
    return (
      <section id="about" className="py-32 px-6 lg:px-12 text-center">
        <p className="text-stone-500 text-lg">Loading artist information...</p>
      </section>
    );
  }

  // ✅ Main content
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-white/50 transition-all duration-500">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Artist Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
            <Image
              src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Artist Portrait"
              width={800}
              height={1066}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full opacity-20 blur-3xl -z-10" />
        </div>

        {/* Artist Info */}
        <div>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-8">
            {about.name}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-transparent rounded-full mb-10" />

          <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
            <p>{about.bio1}</p>
            <p>{about.bio2}</p>
            <p>{about.bio3}</p>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <CounterItem label="Years" value={about.stats.years} />
            <CounterItem label="Exhibitions" value={about.stats.exhibitions} />
            <CounterItem label="Collectors" value={about.stats.collectors} />
          </div>

          {/* Explore Works Button */}
          <div className="mt-16 flex justify-center lg:justify-start">
            <button
              onClick={() =>
                document.getElementById('writings')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group flex flex-col items-center gap-3"
            >
              <span className="text-sm tracking-widest text-stone-500 group-hover:text-amber-700 transition-colors">
                EXPLORE WORKS
              </span>
              <div className="w-12 h-12 rounded-full border-2 border-stone-300 group-hover:border-amber-700 flex items-center justify-center transition-all group-hover:translate-y-1">
                <ArrowDown size={20} className="text-stone-500 group-hover:text-amber-700" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ✅ CounterItem component
function CounterItem({ label, value }: { label: string; value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
        {label === 'Years' && <Palette className="text-amber-700" size={28} />}
        {label === 'Exhibitions' && <Award className="text-amber-700" size={28} />}
        {label === 'Collectors' && <Heart className="text-amber-700" size={28} />}
      </div>
      <div className="text-3xl font-light text-stone-900 mb-1">{count}+</div>
      <div className="text-sm text-stone-500 tracking-wide">{label}</div>
    </div>
  );
}
