"use client";

import { Canvas } from '@react-three/fiber';
import { ProjectsGrid } from '@/components/sections/projects-grid';
import { ProjectsHero } from '@/components/sections/projects-hero';
import { FloatingCubes } from '@/components/three/floating-cubes';
import Footer from '@/components/sections/footer';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <section className="min-h-[60vh] relative overflow-hidden pt-32">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <FloatingCubes />
          </Canvas>
        </div>
        <ProjectsHero />
      </section>
      <ProjectsGrid />
      <Footer />
    </main>
  );
}