"use client";

import { motion } from 'framer-motion';
import { ExperienceCard } from '@/components/ui/experience-card';
import { Timeline } from '@/components/ui/timeline';

const experiences = [
  {
    title: 'Senior AI Engineer',
    company: 'Freelance',
    period: '2022 - Present',
    description: 'Leading AI initiatives and developing cutting-edge ML solutions',
    technologies: ['PyTorch', 'TensorFlow', 'AWS', 'Docker'],
  },
  {
    title: 'Software Engineer',
    company: 'Electric Circus Digital',
    period: '2020 - 2022',
    description: 'Developed and deployed production-ready ML models and backend services',
    technologies: ['Python', 'PHP', 'WordPress', 'Laravel', 'Scikit-learn', 'Kubernetes', 'MLflow'],
  },
  {
    title: 'Software Engineer',
    company: 'Makkie Communications Labs, Vignola',
    period: '2018 - 2020',
    description: 'Full-stack development with focus on AI integration and API development',
    technologies: ['React', 'Node.js', 'Node', 'PostgreSQL', 'Redis', 'Django', 'Flask', 'Scikit-learn'],
  },
  {
    'title': 'Webmaster, Graphics and Web Designer',
    'company': 'Pagine Gialle | Yellow Pages',
    'period': '2015 - 2018',
    'description': 'Designed and developed websites and graphics for over 60 clients',
    'technologies': ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'Photoshop', 'Illustrator', 'InDesign'],

  }
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