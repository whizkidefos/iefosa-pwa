export interface Post {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  contentType?: 'html' | 'markdown';
  date: string;
  image: string;
  readTime: number;
  tags: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  read?: boolean;
  replied?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface MailDoc {
  id?: string;
  to?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  from?: string;
  replyTo?: string;
  message?: {
    subject?: string;
    text?: string;
    html?: string;
  };
  createdAt?: string;
  delivery?: {
    state?: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';
    attempts?: number;
    error?: string;
    info?: {
      messageId?: string;
      accepted?: string[];
      rejected?: string[];
    };
    startTime?: string;
    endTime?: string;
  };
}
