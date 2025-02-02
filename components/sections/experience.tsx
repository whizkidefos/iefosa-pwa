"use client";

import { motion } from 'framer-motion';
import { ExperienceCard } from '@/components/ui/experience-card';
import { Timeline } from '@/components/ui/timeline';

const experiences = [
  {
    title: 'Senior AI Engineer',
    company: 'TechCorp',
    period: '2022 - Present',
    description: 'Leading AI initiatives and developing cutting-edge ML solutions',
    technologies: ['PyTorch', 'TensorFlow', 'AWS', 'Docker'],
  },
  {
    title: 'Machine Learning Engineer',
    company: 'DataTech Solutions',
    period: '2020 - 2022',
    description: 'Developed and deployed production-ready ML models',
    technologies: ['Python', 'Scikit-learn', 'Kubernetes', 'MLflow'],
  },
  {
    title: 'Software Engineer',
    company: 'Innovation Labs',
    period: '2018 - 2020',
    description: 'Full-stack development with focus on AI integration',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
  },
];

export default function Experience() {
  return (
    <section className="experience-section py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Experience
        </h2>
        <Timeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} index={index} />
          ))}
        </Timeline>
      </div>
    </section>
  );
}