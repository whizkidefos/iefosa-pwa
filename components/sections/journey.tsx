"use client";

import { motion } from 'framer-motion';
import { JourneyItem } from '@/components/ui/journey-item';

const journeyData = [
  {
    year: "2024",
    title: "Senior AI Engineer",
    company: "Volkmann Express",
    description: "Leading AI initiatives and developing cutting-edge ML solutions"
  },
  {
    year: "2022",
    title: "Software Engineer",
    company: "Zaizi",
    description: "Developed and deployed production-ready ML models and interactive user interfaces"
  },
  {
    year: "2020",
    title: "Senior Developer",
    company: "Electric Circus Digital",
    description: "Full-stack development with focus on AI integration"
  },
  {
    year: "2018",
    title: "Frontend Developer",
    company: "Makkie, Vignola",
    description: "Developed responsive websites and web applications"
  },
  {
    year: "2015",
    title: "Webmaster, Web Designer",
    company: "Pagine Gialle (Italiaonline), Bologna",
    description: "Managed and designed websites for local businesses"
  },
  {
    year: "2014",
    title: "Junior Developer, Intern",
    company: "Evolve Web Agency, Modena",
    description: "Started my career as a junior developer building web applications"
  }
];

export function Journey() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          My Journey
        </motion.h2>
        <div className="space-y-12">
          {journeyData.map((item, index) => (
            <JourneyItem key={item.year} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}