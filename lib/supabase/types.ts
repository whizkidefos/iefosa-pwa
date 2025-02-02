export type Database = {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          message: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          message?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          published: boolean;
          featured_image: string;
          author: string;
          tags: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          published?: boolean;
          featured_image: string;
          author: string;
          tags?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string;
          published?: boolean;
          featured_image?: string;
          author?: string;
          tags?: string[];
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
