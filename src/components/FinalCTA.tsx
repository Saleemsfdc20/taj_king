'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ------------------------------------------------------------------ */
/*  Ember / spark particles – pure CSS keyframe animation              */
/* ------------------------------------------------------------------ */
interface Ember {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
}

const EMBER_COUNT = 18;

function generateEmbers(): Ember[] {
  return Array.from({ length: EMBER_COUNT }, (_, i) => {
    const isGold = Math.random() > 0.5;
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2, // 2‑6 px
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 4 + 4}s`, // 4‑8 s
      color: isGold ? '#FFB703' : '#F97316',
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);

  // Stable ember array across renders
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmbers(generateEmbers());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Heading – scale + fade */
      gsap.from(headingRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      /* Subheading – fade up */
      gsap.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      /* Buttons – slide up & fade */
      if (btnWrapRef.current) {
        const buttons = btnWrapRef.current.querySelectorAll('a');
        gsap.from(buttons, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.4,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative isolate overflow-hidden py-32 md:py-40"
      style={{ background: '#0D0D0D' }}
    >
      {/* ---- radial gradient glow ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(249,115,22,0.18) 0%, rgba(255,183,3,0.08) 40%, transparent 70%)',
        }}
      />

      {/* ---- ember particles ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {embers.map((e) => (
          <span
            key={e.id}
            className="absolute rounded-full animate-ember-rise"
            style={{
              left: e.left,
              bottom: '-8px',
              width: e.size,
              height: e.size,
              backgroundColor: e.color,
              boxShadow: `0 0 ${e.size * 2}px ${e.color}`,
              animationDelay: e.delay,
              animationDuration: e.duration,
            }}
          />
        ))}
      </div>

      {/* ---- content ---- */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2
          ref={headingRef}
          className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Hungry?
        </h2>

        <p
          ref={subRef}
          className="font-inter text-xl md:text-2xl text-white/70 mb-14 max-w-2xl mx-auto"
        >
          Experience Mumbai&apos;s Favourite Shawarma Today.
        </p>

        <div ref={btnWrapRef} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {/* Order Now */}
          <a
            href="#order"
            className="group relative inline-flex items-center justify-center rounded-full px-10 py-4 font-inter font-bold text-black text-lg transition-transform duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #F97316, #FFB703)',
            }}
          >
            <span className="relative z-10">Order Now</span>
            {/* shine sweep on hover */}
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
              }}
            />
          </a>

          {/* Call Now */}
          <a
            href="tel:+918080894627"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 border-2 border-orange-500 text-white font-inter font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-orange-500/10 active:scale-95"
          >
            Call Now
          </a>
        </div>
      </div>

      {/* ---- keyframes injected once via <style> ---- */}
      <style jsx>{`
        @keyframes ember-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) scale(0.3);
            opacity: 0;
          }
        }
        .animate-ember-rise {
          animation-name: ember-rise;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
}
