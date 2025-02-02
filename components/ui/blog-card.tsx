"use client";

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/blog-data';

export function BlogCard({ slug, title, excerpt, date, image, readTime, tags }: BlogPost) {
  return (
    <Link href={`/blog/${slug}`}>
      <motion.article 
        className="group h-full bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={date}>
              {format(new Date(date), 'MMM d, yyyy')}
            </time>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}