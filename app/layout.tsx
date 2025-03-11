import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';

import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Efosa - AI Software Engineer',
  description: 'Portfolio of Efosa - AI Software Engineer specializing in modern web technologies and artificial intelligence.',
  keywords: ['AI Engineer', 'Software Developer', 'Web Development', 'Machine Learning', 'Portfolio', 'Mobile Development', 'Serverless', 'Security Analyst', 'Efosa', 'Backend Developer', 'Frontend Developer', 'Fullstack Developer'],
  icons: ['https://iefosa.me/icon.svg'],
  authors: [{ name: 'Efosa' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iefosa.me',
    title: 'Efosa - AI Software Engineer',
    description: 'Portfolio of Efosa - AI Software Engineer specializing in modern web technologies and artificial intelligence.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Efosa - AI Software Engineer',
    description: 'Portfolio of Efosa - AI Software Engineer specializing in modern web technologies and artificial intelligence.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollIndicator />
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}