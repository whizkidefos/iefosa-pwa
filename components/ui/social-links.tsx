"use client";

import { motion } from 'framer-motion';
import { Linkedin, Mail, X, GitBranch } from 'lucide-react';
import { Button } from './button';
import { useTheme } from 'next-themes';

const socialLinks = [
  {
    name: 'GitHub',
    icon: GitBranch,
    href: 'https://github.com/whizkidefos',
    color: '#181717'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/efosaigbinehi/',
    color: '#0A66C2'
  },
  {
    name: 'Twitter',
    icon: X,
    href: 'https://twitter.com/whizkidefos',
    color: '#1DA1F2'
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:me@iefosa.me',
    color: '#EA4335'
  },
];

export function SocialLinks() {
  const { resolvedTheme } = useTheme();
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
              {link.name === 'GitHub' && resolvedTheme === 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#github-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient id="github-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" /> {/* blue-400 */}
                      <stop offset="100%" stopColor="#A855F7" /> {/* purple-500 */}
                    </linearGradient>
                  </defs>
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              ) : (
                <link.icon className="h-5 w-5" style={{ color: link.color }} />
              )}
            </a>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}