'use client';

import { useState } from 'react';
import { Mail, Instagram, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Background blur accents */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Let's Create Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto rounded-full mb-8" />
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Whether you're interested in a commission, collaboration, or just want to connect,
            I'd love to hear from you.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full h-14 px-5 rounded-2xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100 outline-none text-base transition-all duration-200"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full h-14 px-5 rounded-2xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100 outline-none text-base transition-all duration-200"
            />

            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="w-full px-5 py-4 rounded-2xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100 outline-none text-base resize-none transition-all duration-200"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-14 rounded-2xl text-white font-light tracking-wider text-base transition-all duration-300 shadow-lg hover:shadow-xl ${
                isSubmitting
                  ? 'bg-gradient-to-r from-stone-400 to-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
              }`}
            >
              {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>

          {/* Info Section */}
          <div className="space-y-12 lg:pl-12">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-amber-600 to-transparent rounded-full" />
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-amber-700" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-900 mb-2">Email</h3>
                    <a
                      href="mailto:hello@artista.com"
                      className="text-stone-600 hover:text-amber-700 transition-colors"
                    >
                      hello@artista.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Instagram className="text-amber-700" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-900 mb-2">Instagram</h3>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 hover:text-amber-700 transition-colors"
                    >
                      @artista.studio
                    </a>
                  </div>
                </div>

                {/* Studio Address */}
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-amber-700" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-900 mb-2">Studio</h3>
                    <p className="text-stone-600">
                      123 Creative Lane
                      <br />
                      Arts District, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commission Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-light text-stone-900 mb-4">Commission Work</h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                I'm currently accepting commissions for original artworks. Each piece
                is thoughtfully crafted to your vision and space.
              </p>
              <p className="text-sm text-stone-500">Typical timeline: 4–8 weeks</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-stone-200 text-center">
          <p className="text-stone-500 text-sm tracking-wider">
            © 2024 ARTISTA. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
