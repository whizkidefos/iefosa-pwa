"use client";

import { useState } from 'react';
import { Heart, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface ReactionButtonsProps {
  postId: string;
  initialLikes: number;
  initialBookmarks: number;
}

export function ReactionButtons({ postId, initialLikes, initialBookmarks }: ReactionButtonsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleReaction = async (type: 'like' | 'bookmark') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please sign in to react to posts');
        return;
      }

      const { error } = await supabase.from('reactions').upsert({
        post_id: postId,
        user_id: user.id,
        type,
      });

      if (error) throw error;

      if (type === 'like') {
        setLikes(prev => prev + (isLiked ? -1 : 1));
        setIsLiked(!isLiked);
      } else {
        setBookmarks(prev => prev + (isBookmarked ? -1 : 1));
        setIsBookmarked(!isBookmarked);
      }
    } catch (error) {
      toast.error('Failed to update reaction');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });

      await supabase.from('shares').insert({
        post_id: postId,
        platform: 'native',
      });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Failed to share');
      }
    }
  };

  return (
    <div className="flex space-x-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction('like')}
        className={isLiked ? 'text-red-500' : ''}
      >
        <Heart className="w-4 h-4 mr-2" />
        {likes}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction('bookmark')}
        className={isBookmarked ? 'text-blue-500' : ''}
      >
        <Bookmark className="w-4 h-4 mr-2" />
        {bookmarks}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
}