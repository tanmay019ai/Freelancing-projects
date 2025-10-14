'use client';

import { useState, useEffect } from 'react';
import GallerySection from '@/components/sections/GallerySection';
import AboutSection from '@/components/sections/About';
import ContactSection from '@/components/sections/ContactSection';
import Navigation from '@/components/layout/Navigations';
import WritingsSection from '@/components/sections/WritingsSection';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshTrigger((prev) => prev + 1); // 🔄 triggers both sections
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <main className="bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      <Navigation onRefresh={handleRefresh} isRefreshing={isRefreshing} />
      <AboutSection refreshTrigger={refreshTrigger} />
      <WritingsSection refreshTrigger={refreshTrigger} />
      <GallerySection scrollY={scrollY} />
      <ContactSection />
    </main>
  );
}
