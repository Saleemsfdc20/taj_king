'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface Ingredient {
  emoji: string;
  name: string;
  description: string;
  fromDirection: { x: number; y: number };
}

const INGREDIENTS: Ingredient[] = [
  {
    emoji: '🍗',
    name: 'Premium Chicken',
    description: 'Grade-A chicken marinated 24 hours in our signature spice blend',
    fromDirection: { x: -80, y: -60 },
  },
  {
    emoji: '🥬',
    name: 'Fresh Lettuce',
    description: 'Crisp, farm-fresh lettuce harvested daily for the perfect crunch',
    fromDirection: { x: 0, y: -100 },
  },
  {
    emoji: '🍅',
    name: 'Vine Tomatoes',
    description: 'Sun-ripened tomatoes bursting with natural sweetness and juice',
    fromDirection: { x: 80, y: -60 },
  },
  {
    emoji: '🫒',
    name: 'Premium Olives',
    description: 'Hand-picked olives adding a rich, Mediterranean depth of flavour',
    fromDirection: { x: -100, y: 0 },
  },
  {
    emoji: '🧀',
    name: 'Artisan Cheese',
    description: 'Creamy, perfectly melted cheese that ties every flavour together',
    fromDirection: { x: 100, y: 0 },
  },
  {
    emoji: '🧄',
    name: 'Garlic Sauce',
    description: 'Our legendary secret recipe—creamy, bold, and utterly addictive',
    fromDirection: { x: -80, y: 60 },
  },
  {
    emoji: '🫓',
    name: 'Fresh Wrap',
    description: 'Soft, warm flatbread baked in-house throughout the day',
    fromDirection: { x: 80, y: 60 },
  },
];

export default function FreshIngredients() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards fly in from different directions
      const cards = section.querySelectorAll('.ingredient-card');
      cards.forEach((card, index) => {
        const ingredient = INGREDIENTS[index];
        if (!ingredient) return;
        gsap.fromTo(
          card,
          {
            x: ingredient.fromDirection.x,
            y: ingredient.fromDirection.y,
            opacity: 0,
            scale: 0.8,
            rotation: (Math.random() - 0.5) * 10,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative py-28 md:py-36 bg-[#0D0D0D] overflow-hidden"
    >
      {/* Inject float keyframes */}
      <style jsx>{`
        @keyframes ingredient-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>

      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#F97316]/3 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#FFB703]/3 rounded-full blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block w-12 h-px bg-gradient-to-r from-transparent to-[#F97316]" />
            <span className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-[#F97316]">
              Quality First
            </span>
            <span className="inline-block w-12 h-px bg-gradient-to-l from-transparent to-[#F97316]" />
          </div>
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Fresh{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FFB703]">
              Ingredients
            </span>
          </h2>
          <p className="font-inter text-lg text-white/50 max-w-2xl mx-auto">
            Only the finest ingredients make it to your shawarma. We source daily, prepare
            fresh, and serve with pride.
          </p>
        </div>

        {/* Ingredient Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {INGREDIENTS.map((ingredient, index) => (
            <div
              key={ingredient.name}
              className={`ingredient-card group relative ${index === 6 ? 'col-span-2 md:col-span-1' : ''}`}
              style={{
                opacity: 0,
                animation: `ingredient-float 3s ease-in-out infinite`,
                animationDelay: `${index * 0.4}s`,
              }}
            >
              <div className="relative h-full p-6 md:p-8 rounded-2xl bg-[#0D0D0D] border border-white/10 transition-all duration-500 hover:border-[#F97316]/50 hover:shadow-xl hover:shadow-[#F97316]/10 hover:bg-[#111111]">
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent group-hover:via-[#F97316]/60 transition-all duration-500" />

                {/* Emoji Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-[#F97316]/5 border border-[#F97316]/10 mb-5 group-hover:bg-[#F97316]/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-4xl md:text-5xl">{ingredient.emoji}</span>
                </div>

                {/* Name */}
                <h3 className="font-playfair text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#F97316] transition-colors duration-300">
                  {ingredient.name}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  {ingredient.description}
                </p>

                {/* Corner decoration */}
                <div className="absolute bottom-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 right-0 w-4 h-px bg-[#F97316]/50" />
                  <div className="absolute bottom-0 right-0 w-px h-4 bg-[#F97316]/50" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex items-center justify-center mt-16 gap-3">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#F97316]/30" />
          <span className="text-[#F97316]/40 font-inter text-xs tracking-[0.4em] uppercase">
            Freshness Guaranteed
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#F97316]/30" />
        </div>
      </div>
    </section>
  );
}
