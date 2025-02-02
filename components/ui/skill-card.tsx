"use client";

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  technologies: string[];
  color: string;
}

export function SkillCard({ title, icon: Icon, description, technologies, color }: SkillCardProps) {
  return (
    <div className="group h-full flex flex-col p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300">
      <div className={cn('inline-flex p-3 rounded-lg mb-4', color)}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}