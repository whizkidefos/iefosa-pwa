"use client";

import { motion } from 'framer-motion';
import { SkillGrid } from './skill-grid';

export default function Skills() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combining expertise in AI, software development, and cloud technologies
            to build intelligent solutions for complex problems.
          </p>
        </motion.div>
        <SkillGrid />
      </div>
    </section>
  );
}