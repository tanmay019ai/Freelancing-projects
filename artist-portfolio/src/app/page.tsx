'use client';

import { useState, useEffect } from 'react';
import GallerySection from '@/components/sections/GallerySection';
import AboutSection from '@/components/sections/About';
import ContactSection from '@/components/sections/ContactSection';
import Navigation from '@/components/layout/Navigations';
import { WritingsSection, sampleWritings } from '@/components/sections/WritingsSection';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      <Navigation />
      <AboutSection scrollY={scrollY} />
      <WritingsSection writings={sampleWritings} />
      <GallerySection scrollY={scrollY} />
      <ContactSection />
    </main>
  );
}
