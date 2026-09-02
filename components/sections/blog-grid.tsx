"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/ui/blog-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getPublishedPosts } from '@/lib/firebase/client-services';
import type { Post } from '@/lib/types';

const POSTS_PER_PAGE = 6;

export function BlogGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  if (loading) {
    return (
      <section className="py-20 px-4 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(index + 1)}
                  className="w-8 h-8"
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
