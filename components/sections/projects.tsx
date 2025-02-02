"use client";

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui/project-card';

const projects = [
  {
    title: 'AI Image Generator',
    description: 'A deep learning model that generates unique images from text descriptions',
    image: 'https://images.unsplash.com/photo-1547954575-855750c57bd3',
    tags: ['Python', 'PyTorch', 'React', 'AWS'],
    link: '#',
  },
  {
    title: 'Cloud Optimization Platform',
    description: 'Platform for optimizing cloud resource allocation and costs',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    tags: ['TypeScript', 'Next.js', 'AWS', 'Terraform'],
    link: '#',
  },
  {
    title: 'MLOps Pipeline',
    description: 'Automated ML model training and deployment pipeline',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a',
    tags: ['Python', 'Docker', 'Kubernetes', 'CI/CD'],
    link: '#',
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
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}