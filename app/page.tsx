"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Loader } from '@/components/ui/loader';
import { MorphingBlob } from '@/components/three/morphing-blob';
import Hero from '@/components/sections/hero';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import Experience from '@/components/sections/experience';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from('.hero-text', {
      duration: 1,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: 'power4.out',
    });

    gsap.from('.skill-card', {
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top center',
        end: 'bottom center',
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={containerRef}>
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, 2]}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={<Loader />}>
              <MorphingBlob />
            </Suspense>
          </Canvas>
        </div>
        <Hero />
      </div>
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}