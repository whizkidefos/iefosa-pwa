"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'AI Image Generator',
    description: 'Deep learning model that generates unique images from text descriptions using stable diffusion',
    image: 'https://images.unsplash.com/photo-1547954575-855750c57bd3',
    tags: ['Python', 'PyTorch', 'React', 'AWS'],
    link: '#',
  },
  {
    title: 'Cloud Optimization Platform',
    description: 'ML-powered platform for optimizing cloud resource allocation and costs',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    tags: ['TypeScript', 'Next.js', 'AWS', 'Terraform'],
    link: '#',
  },
  {
    title: 'MLOps Pipeline',
    description: 'Automated ML model training and deployment pipeline with monitoring',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a',
    tags: ['Python', 'Docker', 'Kubernetes', 'CI/CD'],
    link: '#',
  },
  {
    title: 'Real-time Analytics Dashboard',
    description: 'Interactive dashboard for monitoring ML model performance metrics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tags: ['React', 'D3.js', 'Node.js', 'Redis'],
    link: '#',
  },
  {
    title: 'NLP Document Processor',
    description: 'Advanced natural language processing system for document analysis and extraction',
    image: 'https://images.unsplash.com/photo-1456953180671-730de08edaa7',
    tags: ['Python', 'SpaCy', 'FastAPI', 'MongoDB'],
    link: '#',
  },
  {
    title: 'Blockchain Analytics Tool',
    description: 'Real-time blockchain data analysis and visualization platform',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
    tags: ['Rust', 'GraphQL', 'Web3.js', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'AI Recommendation Engine',
    description: 'Personalized recommendation system using collaborative filtering and deep learning',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
    link: '#',
  },
  {
    title: 'IoT Data Platform',
    description: 'Scalable platform for collecting, processing, and analyzing IoT sensor data',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f',
    tags: ['Go', 'MQTT', 'TimescaleDB', 'Grafana'],
    link: '#',
  },
  {
    title: 'Computer Vision System',
    description: 'Real-time object detection and tracking system using deep learning',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a',
    tags: ['Python', 'OpenCV', 'YOLO', 'TensorRT'],
    link: '#',
  },
  {
    title: 'Quantum Algorithm Simulator',
    description: 'Simulator for testing and visualizing quantum computing algorithms',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    tags: ['Python', 'Qiskit', 'React', 'TypeScript'],
    link: '#',
  },
  {
    title: 'Federated Learning Platform',
    description: 'Distributed machine learning system that preserves data privacy across organizations',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    tags: ['Python', 'TensorFlow Federated', 'gRPC', 'Kubernetes'],
    link: '#',
  },
  {
    title: 'AI-Powered Code Assistant',
    description: 'Intelligent code completion and suggestion system using transformer models',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
    tags: ['Python', 'Transformers', 'FastAPI', 'Vue.js'],
    link: '#',
  },
];

const PROJECTS_PER_PAGE = 6;

export function ProjectsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(index + 1)}
                  className="w-8 h-8"
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}