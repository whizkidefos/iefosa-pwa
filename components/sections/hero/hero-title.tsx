"use client";

import { motion } from 'framer-motion';
import { GradientText } from '@/components/ui/gradient-text';

export function HeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 mt-8">
        Hi, I'm <GradientText>Efosa</GradientText>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground">
        AI Engineer crafting intelligent solutions for tomorrow
      </p>
    </motion.div>
  );
}