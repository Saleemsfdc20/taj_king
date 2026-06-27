'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import OurStory from '@/components/OurStory';
import WhyChooseUs from '@/components/WhyChooseUs';
import SignatureShawarmas from '@/components/SignatureShawarmas';
import FreshIngredients from '@/components/FreshIngredients';
import CustomerReviews from '@/components/CustomerReviews';
import Gallery from '@/components/Gallery';
import VisitUs from '@/components/VisitUs';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initial ScrollTrigger recalculation
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      <Navbar />
      <HeroSection />

      {/* Section Divider */}
      <div className="section-divider mx-8 md:mx-16" />

      <OurStory />

      <div className="section-divider mx-8 md:mx-16" />

      <WhyChooseUs />

      <div className="section-divider mx-8 md:mx-16" />

      <SignatureShawarmas />

      <div className="section-divider mx-8 md:mx-16" />

      <FreshIngredients />

      <div className="section-divider mx-8 md:mx-16" />

      <CustomerReviews />

      <div className="section-divider mx-8 md:mx-16" />

      <Gallery />

      <div className="section-divider mx-8 md:mx-16" />

      <VisitUs />

      <FinalCTA />

      <Footer />
    </main>
  );
}
