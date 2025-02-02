"use client";

import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export function FooterNav() {
  return (
    <nav>
      <h4 className="font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}