"use client";

import { motion } from 'framer-motion';
import { TechCard } from '@/components/ui/tech-card';

interface TechItem {
  name: string;
  icon?: string;
}

const technologies = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "FileCode", color: "#3776AB" },
      { name: "TypeScript", icon: "FileType", color: "#3178C6" },
      { name: "PHP", icon: "FileCode2", color: "#777BB4" },
      { name: "C#", icon: "Hash", color: "#239120" },
      { name: "JavaScript", icon: "FileJson", color: "#F7DF1E" },
      { name: "Dart", icon: "Target", color: "#0175C2" }
    ]
  },
  {
    category: "AI/ML",
    items: [
      { name: "PyTorch", icon: "Flame", color: "#EE4C2C" },
      { name: "TensorFlow", icon: "Network", color: "#FF6F00" },
      { name: "Scikit-learn", icon: "Microscope", color: "#F89939" },
      { name: "Hugging Face", icon: "Bot", color: "#FFD21E" },
      { name: "FastAPI", icon: "Zap", color: "#009688" },
      { name: "Streamlit", icon: "BarChart", color: "#FF4B4B" }
    ]
  },
  {
    category: "Web/Mobile",
    items: [
      { name: "React", icon: "Atom", color: "#61DAFB" },
      { name: "Next.js", icon: "CornerRightDown", color: "#000000" },
      { name: "Node.js", icon: "Server", color: "#339933" },
      { name: "Symfony", icon: "Infinity", color: "#000000" },
      { name: "Django", icon: "Layers", color: "#092E20" },
      { name: "Flask", icon: "Beaker", color: "#000000" },
      { name: "Laravel", icon: "Hexagon", color: "#FF2D20" },
      { name: "Flutter", icon: "Smartphone", color: "#02569B" },
      { name: "React Native", icon: "Smartphone", color: "#61DAFB" }
    ]
  },
  {
    category: "Cloud",
    items: [
      { name: "AWS", icon: "Cloud", color: "#FF9900" },
      { name: "GCP", icon: "CloudCog", color: "#4285F4" },
      { name: "Docker", icon: "Container", color: "#2496ED" },
      { name: "Azure", icon: "CloudSun", color: "#0078D4" }
    ]
  }
];

export function TechStack() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Tech Stack
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <TechCard key={tech.category} {...tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}