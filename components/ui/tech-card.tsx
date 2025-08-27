"use client";

import { motion } from 'framer-motion';
import {
  FileCode, FileType, FileCode2, Hash, FileJson, Target,
  Flame, Network, Microscope, Bot, Zap, BarChart,
  Atom, CornerRightDown, Server, Infinity, Layers, Beaker, Hexagon, Smartphone,
  Cloud, CloudCog, Container, CloudSun,
  LucideProps
} from 'lucide-react';

// Define the tech item interface
interface TechItem {
  name: string;
  icon?: string;
  color?: string;
}

interface TechCardProps {
  category: string;
  items: TechItem[];
  index: number;
}

// Map of icon names to icon components
type IconComponent = React.ComponentType<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  FileCode, FileType, FileCode2, Hash, FileJson, Target,
  Flame, Network, Microscope, Bot, Zap, BarChart,
  Atom, CornerRightDown, Server, Infinity, Layers, Beaker, Hexagon, Smartphone,
  Cloud, CloudCog, Container, CloudSun
};

export function TechCard({ category, items, index }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const IconComponent = item.icon ? iconMap[item.icon] : null;
          
          return (
            <span
              key={item.name}
              className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground flex items-center gap-1.5"
            >
              {IconComponent && <IconComponent size={14} color={item.color || undefined} />}
              {item.name}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}