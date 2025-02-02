import { BlogPost } from '@/components/sections/blog-post';
import Footer from '@/components/sections/footer';
import { blogPosts } from '@/lib/blog-data.tsx';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <BlogPost post={post} />
      <Footer />
    </main>
  );
}