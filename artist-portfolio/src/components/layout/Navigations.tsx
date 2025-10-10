'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        <button
          onClick={() => scrollToSection('hero')}
          className="text-2xl font-light tracking-wider text-stone-800 hover:text-amber-700 transition-colors"
        >
          ARTISTA
        </button>

        <div className="hidden md:flex items-center gap-12">
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors"
          >
            GALLERY
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors"
          >
            CONTACT
          </button>
        </div>

        <button
          className="md:hidden text-stone-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg">
          <div className="flex flex-col gap-6 px-6 py-8">
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors text-left"
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors text-left"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm tracking-wider text-stone-600 hover:text-amber-700 transition-colors text-left"
            >
              CONTACT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
