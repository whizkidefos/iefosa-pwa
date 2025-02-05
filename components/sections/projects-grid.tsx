"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'ML Model Analytics',
    description: 'A real-time dashboard for monitoring and visualizing machine learning model performance metrics.',
    image: '/project-screenshots/ml-metrics.jpeg',
    tags: ['Python', 'Docker', 'Tensorflow', 'CI/CD', 'React'],
    link: 'https://ml-model-analytics.vercel.app/',
  },
  {
    title: 'Volkmann Express',
    description: 'Innovative enterprise solutions that empower businesses to thrive in the digital era through cutting-edge technology',
    image: '/project-screenshots/volkmannexpress.png',
    tags: ['TypeScript', 'Next.js', 'Azure', 'Terraform', 'Tailwind CSS'],
    link: 'https://volkmannexpress-delta.vercel.app/',
  },
  {
    title: 'MLOps Pipeline',
    description: 'Automated ML model training and deployment pipeline with monitoring',
    image: '/project-screenshots/mlops-pipeline.png',
    tags: ['Python', 'Docker', 'React', 'CI/CD', 'TensorFlow'],
    link: 'https://ml-pipeline-tensorflow.vercel.app/',
  },
  {
    title: 'Malichis Group',
    description: 'From property management to community development, we\'re committed to excellence in everything we do.',
    image: '/project-screenshots/malichis-group.png',
    tags: ['React', 'Next.js', 'Node.js', 'Redis', 'Tailwind CSS'],
    link: 'https://www.malichisgroup.com/',
  },
  {
    title: 'NLP Document Processor',
    description: 'Advanced natural language processing system for document analysis and extraction',
    image: '/project-screenshots/nlp-processor.png',
    tags: ['Python', 'SpaCy', 'FastAPI', 'MongoDB'],
    link: 'https://nlp-document-processor.vercel.app/',
  },
  {
    title: 'Blockchain Analytics Tool',
    description: 'Real-time blockchain data analysis and visualization platform',
    image: '/project-screenshots/blockchain-analytics-dashboard.jpeg',
    tags: ['Python', 'GraphQL', 'Web3.js', 'PostgreSQL', 'React'],
    link: 'https://blockchain-analytics-dashboard-iota.vercel.app/',
  },
  {
    title: 'ABAP Code Analyzer',
    description: 'Analyze and improve your ABAP code quality with S/4HANA best practices',
    image: '/project-screenshots/abap-code-analyzer.png',
    tags: ['Python', 'PyTorch', 'React', 'AWS', 'TypeScript'],
    link: 'https://abap-analyzer.vercel.app/',
  },
  {
    title: 'IoT Data Platform',
    description: 'Scalable platform for collecting, processing, and analyzing IoT sensor data',
    image: '/project-screenshots/iot-data-platform.png',
    tags: ['Go', 'MQTT', 'TimescaleDB', 'Grafana'],
    link: '#',
  },
  {
    title: 'Web3 ICO Platform',
    description: 'Decentralized platform for launching and managing ICOs on the Ethereum blockchain',
    image: '/project-screenshots/web3-ico-platform.png',
    tags: ['Next.js', 'Solidity', 'ChartJS', 'Tailwind CSS'],
    link: '#',
  },
  {
    title: 'Quantum Algorithm Simulator',
    description: 'Simulator for testing and visualizing quantum computing algorithms',
    image: '/project-screenshots/quantum-simulator.png',
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
    title: 'Blockchain Edu Platform',
    description: 'Educational platform for learning blockchain development and smart contract programming',
    image: '/project-screenshots/blockchain-edu-platform.png',
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