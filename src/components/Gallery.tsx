'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GalleryItem {
  src: string;
  alt: string;
  span: number; // row span
}

const galleryItems: GalleryItem[] = [
  {
    src: '/images/classic-chicken-shawarma.png',
    alt: 'Classic Chicken Shawarma',
    span: 2,
  },
  {
    src: '/images/gallery-kitchen.png',
    alt: 'Our Kitchen',
    span: 1,
  },
  {
    src: '/images/cheese-shawarma.png',
    alt: 'Cheese Shawarma',
    span: 1,
  },
  {
    src: '/images/jumbo-shawarma.png',
    alt: 'Jumbo Shawarma',
    span: 2,
  },
  {
    src: '/images/spicy-shawarma.png',
    alt: 'Spicy Shawarma',
    span: 1,
  },
  {
    src: '/images/special-combo.png',
    alt: 'Special Combo',
    span: 1,
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((src: string) => {
    setLightboxImage(src);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    document.body.style.overflow = '';
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeLightbox]);

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Gallery items stagger
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.from(validItems, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-28 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ background: '#0D0D0D' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <span
            className="inline-block text-sm font-semibold tracking-[0.3em] uppercase mb-4 font-inter"
            style={{ color: '#F97316' }}
          >
            Our Gallery
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair"
            style={{ color: '#FFFFFF' }}
          >
            Gallery
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto font-inter"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            A glimpse into our kitchen &amp; cuisine
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="block w-12 h-[1px]" style={{ background: 'rgba(249,115,22,0.4)' }} />
            <span
              className="block w-2 h-2 rotate-45"
              style={{ background: '#F97316' }}
            />
            <span className="block w-12 h-[1px]" style={{ background: 'rgba(249,115,22,0.4)' }} />
          </div>
        </div>

        {/* Masonry Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          style={{ gridAutoRows: '200px' }}
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.src}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer ${
                item.span === 2 ? 'sm:row-span-2' : ''
              }`}
              onClick={() => openLightbox(item.src)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(13,13,13,0.6)' }}
              >
                <div className="flex flex-col items-center gap-2">
                  {/* View Icon */}
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span
                    className="text-sm font-semibold tracking-wider uppercase font-inter"
                    style={{ color: '#FFFFFF' }}
                  >
                    View
                  </span>
                </div>
              </div>

              {/* Subtle border glow on hover */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: 'inset 0 0 0 2px rgba(249,115,22,0.4)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'rgba(249,115,22,0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'rgba(255,255,255,0.1)';
            }}
            aria-label="Close lightbox"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Lightbox Image */}
          <div className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden">
            <Image
              src={lightboxImage}
              alt="Gallery full view"
              width={1200}
              height={800}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
