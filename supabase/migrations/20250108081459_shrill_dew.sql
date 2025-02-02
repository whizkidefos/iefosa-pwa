/*
  # Blog System Schema

  1. New Tables
    - `posts`
      - Core blog post content and metadata
    - `reactions`
      - User reactions to posts (likes, bookmarks)
    - `shares`
      - Track social media shares
    
  2. Security
    - Enable RLS on all tables
    - Policies for public post reading
    - Authenticated user policies for reactions
    - Admin-only policies for post management
*/

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  date timestamptz DEFAULT now(),
  image text NOT NULL,
  read_time integer NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL
);

-- Post tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Reactions table
CREATE TABLE IF NOT EXISTS reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('like', 'bookmark')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id, type)
);

-- Shares table
CREATE TABLE IF NOT EXISTS shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  platform text NOT NULL,
  share_count integer DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- Policies

-- Posts policies
CREATE POLICY "Public can read posts"
  ON posts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage posts"
  ON posts FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Tags policies
CREATE POLICY "Public can read tags"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON tags FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Post tags policies
CREATE POLICY "Public can read post tags"
  ON post_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage post tags"
  ON post_tags FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Reactions policies
CREATE POLICY "Users can manage their reactions"
  ON reactions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view reaction counts"
  ON reactions FOR SELECT
  TO public
  USING (true);

-- Shares policies
CREATE POLICY "Public can read shares"
  ON shares FOR SELECT
  TO public
  USING (true);

CREATE POLICY "System can update shares"
  ON shares FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));