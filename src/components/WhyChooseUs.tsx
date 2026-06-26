'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: '🥬',
    title: 'Fresh Ingredients',
    description:
      'Every ingredient is hand-picked daily from trusted local suppliers. No frozen produce, no compromises—just farm-fresh quality in every bite.',
  },
  {
    icon: '🔥',
    title: 'Authentic Taste',
    description:
      'Our recipes are rooted in generations of culinary tradition, bringing you the bold, smoky, and aromatic flavours of genuine shawarma craftsmanship.',
  },
  {
    icon: '🍗',
    title: 'Premium Chicken',
    description:
      'We use only Grade-A chicken, marinated for 24 hours in our proprietary spice blend, then slow-roasted on a vertical spit to juicy perfection.',
  },
  {
    icon: '🧄',
    title: 'Secret Garlic Sauce',
    description:
      'Our legendary garlic sauce is the crown jewel—a family recipe passed down through generations. Creamy, punchy, and absolutely irresistible.',
  },
  {
    icon: '⚡',
    title: 'Quick Service',
    description:
      'Craving satisfied in minutes, not hours. Our streamlined kitchen ensures your freshly made shawarma reaches you fast without sacrificing quality.',
  },
  {
    icon: '💎',
    title: 'Affordable Pricing',
    description:
      'Premium dining shouldn\'t break the bank. We deliver a luxury shawarma experience at prices that keep you coming back for more.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger reveal from bottom
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative py-28 md:py-36 bg-[#0D0D0D] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F97316]/3 rounded-full blur-[250px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block w-12 h-px bg-gradient-to-r from-transparent to-[#F97316]" />
            <span className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-[#F97316]">
              Our Promise
            </span>
            <span className="inline-block w-12 h-px bg-gradient-to-l from-transparent to-[#F97316]" />
          </div>
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FFB703]">
              Us
            </span>
          </h2>
          <p className="font-inter text-lg text-white/50 max-w-2xl mx-auto">
            Six reasons that make TAJ KING SHAWARMA the ultimate destination for shawarma
            lovers who refuse to settle for ordinary.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => setCardRef(el, index)}
              className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:bg-white/10 hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-[#F97316]/10 cursor-default"
              style={{ opacity: 0 }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F97316]/0 to-[#FFB703]/0 group-hover:from-[#F97316]/5 group-hover:to-[#FFB703]/5 transition-all duration-500" />

              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 mb-6 group-hover:bg-[#F97316]/20 group-hover:scale-110 transition-all duration-500">
                  <span className="text-3xl">{feature.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-playfair text-xl font-bold text-white mb-3 group-hover:text-[#F97316] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-[#F97316] to-[#FFB703] transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
