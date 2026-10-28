'use client';

import { getAnalytics, isSupported, logEvent, Analytics } from 'firebase/analytics';
import { firebaseApp } from './client';

let analyticsPromise: Promise<Analytics | null> | null = null;

export function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((ok) => (ok ? getAnalytics(firebaseApp) : null))
      .catch(() => null);
  }
  return analyticsPromise;
}

export async function trackPageView(path: string) {
  const analytics = await getAnalyticsInstance();
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
}
