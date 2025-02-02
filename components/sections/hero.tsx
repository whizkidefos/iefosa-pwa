"use client";

import { Canvas } from '@react-three/fiber';
import { HeroTitle } from './hero/hero-title';
import { HeroCTA } from './hero/hero-cta';
import { HeroStats } from './hero/hero-stats';
import { MorphingBlob } from '@/components/three/morphing-blob';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <MorphingBlob />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <HeroTitle />
        <HeroCTA />
        <HeroStats />
      </div>
    </section>
  );
}