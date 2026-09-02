import { BlogPost } from '@/components/sections/blog-post';
import Footer from '@/components/sections/footer';
import { getPostBySlug } from '@/lib/firebase/admin-services';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

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
