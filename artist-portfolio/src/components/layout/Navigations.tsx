'use client';

import { useState, useEffect } from 'react';
import { Menu, X, RefreshCw } from 'lucide-react';

export default function Navigation({
  onRefresh,
  isRefreshing,
}: {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm py-4'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="text-2xl font-light tracking-wider text-stone-800 hover:text-amber-700 transition-colors"
        >
          ARTISTA
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors duration-300"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('writings')}
            className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors duration-300"
          >
            WRITINGS
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors duration-300"
          >
            GALLERY
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors duration-300"
          >
            CONTACT
          </button>

          {/* 🆕 Refresh button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-stone-600 hover:text-amber-700 transition disabled:opacity-60"
          >
            <RefreshCw
              size={18}
              className={`${isRefreshing ? 'animate-spin' : ''} transition-transform duration-300`}
            />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-stone-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg">
          <div className="flex flex-col gap-6 px-6 py-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm tracking-wider text-stone-700 hover:text-amber-700 transition-colors text-left"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('writings')}
              className="text-sm tracking-wider text-stone-700 hover:text-amber-700 transition-colors text-left"
            >
              WRITINGS
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-sm tracking-wider text-stone-700 hover:text-amber-700 transition-colors text-left"
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm tracking-wider text-stone-700 hover:text-amber-700 transition-colors text-left"
            >
              CONTACT
            </button>

            {/* 🆕 Refresh inside mobile menu */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 text-stone-700 hover:text-amber-700 transition mt-4 disabled:opacity-60"
            >
              <RefreshCw
                size={18}
                className={`${isRefreshing ? 'animate-spin' : ''} transition-transform duration-300`}
              />
              {isRefreshing ? 'Refreshing...' : 'Refresh Sections'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
