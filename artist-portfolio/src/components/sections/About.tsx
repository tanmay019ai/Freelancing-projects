'use client';

import { Palette, Award, Heart } from 'lucide-react';

interface AboutSectionProps {
  scrollY: number;
}

export default function AboutSection({ scrollY }: AboutSectionProps) {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
              <img
                src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Artist Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full opacity-20 blur-3xl -z-10" />
          </div>

          <div>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-8">
              The Artist
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-transparent rounded-full mb-10" />

            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>
                For over a decade, I've been exploring the delicate balance between
                chaos and harmony through my art. Each piece is a journey, a
                conversation between color, texture, and emotion.
              </p>
              <p>
                My work draws inspiration from the natural world, urban landscapes,
                and the raw emotions that connect us all. I believe art should not
                just be seen, but felt—experienced in a way that resonates deeply
                within.
              </p>
              <p>
                Based in the heart of the creative district, my studio is a sanctuary
                where ideas transform into visual poetry. Every brushstroke is
                intentional, every color choice deliberate.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Palette className="text-amber-700" size={28} />
                </div>
                <div className="text-3xl font-light text-stone-900 mb-1">10+</div>
                <div className="text-sm text-stone-500 tracking-wide">Years</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="text-amber-700" size={28} />
                </div>
                <div className="text-3xl font-light text-stone-900 mb-1">25+</div>
                <div className="text-sm text-stone-500 tracking-wide">Exhibitions</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-amber-700" size={28} />
                </div>
                <div className="text-3xl font-light text-stone-900 mb-1">200+</div>
                <div className="text-sm text-stone-500 tracking-wide">Collectors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
