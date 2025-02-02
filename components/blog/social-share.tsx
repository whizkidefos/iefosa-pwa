"use client";

import { motion } from 'framer-motion';
import { Twitter, Facebook, Linkedin, Link2, Instagram, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedWhatsAppText = encodeURIComponent(`${title}\n\n${url}`);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#4267B2] hover:bg-[#365899]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0077B5] hover:bg-[#006399]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] via-[#962fbf] to-[#4f5bd5] hover:opacity-90',
      url: `instagram://library?AssetPath=${encodedUrl}`,
      fallbackUrl: `https://instagram.com`, // Instagram doesn't have a direct share URL
      onClick: () => {
        toast.info('Save this image to share on Instagram!');
      },
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#20BD5C]',
      url: `https://wa.me/?text=${encodedWhatsAppText}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold">Share this post</h3>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((platform) => (
          <motion.div
            key={platform.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`${platform.color} text-white`}
              onClick={() => {
                if (platform.onClick) {
                  platform.onClick();
                }
                if (platform.name === 'Instagram') {
                  // Try to open Instagram app first, if fails open website
                  window.location.href = platform.url;
                  if (platform.fallbackUrl) {
                    setTimeout(() => {
                      window.location.href = platform.fallbackUrl as string;
                    }, 500);
                  }
                } else {
                  window.open(platform.url, '_blank');
                }
              }}
              aria-label={`Share on ${platform.name}`}
            >
              <platform.icon className="w-5 h-5" />
            </Button>
          </motion.div>
        ))}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-secondary hover:bg-secondary/80"
            onClick={copyToClipboard}
            aria-label="Copy link"
          >
            <Link2 className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}