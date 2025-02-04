"use client";

import { Brain, Code2, Network, Cpu, Database, Smartphone, Cloud, Bot, FileCode } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Skill {
  title: string;
  icon: LucideIcon;
  description: string;
  technologies: string[];
  color: string;
}

export const skills: Skill[] = [
  {
    title: 'AI Development',
    icon: Brain,
    description: 'Building and deploying advanced machine learning models and AI solutions',
    technologies: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'NLP', 'Computer Vision'],
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Full Stack Development',
    icon: Code2,
    description: 'Creating modern web applications with cutting-edge technologies',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL', 'Django', 'Flask', 'Laravel'],
    color: 'bg-green-500/10 text-green-500',
  },
  {
    title: 'Cloud Architecture',
    icon: Cloud,
    description: 'Designing scalable and resilient cloud-native solutions',
    technologies: ['AWS', 'GCP', 'Azure', 'Terraform', 'Serverless', 'Microservices'],
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'MLOps',
    icon: Cpu,
    description: 'Streamlining ML model deployment and operations',
    technologies: ['Docker', 'Kubernetes', 'CI/CD', 'MLflow', 'SonarQube'],
    color: 'bg-pink-500/10 text-pink-500',
  },
  {
    title: 'Data Engineering',
    icon: Database,
    description: 'Building robust data pipelines and infrastructure',
    technologies: ['Spark', 'Kafka', 'Airflow', 'dbt', 'BigQuery', 'Snowflake'],
    color: 'bg-yellow-500/10 text-yellow-500',
  },
  {
    title: 'RPA',
    icon: Bot,
    description: 'Automating repetitive tasks and business processes',
    technologies: ['Power Automate', 'Python RPA', 'Automation Anywhere', 'Blue Prism', 'WinAutomation', 'Puppeteer'],
    color: 'bg-red-500/10 text-red-500',
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    description: 'Building cross-platform mobile applications',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
    color: 'bg-indigo-500/10 text-indigo-500',
  },
  {
    title: 'Backend Development',
    icon: Network,
    description: 'Building robust and performant server-side applications',
    technologies: ['Elixir', 'PHP', 'Python', 'gRPC', 'REST', 'WebSockets'],
    color: 'bg-orange-500/10 text-orange-500',
  },
  {
    title: 'SAP Development',
    icon: FileCode,
    description: 'Enterprise software development with SAP technologies',
    technologies: ['ABAP', 'SAP HANA', 'SAP Fiori', 'SAP UI5'],
    color: 'bg-cyan-500/10 text-cyan-500',
  },
] as const;