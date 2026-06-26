'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const accentLine = accentLineRef.current;

    if (!section || !text || !image || !accentLine) return;

    const ctx = gsap.context(() => {
      // Text slides in from left
      gsap.fromTo(
        text,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image slides in from right
      gsap.fromTo(
        image,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Accent line grows in width
      gsap.fromTo(
        accentLine,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
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
      id="about"
      className="relative py-28 md:py-36 bg-[#0D0D0D] overflow-hidden"
    >
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#F97316]/3 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFB703]/3 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div ref={textRef} style={{ opacity: 0 }}>
            {/* Overline */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-[#F97316] to-transparent" />
              <span className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-[#F97316]">
                Est. 2018
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FFB703]">
                Story
              </span>
            </h2>

            {/* Accent Line */}
            <div
              ref={accentLineRef}
              className="w-24 h-1 bg-gradient-to-r from-[#F97316] to-[#FFB703] rounded-full mb-10 origin-left"
            />

            {/* Paragraphs */}
            <div className="space-y-6">
              <p className="font-inter text-lg leading-relaxed text-white/80">
                At <span className="text-[#F97316] font-semibold">TAJ KING SHAWARMA</span>, we
                believe every bite should tell a story—a story of tradition, quality, and
                unapologetic flavour. What started as a humble kitchen with a single spit of
                slow-roasted chicken has grown into a beloved destination for shawarma lovers
                who demand nothing less than extraordinary.
              </p>
              <p className="font-inter text-lg leading-relaxed text-white/70">
                Our chefs bring decades of culinary heritage to every wrap. We source only the
                freshest ingredients—crisp lettuce, vine-ripened tomatoes, and premium chicken
                marinated for 24 hours in our signature blend of spices. Paired with our
                legendary garlic sauce, crafted from a closely guarded family recipe, each
                shawarma is a masterpiece of flavour and texture.
              </p>
              <p className="font-inter text-lg leading-relaxed text-white/60">
                More than just a restaurant, we are a community. A place where families gather,
                friends reconnect, and every guest is treated like royalty. From our kitchen to
                your table, we pour passion into every single dish—because you deserve nothing
                less than the king&apos;s feast.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-10 border-t border-white/10">
              <div>
                <div className="font-playfair text-3xl md:text-4xl font-bold text-[#F97316]">
                  6+
                </div>
                <div className="font-inter text-sm text-white/50 mt-1 uppercase tracking-wider">
                  Years Serving
                </div>
              </div>
              <div>
                <div className="font-playfair text-3xl md:text-4xl font-bold text-[#FFB703]">
                  50K+
                </div>
                <div className="font-inter text-sm text-white/50 mt-1 uppercase tracking-wider">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="font-playfair text-3xl md:text-4xl font-bold text-[#F97316]">
                  100%
                </div>
                <div className="font-inter text-sm text-white/50 mt-1 uppercase tracking-wider">
                  Fresh Daily
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            {/* Decorative frame */}
            <div className="absolute -inset-4 md:-inset-6 rounded-3xl border border-[#F97316]/20" />
            <div className="absolute -inset-2 md:-inset-3 rounded-2xl border border-[#F97316]/10" />

            {/* Orange glow behind image */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F97316]/20 to-[#FFB703]/10 blur-2xl scale-105" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#F97316]/10">
              <Image
                src="/images/gallery-kitchen.png"
                alt="TAJ KING SHAWARMA Kitchen"
                width={700}
                height={800}
                className="w-full h-[500px] md:h-[600px] object-cover"
                priority={false}
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#0D0D0D]/80 backdrop-blur-xl rounded-xl border border-white/10">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="font-inter text-sm font-semibold text-white">
                      Crafted with Passion
                    </p>
                    <p className="font-inter text-xs text-white/50">
                      Every day, from scratch
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute -top-2 -right-2 w-20 h-20">
              <div className="absolute top-0 right-0 w-12 h-px bg-gradient-to-l from-[#F97316] to-transparent" />
              <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-[#F97316] to-transparent" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-20 h-20">
              <div className="absolute bottom-0 left-0 w-12 h-px bg-gradient-to-r from-[#F97316] to-transparent" />
              <div className="absolute bottom-0 left-0 w-px h-12 bg-gradient-to-t from-[#F97316] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
