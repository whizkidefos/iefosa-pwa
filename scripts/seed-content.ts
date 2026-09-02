import 'dotenv/config';
import { renderToString } from 'react-dom/server';
import { blogPosts } from '../lib/seed/blog-posts';
import { projects } from '../lib/seed/projects';
import { adminDb } from '../lib/firebase/admin';

async function seed() {
  const postsCol = adminDb.collection('posts');
  const projectsCol = adminDb.collection('projects');

  const batch = adminDb.batch();
  const now = new Date().toISOString();

  blogPosts.forEach((post) => {
    const ref = postsCol.doc();
    batch.set(ref, {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: renderToString(post.content as any),
      contentType: 'html',
      date: post.date,
      image: post.image,
      readTime: post.readTime,
      tags: post.tags,
      published: true,
      createdAt: now,
      updatedAt: now,
    });
  });

  projects.forEach((project, index) => {
    const ref = projectsCol.doc();
    batch.set(ref, {
      ...project,
      order: index,
      featured: false,
      createdAt: now,
      updatedAt: now,
    });
  });

  await batch.commit();
  console.log(`Seeded ${blogPosts.length} posts and ${projects.length} projects.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
