"use client";

import { motion } from 'framer-motion';
import { SocialLinks } from '@/components/ui/social-links';
import { FooterNav } from '@/components/ui/footer-nav';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Efosa Igbinehi</h3>
            <p className="text-muted-foreground">
              AI Software Engineer crafting intelligent solutions for tomorrow's challenges.
            </p>
          </div>
          <FooterNav />
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <SocialLinks />
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Efosa Igbinehi. All rights reserved.</p>
          <small className='text-xs inline-block bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent font-medium'>Code n Jazz is poetry.</small>
        </div>
      </div>
    </footer>
  );
}