"use client";

import { motion } from 'framer-motion';

export function ContactHero() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Connect
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind? Let's discuss how we can work together.
        </motion.p>
      </div>
    </div>
  );
}