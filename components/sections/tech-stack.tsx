"use client";

import { motion } from 'framer-motion';
import { TechCard } from '@/components/ui/tech-card';

const technologies = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Rust", "Go"]
  },
  {
    category: "AI/ML",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face"]
  },
  {
    category: "Web",
    items: ["React", "Next.js", "Node.js", "GraphQL"]
  },
  {
    category: "Cloud",
    items: ["AWS", "GCP", "Docker", "Kubernetes"]
  }
];

export function TechStack() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Tech Stack
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <TechCard key={tech.category} {...tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}