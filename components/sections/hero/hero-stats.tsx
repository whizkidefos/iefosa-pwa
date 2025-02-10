"use client";

import { motion } from 'framer-motion';

const stats = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Projects Completed', value: '100+' },
  { label: 'Technologies', value: '30+' },
];

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="grid md:grid-cols-3 sm:grid-cols-1 gap-8 mt-16"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            {stat.value}
          </div>
          <div className="text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}