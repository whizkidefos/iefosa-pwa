"use client";

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { TechStack } from '@/components/sections/tech-stack';
import { AboutHero } from '@/components/sections/about-hero';
import { Journey } from '@/components/sections/journey';
import { FloatingMolecule } from '@/components/three/floating-molecule';
import Footer from '@/components/sections/footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16">
      <section className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <FloatingMolecule />
          </Canvas>
        </div>
        <AboutHero />
      </section>
      <TechStack />
      <Journey />
      <Footer />
    </main>
  );
}