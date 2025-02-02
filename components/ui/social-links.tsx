"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from './button';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/efosa',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/efosa',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/efosa',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:hello@efosa.dev',
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