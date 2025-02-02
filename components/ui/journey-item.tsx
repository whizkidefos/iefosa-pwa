"use client";

import { motion } from 'framer-motion';

interface JourneyItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  index: number;
}

export function JourneyItem({ year, title, company, description, index }: JourneyItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-8 border-l-2 border-primary/20"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
      <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/10 text-primary mb-2">
        {year}
      </span>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground mb-2">{company}</p>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}