"use client";

import { useEffect, useState } from 'react';
import { Heart, Bookmark, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { rtdb } from '@/lib/firebase/client';
import { ref, onValue, runTransaction, off } from 'firebase/database';
import { toast } from 'sonner';

interface ReactionButtonsProps {
  postId: string;
}

export function ReactionButtons({ postId }: ReactionButtonsProps) {
  const [likes, setLikes] = useState(0);
  const [bookmarks, setBookmarks] = useState(0);
  const [views, setViews] = useState(0);
  const [shares, setShares] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const postRef = ref(rtdb, `reactions/${postId}`);

  useEffect(() => {
    const unsubscribe = onValue(postRef, (snapshot) => {
      const data = snapshot.val() || {};
      setLikes(data.likes || 0);
      setBookmarks(data.bookmarks || 0);
      setViews(data.views || 0);
      setShares(data.shares || 0);
    });

    const viewsRef = ref(rtdb, `reactions/${postId}/views`);
    runTransaction(viewsRef, (current) => (current || 0) + 1);

    return () => off(postRef, 'value', unsubscribe as unknown as (a: unknown) => unknown);
  }, [postId]);

  const handleLike = () => {
    const likesRef = ref(rtdb, `reactions/${postId}/likes`);
    const change = isLiked ? -1 : 1;
    runTransaction(likesRef, (current) => Math.max(0, (current || 0) + change));
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    const bookmarksRef = ref(rtdb, `reactions/${postId}/bookmarks`);
    const change = isBookmarked ? -1 : 1;
    runTransaction(bookmarksRef, (current) => Math.max(0, (current || 0) + change));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
      const sharesRef = ref(rtdb, `reactions/${postId}/shares`);
      runTransaction(sharesRef, (current) => (current || 0) + 1);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Failed to share');
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={isLiked ? 'text-red-500' : ''}
      >
        <Heart className="w-4 h-4 mr-2" />
        {likes}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        className={isBookmarked ? 'text-blue-500' : ''}
      >
        <Bookmark className="w-4 h-4 mr-2" />
        {bookmarks}
      </Button>

      <Button variant="ghost" size="sm" onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2" />
        {shares}
      </Button>

      <div className="flex items-center text-sm text-muted-foreground gap-1">
        <Eye className="w-4 h-4" />
        {views} views
      </div>
    </div>
  );
}
