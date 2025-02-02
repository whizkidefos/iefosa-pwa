"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutHero() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-4 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48 mx-auto mb-12"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow" />
          <div className="absolute inset-[3px] rounded-full bg-background" />
          <div className="absolute inset-[6px] rounded-full overflow-hidden">
            <Image
              src="/efosa_igbinehi.webp"
              alt="Profile"
              width={192}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-6 text-lg text-muted-foreground"
        >
          <p>
            I'm a passionate AI Engineer and Full Stack Developer with over 5 years of experience
            in building intelligent solutions. My journey in tech started with traditional software
            development and evolved into specializing in artificial intelligence and machine learning.
          </p>
          <p>
            Currently focused on developing AI-powered applications that solve real-world problems,
            I combine my expertise in both software engineering and machine learning to create
            scalable, efficient solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}