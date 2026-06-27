'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'Instagram', emoji: '📸', href: '#' },
  { label: 'Facebook', emoji: '👍', href: '#' },
  { label: 'WhatsApp', emoji: '💬', href: '#' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Fade‑in the whole footer */
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
      });

      /* Stagger columns */
      const cols = footerRef.current?.querySelectorAll('[data-col]');
      if (cols?.length) {
        gsap.from(cols, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative" style={{ background: '#111111' }}>
      {/* ---- orange gradient top border ---- */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, #F97316, #FFB703, #F97316, transparent)',
        }}
      />

      {/* ---- main grid ---- */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ---- Column 1 · Brand ---- */}
          <div data-col className="space-y-4">
            <div>
              <span className="font-playfair text-3xl font-bold text-white">
                👑 TAJ KING
              </span>
              <p
                className="font-playfair text-lg font-semibold tracking-widest"
                style={{ color: '#F97316' }}
              >
                SHAWARMA
              </p>
            </div>
            <p className="font-inter text-sm text-white/50 leading-relaxed max-w-xs">
              The King of Authentic Shawarma. Crafted with passion, served with
              pride&nbsp;— since&nbsp;Day&nbsp;One.
            </p>
          </div>

          {/* ---- Column 2 · Quick Links ---- */}
          <div data-col>
            <h4
              className="font-playfair text-lg font-semibold mb-5"
              style={{ color: '#FFB703' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-white/60 transition-colors duration-300
                               hover:text-orange-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Column 3 · Contact ---- */}
          <div data-col>
            <h4
              className="font-playfair text-lg font-semibold mb-5"
              style={{ color: '#FFB703' }}
            >
              Contact Us
            </h4>
            <address className="not-italic space-y-4 font-inter text-sm text-white/60 leading-relaxed">
              <p>
                <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">
                  Address
                </span>
                Goawala Building, AH Wadia Marg,
                <br />
                Kurla West, Mumbai&nbsp;400070
              </p>
              <p>
                <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">
                  Phone
                </span>
                <a
                  href="tel:+918080894627"
                  className="transition-colors duration-300 hover:text-orange-500"
                >
                  +91 80808 94627
                </a>
              </p>
              <p>
                <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">
                  Hours
                </span>
                11:00&nbsp;AM&nbsp;–&nbsp;12:30&nbsp;AM
              </p>
            </address>
          </div>

          {/* ---- Column 4 · Follow Us ---- */}
          <div data-col>
            <h4
              className="font-playfair text-lg font-semibold mb-5"
              style={{ color: '#FFB703' }}
            >
              Follow Us
            </h4>
            <ul className="space-y-3 mb-6">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="inline-flex items-center gap-2 font-inter text-sm text-white/60
                               transition-colors duration-300 hover:text-orange-500"
                  >
                    <span className="text-base">{s.emoji}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Google Maps link */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Goawala+Building+AH+Wadia+Marg+Kurla+West+Mumbai+400070"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5
                         px-4 py-2.5 font-inter text-xs text-white/60 backdrop-blur
                         transition-all duration-300 hover:border-orange-500/40 hover:text-orange-400"
            >
              <span className="text-base">📍</span>
              View on Google&nbsp;Maps
            </a>
          </div>
        </div>
      </div>

      {/* ---- bottom bar ---- */}
      <div
        className="border-t border-white/10"
        style={{ background: 'rgba(0,0,0,0.3)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
          <p className="font-inter text-xs text-white/40">
            © {new Date().getFullYear()} TAJ KING SHAWARMA. All Rights Reserved.
          </p>
          <p className="font-inter text-xs text-white/40">
            Crafted with <span className="text-red-500">❤️</span> in Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}
