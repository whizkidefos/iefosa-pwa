"use client";

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui/project-card';
import { Type } from 'lucide-react';

const projects = [
  {
    title: 'ABAP Code Analyzer',
    description: 'Analyze and improve your ABAP code quality with S/4HANA best practices',
    image: '/project-screenshots/abap-code-analyzer.png',
    tags: ['Python', 'PyTorch', 'React', 'AWS', 'TypeScript'],
    link: 'https://abap-analyzer.vercel.app/',
  },
  {
    title: 'Cloud Optimization Platform',
    description: 'Platform for optimizing cloud resource allocation and costs',
    image: '/project-screenshots/cloud-optimize.jpeg',
    tags: ['TypeScript', 'Next.js', 'AWS', 'Terraform'],
    link: 'https://cloud-optimisation-platform.vercel.app/',
  },
  {
    title: 'ML Model Analytics',
    description: 'A real-time dashboard for monitoring and visualizing machine learning model performance metrics.',
    image: '/project-screenshots/ml-metrics.jpeg',
    tags: ['Python', 'Docker', 'Tensorflow', 'CI/CD', 'React'],
    link: 'https://ml-model-analytics.vercel.app/',
  },
];

export default function Projects() {
  return (
    <section className="projects-section py-20 px-4 md:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}