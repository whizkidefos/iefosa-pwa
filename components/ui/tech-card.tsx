"use client";

import { motion } from 'framer-motion';

interface TechCardProps {
  category: string;
  items: string[];
  index: number;
}

export function TechCard({ category, items, index }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}