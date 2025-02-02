"use client";

import { motion } from 'framer-motion';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  index: number;
}

export function ExperienceCard({
  title,
  company,
  period,
  description,
  technologies,
  index,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:flex md:items-center md:justify-between">
        <div className="md:w-1/2 md:pr-8 md:text-right">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-primary">{company}</p>
          <p className="text-muted-foreground">{period}</p>
        </div>
        <div className="absolute left-0 md:left-1/2 mt-6 md:mt-0">
          <div className="h-4 w-4 rounded-full bg-primary transform -translate-x-1/2" />
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}