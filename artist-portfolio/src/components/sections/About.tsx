'use client';

import { useState, useEffect } from 'react';
import { Palette, Award, Heart, ArrowDown } from 'lucide-react';
import Image from 'next/image';

// Smooth counting component
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // ~60fps

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [target]);

  return <div className="text-3xl font-light text-stone-900 mb-1">{count}+</div>;
}

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
              Akshay Chhabhaiya
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-transparent rounded-full mb-10" />

            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>
                For over a decade, I&apos;ve been exploring the delicate balance between chaos and harmony
                through my art. Each piece is a journey, a conversation between color, texture, and emotion.
              </p>
              <p>
                My work draws inspiration from the natural world, urban landscapes, and the raw emotions
                that connect us all. I believe art should not just be seen, but felt—experienced in a
                way that resonates deeply within.
              </p>
              <p>
                Based in the heart of the creative district, my studio is a sanctuary where ideas transform
                into visual poetry. Every brushstroke is intentional, every color choice deliberate.
              </p>
            </div>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Palette className="text-amber-700" size={28} />
                </div>
                <Counter target={10} />
                <div className="text-sm text-stone-500 tracking-wide">Years</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="text-amber-700" size={28} />
                </div>
                <Counter target={25} />
                <div className="text-sm text-stone-500 tracking-wide">Exhibitions</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-amber-700" size={28} />
                </div>
                <Counter target={200} />
                <div className="text-sm text-stone-500 tracking-wide">Collectors</div>
              </div>
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
      </div>
    </section>
  );
}
