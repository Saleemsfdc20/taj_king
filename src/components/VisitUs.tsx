'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function VisitUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      // Info card slides in from left
      if (infoRef.current) {
        gsap.from(infoRef.current, {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Map slides in from right
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          x: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }

      // CTA buttons fade in
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
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
      id="location"
      className="relative py-28 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ background: '#0D0D0D' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <span
            className="inline-block text-sm font-semibold tracking-[0.3em] uppercase mb-4 font-inter"
            style={{ color: '#F97316' }}
          >
            Find Us
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair"
            style={{ color: '#FFFFFF' }}
          >
            Visit Us
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto font-inter"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            We&apos;d love to serve you in person
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Left: Contact Info Card */}
          <div
            ref={infoRef}
            className="p-8 md:p-10 rounded-2xl h-full"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
            }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold mb-8 font-playfair"
              style={{ color: '#FFFFFF' }}
            >
              Get In Touch
            </h3>

            {/* Address */}
            <div className="flex gap-4 mb-8">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  border: '1px solid rgba(249,115,22,0.2)',
                }}
              >
                📍
              </div>
              <div>
                <p
                  className="font-semibold text-sm uppercase tracking-wider mb-1.5 font-inter"
                  style={{ color: '#F97316' }}
                >
                  Address
                </p>
                <p
                  className="text-base leading-relaxed font-inter"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Goawala Building, AH Wadia Marg, Friends Colony, Hallow Pul,
                  Jai Ambika Nagar, Kurla West, Mumbai, Maharashtra 400070
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 mb-8">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  border: '1px solid rgba(249,115,22,0.2)',
                }}
              >
                📞
              </div>
              <div>
                <p
                  className="font-semibold text-sm uppercase tracking-wider mb-1.5 font-inter"
                  style={{ color: '#F97316' }}
                >
                  Phone
                </p>
                <a
                  href="tel:+918080894627"
                  className="text-base font-inter transition-colors duration-300"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#F97316';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'rgba(255,255,255,0.7)';
                  }}
                >
                  +91 80808 94627
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  border: '1px solid rgba(249,115,22,0.2)',
                }}
              >
                🕐
              </div>
              <div>
                <p
                  className="font-semibold text-sm uppercase tracking-wider mb-1.5 font-inter"
                  style={{ color: '#F97316' }}
                >
                  Hours
                </p>
                <p
                  className="text-base font-inter"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Open Daily
                </p>
                <p
                  className="text-base font-inter"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  11:00 AM – 12:30 AM
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div
              className="mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p
                className="text-sm italic font-inter"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                &ldquo;The best shawarma in Mumbai — come taste the difference.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Google Maps */}
          <div
            ref={mapRef}
            className="rounded-2xl overflow-hidden h-full min-h-[400px]"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.87!3d19.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzEyLjAiTiA3MsKwNTInMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', filter: 'invert(0.9) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Taj King Shawarma Location"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="tel:+918080894627"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold tracking-wide transition-all duration-300 hover:scale-105 font-inter"
            style={{
              background: 'linear-gradient(135deg, #F97316, #FFB703)',
              color: '#FFFFFF',
              boxShadow: '0 8px 30px rgba(249,115,22,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 12px 40px rgba(249,115,22,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 8px 30px rgba(249,115,22,0.3)';
            }}
          >
            <span className="text-lg">📞</span>
            Call Now
          </a>

          <a
            href="https://www.google.com/maps/dir//Goawala+Building,+AH+Wadia+Marg,+Friends+Colony,+Hallow+Pul,+Jai+Ambika+Nagar,+Kurla+West,+Mumbai,+Maharashtra+400070"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold tracking-wide transition-all duration-300 hover:scale-105 font-inter"
            style={{
              background: 'transparent',
              color: '#F97316',
              border: '2px solid rgba(249,115,22,0.5)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                'linear-gradient(135deg, #F97316, #FFB703)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 12px 40px rgba(249,115,22,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = '#F97316';
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                'rgba(249,115,22,0.5)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 4px 20px rgba(0,0,0,0.2)';
            }}
          >
            <span className="text-lg">📍</span>
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
