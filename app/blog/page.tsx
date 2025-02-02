"use client";

import { Canvas } from '@react-three/fiber';
import { BlogHero } from '@/components/sections/blog-hero';
import { BlogGrid } from '@/components/sections/blog-grid';
import { FloatingParticles } from '@/components/three/floating-particles';
import Footer from '@/components/sections/footer';

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <section className="min-h-[40vh] relative overflow-hidden pt-32">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <FloatingParticles />
          </Canvas>
        </div>
        <BlogHero />
      </section>
      <BlogGrid />
      <Footer />
    </main>
  );
}