"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().url('Must be a valid URL'),
  readTime: z.number().min(1, 'Read time is required'),
  tags: z.string().transform(str => str.split(',').map(s => s.trim())),
});

type PostFormData = z.infer<typeof postSchema>;

export default function AdminBlogPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from('posts').insert({
        ...data,
        date: new Date().toISOString(),
      });

      if (error) throw error;
      
      toast.success('Post created successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to create post');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create Blog Post</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            placeholder="Title"
            {...register('title')}
          />
          {errors.title && (
            <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Slug (URL-friendly name)"
            {...register('slug')}
          />
          {errors.slug && (
            <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Excerpt"
            {...register('excerpt')}
          />
          {errors.excerpt && (
            <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Content (Markdown supported)"
            className="min-h-[200px]"
            {...register('content')}
          />
          {errors.content && (
            <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Image URL"
            {...register('image')}
          />
          {errors.image && (
            <p className="text-sm text-destructive mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Read Time (minutes)"
            {...register('readTime', { valueAsNumber: true })}
          />
          {errors.readTime && (
            <p className="text-sm text-destructive mt-1">{errors.readTime.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Tags (comma-separated)"
            {...register('tags')}
          />
          {errors.tags && (
            <p className="text-sm text-destructive mt-1">{errors.tags.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
}