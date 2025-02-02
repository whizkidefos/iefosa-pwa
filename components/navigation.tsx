"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Moon, Sun, Home, Code, User, Send, Menu, X, BookOpen, Circle } from 'lucide-react';
import { Button } from './ui/button';

const menuItems = [
  { name: 'Home', href: '/', icon: Home, color: 'text-blue-500' },
  { name: 'Projects', href: '/projects', icon: Code, color: 'text-green-500' },
  { name: 'About', href: '/about', icon: User, color: 'text-purple-500' },
  { name: 'Blog', href: '/blog', icon: BookOpen, color: 'text-yellow-500' },
  { name: 'Contact', href: '/contact', icon: Send, color: 'text-pink-500' },
];

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <Circle className="w-3 h-3 text-primary animate-pulse" />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-2xl group-hover:text-primary transition-colors"
            >
              Efosa
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 ${item.color} hover:opacity-80 transition-opacity`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 ${item.color} px-3 py-2 rounded-md hover:bg-accent`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
                setIsOpen(false);
              }}
              className="w-full justify-start px-3 py-2"
            >
              {theme === 'dark' ? (
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <span>Light Mode</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </div>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}