'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface MenuItem {
  name: string;
  price: string;
  image: string;
  description: string;
  tags: string[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Classic Chicken Shawarma',
    price: '₹120',
    image: '/images/classic-chicken-shawarma.png',
    description: 'The original classic, perfected over years',
    tags: ['Authentic', 'Roasted Chicken', 'Garlic Cream', 'Pickles'],
  },
  {
    name: 'Cheese Shawarma',
    price: '₹150',
    image: '/images/cheese-shawarma.png',
    description: 'Loaded with melted mozzarella goodness',
    tags: ['Mozzarella', 'Double Cheese', 'Gourmet', 'Melted'],
  },
  {
    name: 'Jumbo Shawarma',
    price: '₹180',
    image: '/images/jumbo-shawarma.png',
    description: 'Extra large, extra delicious',
    tags: ['Extra Large', 'Double Meat', 'Hunger Buster', 'Best Seller'],
  },
  {
    name: 'Spicy Shawarma',
    price: '₹140',
    image: '/images/spicy-shawarma.png',
    description: 'For those who love the heat',
    tags: ['Peri-Peri', 'Spicy Mayo', 'Hot & Spicy', 'Fire-Grilled'],
  },
  {
    name: 'Special Combo',
    price: '₹200',
    image: '/images/special-combo.png',
    description: 'The ultimate shawarma feast',
    tags: ['Full Meal', 'Fries + Drink', 'Gourmet Feast', 'Combo Deal'],
  },
];

export default function SignatureShawarmas() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

      // Cards stagger animation
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.from(validCards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
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
      id="menu"
      className="relative py-28 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ background: '#0D0D0D' }}
    >
      {/* Subtle radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(249,115,22,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <span
            className="inline-block text-sm font-semibold tracking-[0.3em] uppercase mb-4 font-inter"
            style={{ color: '#F97316' }}
          >
            Our Menu
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair"
            style={{ color: '#FFFFFF' }}
          >
            Signature Shawarmas
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto font-inter"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Crafted with passion, served with pride
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

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2.5"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 20px 60px rgba(249,115,22,0.15), 0 0 40px rgba(249,115,22,0.05)';
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'rgba(249,115,22,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 4px 30px rgba(0,0,0,0.3)';
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'rgba(255,255,255,0.08)';
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-56 sm:h-60 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 50%)',
                  }}
                />
                {/* Price Badge */}
                <div
                  className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-bold font-inter"
                  style={{
                    background: 'linear-gradient(135deg, #F97316, #FFB703)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(249,115,22,0.4)',
                  }}
                >
                  {item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-2 font-playfair"
                  style={{ color: '#FFFFFF' }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-sm mb-5 font-inter leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {item.description}
                </p>
                {/* Premium gourmet tags */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md font-inter transition-all duration-300"
                      style={{
                        background: 'rgba(249,115,22,0.06)',
                        color: 'rgba(255,183,3,0.85)',
                        border: '1px solid rgba(249,115,22,0.15)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
