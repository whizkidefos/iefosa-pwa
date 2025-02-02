import React, { ReactNode } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: ReactNode;
  date: string;
  image: string;
  readTime: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'future-of-ai',
    title: 'The Future of AI: Trends to Watch in 2024',
    excerpt: 'Exploring the most promising developments in artificial intelligence and their potential impact.',
    content: (
      <div className="space-y-6">
        <p>
          Artificial Intelligence continues to evolve at an unprecedented pace, transforming industries
          and creating new possibilities. In this post, we'll explore the key trends shaping the
          future of AI in 2024 and beyond.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Multimodal AI Models</h2>
        <p>
          The next generation of AI models will seamlessly integrate different types of data - text,
          images, audio, and video - to provide more comprehensive and nuanced understanding.
        </p>
      </div>
    ),
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    readTime: 5,
    tags: ['AI', 'Technology', 'Future']
  },
  {
    slug: 'web-development-2024',
    title: 'Modern Web Development: Best Practices for 2024',
    excerpt: 'A comprehensive guide to the latest tools, frameworks, and methodologies in web development.',
    content: (
      <div className="space-y-6">
        <p>
          Web development continues to evolve rapidly, with new tools and best practices emerging
          regularly. Let's explore what's shaping modern web development in 2024.
        </p>
      </div>
    ),
    date: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    readTime: 7,
    tags: ['Web Development', 'JavaScript', 'Performance']
  },
  {
    slug: 'machine-learning-optimization',
    title: 'Optimizing Machine Learning Models for Production',
    excerpt: 'Learn how to optimize ML models for production environments while maintaining accuracy.',
    content: (
      <div className="space-y-6">
        <p>
          Deploying machine learning models in production requires careful optimization to ensure
          both performance and reliability. Here's what you need to know.
        </p>
      </div>
    ),
    date: '2024-03-05',
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc',
    readTime: 6,
    tags: ['Machine Learning', 'MLOps', 'Performance']
  },
  {
    slug: 'cloud-native-architecture',
    title: 'Building Cloud-Native Applications',
    excerpt: 'A deep dive into modern cloud-native architecture patterns and best practices.',
    content: (
      <div className="space-y-6">
        <p>
          Cloud-native development has become the standard for modern applications. Learn about
          microservices, containers, and serverless architectures.
        </p>
      </div>
    ),
    date: '2024-03-01',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    readTime: 8,
    tags: ['Cloud', 'Architecture', 'DevOps']
  },
  {
    slug: 'cybersecurity-essentials',
    title: 'Essential Cybersecurity Practices for Developers',
    excerpt: 'Key security considerations every developer should know in the modern threat landscape.',
    content: (
      <div className="space-y-6">
        <p>
          With increasing cyber threats, security can't be an afterthought. Learn about essential
          security practices for modern application development.
        </p>
      </div>
    ),
    date: '2024-02-25',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    readTime: 5,
    tags: ['Security', 'DevSecOps', 'Best Practices']
  },
  {
    slug: 'quantum-computing',
    title: 'Quantum Computing: A Developer\'s Introduction',
    excerpt: 'Understanding the basics of quantum computing and its potential impact on software development.',
    content: (
      <div className="space-y-6">
        <p>
          Quantum computing is poised to revolutionize certain areas of computation. Learn about
          the fundamentals and how it might affect future software development.
        </p>
      </div>
    ),
    date: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    readTime: 9,
    tags: ['Quantum Computing', 'Future Tech', 'Innovation']
  },
  {
    slug: 'edge-computing-trends',
    title: 'Edge Computing: The Future of Distributed Systems',
    excerpt: 'Exploring the latest trends in edge computing and its impact on modern architecture.',
    content: (
      <div className="space-y-6">
        <p>
          Edge computing is revolutionizing how we process and deliver data. Discover the latest
          trends and best practices in distributed systems architecture.
        </p>
      </div>
    ),
    date: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    readTime: 7,
    tags: ['Edge Computing', 'Architecture', 'Innovation']
  },
  {
    slug: 'blockchain-development',
    title: 'Getting Started with Blockchain Development',
    excerpt: 'A comprehensive guide to building decentralized applications and smart contracts.',
    content: (
      <div className="space-y-6">
        <p>
          Blockchain technology continues to evolve and mature. Learn how to build secure and
          efficient decentralized applications using modern tools and frameworks.
        </p>
      </div>
    ),
    date: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
    readTime: 8,
    tags: ['Blockchain', 'Web3', 'Development']
  },
  {
    slug: 'ai-ethics',
    title: 'Ethics in AI Development',
    excerpt: 'Understanding the ethical considerations and responsibilities in AI development.',
    content: (
      <div className="space-y-6">
        <p>
          As AI becomes more prevalent, understanding and implementing ethical guidelines is crucial.
          Explore the key considerations for responsible AI development.
        </p>
      </div>
    ),
    date: '2024-02-05',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    readTime: 6,
    tags: ['AI', 'Ethics', 'Technology']
  }
];