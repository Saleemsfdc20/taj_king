'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 250;
const getFramePath = (index: number) =>
  `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

interface SpiceParticle {
  id: number;
  width: string;
  height: string;
  background: string;
  left: string;
  bottom: string;
  opacity: number;
  duration: string;
  delay: string;
  drift: string;
}

interface SmokeParticle {
  id: number;
  width: string;
  height: string;
  left: string;
  bottom: string;
  duration: string;
  delay: string;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const [spiceParticles, setSpiceParticles] = useState<SpiceParticle[]>([]);
  const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([]);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Generate spice and smoke particles on client load to avoid SSR/hydration mismatches and render purity issues
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        const generatedSpice = Array.from({ length: 30 }, (_, i) => {
          const size = Math.random() * 4 + 1;
          const colors = ['#F97316', '#FFB703', '#FF6B35'];
          return {
            id: i,
            width: `${size}px`,
            height: `${size}px`,
            background: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 40}%`,
            opacity: Math.random() * 0.7 + 0.3,
            duration: `${Math.random() * 4 + 3}s`,
            delay: `${Math.random() * 5}s`,
            drift: `${(Math.random() - 0.5) * 60}px`,
          };
        });
        setSpiceParticles(generatedSpice);

        const generatedSmoke = Array.from({ length: 8 }, (_, i) => {
          const size = Math.random() * 100 + 60;
          return {
            id: i,
            width: `${size}px`,
            height: `${size}px`,
            left: `${30 + Math.random() * 40}%`,
            bottom: `${20 + Math.random() * 20}%`,
            duration: `${Math.random() * 5 + 5}s`,
            delay: `${Math.random() * 5}s`,
          };
        });
        setSmokeParticles(generatedSmoke);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Render frame on canvas
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (!canvas || !ctx || !img || !img.complete) return;

    // Set canvas size to match viewport while maintaining aspect ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    // Calculate dimensions to cover the canvas (like CSS object-fit: cover)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasAspect > imgAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      drawX = 0;
      drawY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      drawX = (canvasWidth - drawWidth) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Setup ScrollTrigger animation
  useEffect(() => {
    if (!isLoaded) return;

    // Render first frame
    renderFrame(0);

    const ctx = gsap.context(() => {
      // Frame animation tied to scroll
      const frameAnimation = gsap.to(
        { frame: 0 },
        {
          frame: FRAME_COUNT - 1,
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=3000',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
          onUpdate: function () {
            const newFrame = Math.round(
              (this as unknown as { progress: () => number }).progress() *
                (FRAME_COUNT - 1)
            );
            if (newFrame !== currentFrameRef.current) {
              currentFrameRef.current = newFrame;
              renderFrame(newFrame);
            }
          },
        }
      );

      // Hero text animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: 1,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -100, duration: 1 }
      );

      tl.fromTo(
        subheadingRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -80, duration: 1 },
        '<0.1'
      );

      tl.fromTo(
        buttonsRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -60, duration: 1 },
        '<0.1'
      );

      // Entrance animations
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.9,
        }
      );

      return () => {
        frameAnimation.kill();
      };
    }, sectionRef);

    // Handle resize
    const handleResize = () => renderFrame(currentFrameRef.current);
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, renderFrame]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-[#0D0D0D]"
    >
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D]">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="text-[#F97316]">TAJ KING</span>
            </h2>
            <p className="text-white/50 text-sm mb-8 tracking-[0.3em] uppercase">
              Shawarma
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${loadingProgress}%`,
                  background:
                    'linear-gradient(90deg, #F97316, #FFB703)',
                }}
              />
            </div>
            <p className="text-white/40 text-xs tracking-widest">
              {loadingProgress}% LOADING
            </p>
          </div>
        </div>
      )}

      {/* Canvas for Frame Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Warm Orange Cinematic Glow */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 80%, rgba(249, 115, 22, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 100%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
            linear-gradient(to top, rgba(13, 13, 13, 0.9) 0%, rgba(13, 13, 13, 0.3) 30%, rgba(13, 13, 13, 0.1) 50%, rgba(13, 13, 13, 0.4) 100%)
          `,
        }}
      />

      {/* Floating Spice Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {isLoaded &&
          spiceParticles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.width,
                height: p.height,
                background: p.background,
                left: p.left,
                bottom: p.bottom,
                opacity: p.opacity,
                animation: `ember-rise ${p.duration} ease-out infinite`,
                animationDelay: p.delay,
                '--drift': p.drift,
              } as React.CSSProperties}
            />
          ))}
      </div>

      {/* Soft Smoke Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isLoaded &&
          smokeParticles.map((s) => (
            <div
              key={`smoke-${s.id}`}
              className="absolute rounded-full"
              style={{
                width: s.width,
                height: s.height,
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.03), transparent)',
                left: s.left,
                bottom: s.bottom,
                animation: `smoke-rise ${s.duration} ease-out infinite`,
                animationDelay: s.delay,
                filter: 'blur(10px)',
              }}
            />
          ))}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-6">
          <p className="text-[#FFB703] text-sm md:text-base tracking-[0.4em] uppercase mb-4 font-medium">
            ✦ Premium Chicken Shawarma ✦
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold heading-luxury">
            <span className="block text-white">THE KING</span>
            <span className="block text-gradient mt-2">OF SHAWARMA</span>
          </h1>
        </div>

        {/* Subheading */}
        <div ref={subheadingRef} className="text-center mb-10 max-w-2xl">
          <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed">
            Authentic Flavours · Fresh Ingredients · Made with Passion
          </p>
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="tel:+918080894627"
            className="btn-primary text-base md:text-lg"
          >
            <span>🛒</span>
            Order Now
          </a>
          <a
            href="#menu"
            className="btn-secondary text-base md:text-lg"
          >
            View Menu
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase">
            Scroll
          </p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
