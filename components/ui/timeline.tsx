"use client";

import { motion } from 'framer-motion';

interface TimelineProps {
  children: React.ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border transform -translate-x-1/2" />
      <div className="space-y-12">
        {children}
      </div>
    </div>
  );
}