"use client";

import { motion } from 'framer-motion';
import { Linkedin, Mail, X, GitBranch } from 'lucide-react';
import { Button } from './button';

const socialLinks = [
  {
    name: 'GitHub',
    icon: GitBranch,
    href: 'https://github.com/whizkidefos',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/efosaigbinehi/',
  },
  {
    name: 'Twitter',
    icon: X,
    href: 'https://twitter.com/whizkidefos',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:me@iefosa.me',
  },
];

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((link) => (
        <motion.div
          key={link.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}