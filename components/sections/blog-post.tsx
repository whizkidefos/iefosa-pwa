"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/lib/types';
import { SocialShare } from '@/components/blog/social-share';
import { ReactionButtons } from '@/components/blog/reaction-buttons';

interface BlogPostProps {
  post: Post;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>

          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <ReactionButtons postId={post.slug} />
        </div>

        <div className="mt-8 mb-12">
          <SocialShare
            title={post.title}
            url={typeof window !== 'undefined' ? window.location.href : ''}
          />
        </div>

        <div
          className="mt-12 prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.div>
    </article>
  );
}
