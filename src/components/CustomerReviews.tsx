'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Review {
  name: string;
  text: string;
  stars: number;
}

const reviews: Review[] = [
  {
    name: 'Rahul M.',
    text: 'Great place to eat shawarma, spicy and creamy.',
    stars: 5,
  },
  {
    name: 'Priya S.',
    text: 'They serve a variety of chicken shawarmas which taste heavenly.',
    stars: 5,
  },
  {
    name: 'Amit K.',
    text: 'Loved the freshness and authentic flavour.',
    stars: 5,
  },
];

export default function CustomerReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);

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
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Google badge animation
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: badgeRef.current,
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
      id="reviews"
      className="relative py-28 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 80%, rgba(255,183,3,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <span
            className="inline-block text-sm font-semibold tracking-[0.3em] uppercase mb-4 font-inter"
            style={{ color: '#FFB703' }}
          >
            Testimonials
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair"
            style={{ color: '#FFFFFF' }}
          >
            What Our Customers Say
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto font-inter"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Join thousands of satisfied shawarma lovers
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="block w-12 h-[1px]" style={{ background: 'rgba(255,183,3,0.4)' }} />
            <span
              className="block w-2 h-2 rotate-45"
              style={{ background: '#FFB703' }}
            />
            <span className="block w-12 h-[1px]" style={{ background: 'rgba(255,183,3,0.4)' }} />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="relative p-8 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 20px 50px rgba(255,183,3,0.1), 0 0 30px rgba(255,183,3,0.03)';
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'rgba(255,183,3,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 4px 30px rgba(0,0,0,0.2)';
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'rgba(255,255,255,0.08)';
              }}
            >
              {/* Large Quotation Mark */}
              <div
                className="absolute top-4 left-6 text-7xl md:text-8xl font-playfair leading-none select-none pointer-events-none"
                style={{ color: 'rgba(249,115,22,0.12)' }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6 relative z-10">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <span key={i} className="text-xl" role="img" aria-label="star">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p
                className="text-lg md:text-xl italic leading-relaxed mb-8 relative z-10 font-inter"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer Name */}
              <div className="flex items-center gap-3 relative z-10">
                {/* Avatar circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-inter"
                  style={{
                    background: 'linear-gradient(135deg, #F97316, #FFB703)',
                    color: '#FFFFFF',
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p
                    className="font-semibold text-base font-inter"
                    style={{ color: '#FFFFFF' }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-xs font-inter"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Verified Customer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Rating Badge */}
        <div ref={badgeRef} className="flex justify-center">
          <div
            className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {/* Google "G" Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-3xl font-bold font-playfair"
                  style={{ color: '#FFFFFF' }}
                >
                  4.9
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg" role="img" aria-label="star">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <p
                className="text-sm font-inter mt-1"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Rated on Google Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
