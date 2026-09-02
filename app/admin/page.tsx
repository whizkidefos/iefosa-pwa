"use client";

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, LogOut, Plus, Trash2, Pencil, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Post, Project, Message } from '@/lib/types';
import {
  getAdminPosts,
  createAdminPost,
  updateAdminPost,
  deleteAdminPost,
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  getAdminMessages,
  markAdminMessageRead,
  deleteAdminMessage,
  uploadImage,
} from '@/lib/firebase/admin-client-services';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const emptyPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'> = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  contentType: 'html',
  date: new Date().toISOString().split('T')[0],
  image: '',
  readTime: 5,
  tags: [],
  published: false,
};

const emptyProject: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  image: '',
  tags: [],
  link: '',
  order: 0,
  featured: false,
};

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading, login, logout } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blog');

  const [postOpen, setPostOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postForm, setPostForm] = useState(emptyPost);

  const [projectOpen, setProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState(emptyProject);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const loadData = async () => {
    try {
      const [p, pr, m] = await Promise.all([
        getAdminPosts(),
        getAdminProjects(),
        getAdminMessages(),
      ]);
      setPosts(p);
      setProjects(pr);
      setMessages(m);
    } catch (e) {
      toast.error('Failed to load admin data');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (user && isAdmin) {
      setLoading(true);
      loadData();
    } else {
      setLoading(false);
    }
  }, [user, isAdmin, authLoading]);

  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000);
      return {
        name: format(d, 'EEE'),
        full: d.toISOString().split('T')[0],
        count: 0,
      };
    });
    messages.forEach((m) => {
      if (!m.createdAt) return;
      const mDate = new Date(m.createdAt).toISOString().split('T')[0];
      const day = days.find((d) => d.full === mDate);
      if (day) day.count++;
    });
    return days;
  }, [messages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await login(email, password);
      toast.success('Signed in');
    } catch (err) {
      toast.error('Invalid email or password');
    } finally {
      setLoginLoading(false);
    }
  };

  const openPost = (post?: Post) => {
    if (post) {
      setEditingPost(post);
      setPostForm({
        ...post,
        tags: post.tags || [],
        contentType: post.contentType || 'html',
      });
    } else {
      setEditingPost(null);
      setPostForm(emptyPost);
    }
    setPostOpen(true);
  };

  const savePost = async () => {
    try {
      if (editingPost && editingPost.id) {
        await updateAdminPost(editingPost.id, postForm);
        toast.success('Post updated');
      } else {
        await createAdminPost(postForm);
        toast.success('Post created');
      }
      setPostOpen(false);
      loadData();
    } catch (err) {
      toast.error('Failed to save post');
      console.error(err);
    }
  };

  const removePost = async (id: string) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deleteAdminPost(id);
      toast.success('Post deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete post');
    }
  };

  const openProject = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({ ...project, tags: project.tags || [] });
    } else {
      setEditingProject(null);
      setProjectForm(emptyProject);
    }
    setProjectOpen(true);
  };

  const saveProject = async () => {
    try {
      if (editingProject && editingProject.id) {
        await updateAdminProject(editingProject.id, projectForm);
        toast.success('Project updated');
      } else {
        await createAdminProject(projectForm);
        toast.success('Project created');
      }
      setProjectOpen(false);
      loadData();
    } catch (err) {
      toast.error('Failed to save project');
      console.error(err);
    }
  };

  const removeProject = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteAdminProject(id);
      toast.success('Project deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const markRead = async (id: string) => {
    try {
      await markAdminMessageRead(id);
      loadData();
    } catch (err) {
      toast.error('Failed to mark as read');
    }
  };

  const removeMessage = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteAdminMessage(id);
      toast.success('Message deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loginLoading}>
                {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Not Authorized</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">This account is not an admin.</p>
            <Button onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{posts.length}</div>
              <p className="text-xs text-muted-foreground">{posts.filter((p) => p.published).length} published</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{messages.length}</div>
              <p className="text-xs text-muted-foreground">{messages.filter((m) => !m.read).length} unread</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Messages (7 days)</CardTitle>
            </CardHeader>
            <CardContent className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="count" fill="currentColor" className="fill-primary" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openPost()}>
                <Plus className="mr-2 h-4 w-4" /> Add Post
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.slug}</TableCell>
                      <TableCell>{format(new Date(post.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant={post.published ? 'default' : 'secondary'}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="icon" variant="ghost" onClick={() => openPost(post)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => removePost(post.id!)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openProject()}>
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{project.link}</TableCell>
                      <TableCell>
                        <Badge variant={project.featured ? 'default' : 'secondary'}>
                          {project.featured ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="icon" variant="ghost" onClick={() => openProject(project)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => removeProject(project.id!)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg.id} className={msg.read ? 'opacity-60' : undefined}>
                      <TableCell className="font-medium">{msg.name}</TableCell>
                      <TableCell>{msg.email}</TableCell>
                      <TableCell className="max-w-md truncate">{msg.message}</TableCell>
                      <TableCell>
                        {msg.createdAt ? format(new Date(msg.createdAt), 'MMM d, yyyy h:mm a') : '-'}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {!msg.read && (
                          <Button size="icon" variant="ghost" onClick={() => markRead(msg.id!)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => removeMessage(msg.id!)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Post Dialog */}
      <Dialog open={postOpen} onOpenChange={setPostOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={postForm.slug}
                  onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={postForm.excerpt}
                onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={postForm.image}
                  onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                />
                <Input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImage(true);
                    try {
                      const url = await uploadImage(file, 'posts');
                      setPostForm((prev) => ({ ...prev, image: url }));
                      toast.success('Image uploaded');
                    } catch (err) {
                      toast.error('Image upload failed');
                      console.error(err);
                    } finally {
                      setUploadingImage(false);
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read time (min)</Label>
                <Input
                  id="readTime"
                  type="number"
                  value={postForm.readTime}
                  onChange={(e) => setPostForm({ ...postForm, readTime: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={postForm.date}
                  onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={postForm.tags.join(', ')}
                  onChange={(e) =>
                    setPostForm({
                      ...postForm,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (HTML)</Label>
              <Textarea
                id="content"
                rows={8}
                value={postForm.content}
                onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={postForm.published}
                onCheckedChange={(checked) => setPostForm({ ...postForm, published: checked })}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={savePost}>Save Post</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={projectOpen} onOpenChange={setProjectOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'New Project'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ptitle">Title</Label>
              <Input
                id="ptitle"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdesc">Description</Label>
              <Textarea
                id="pdesc"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pimage">Image URL</Label>
                <Input
                  id="pimage"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                />
                <Input
                  id="pimage-file"
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImage(true);
                    try {
                      const url = await uploadImage(file, 'projects');
                      setProjectForm((prev) => ({ ...prev, image: url }));
                      toast.success('Image uploaded');
                    } catch (err) {
                      toast.error('Image upload failed');
                      console.error(err);
                    } finally {
                      setUploadingImage(false);
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plink">Link</Label>
                <Input
                  id="plink"
                  value={projectForm.link}
                  onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="porder">Order</Label>
                <Input
                  id="porder"
                  type="number"
                  value={projectForm.order}
                  onChange={(e) => setProjectForm({ ...projectForm, order: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ptags">Tags (comma separated)</Label>
                <Input
                  id="ptags"
                  value={projectForm.tags.join(', ')}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="pfeatured"
                checked={projectForm.featured}
                onCheckedChange={(checked) => setProjectForm({ ...projectForm, featured: checked })}
              />
              <Label htmlFor="pfeatured">Featured</Label>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={saveProject}>Save Project</Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
