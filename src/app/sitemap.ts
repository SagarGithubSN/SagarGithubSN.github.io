import type { MetadataRoute } from 'next';

import { materials } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

/* Both of these are derived entirely from build-time constants, so there is
   nothing to recompute per request. Declaring that explicitly is what lets the
   static export emit them as plain files. */
export const dynamic = 'force-static';


/**
 * Sitemap.
 *
 * /admin is excluded deliberately — it is behind auth and has no business in
 * an index.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, freq: 'weekly' },
    { path: '/products', priority: 0.9, freq: 'weekly' },
    { path: '/request-a-quote', priority: 0.9, freq: 'monthly' },
    { path: '/sourcing', priority: 0.8, freq: 'monthly' },
    { path: '/our-story', priority: 0.7, freq: 'monthly' },
    { path: '/sustainability', priority: 0.7, freq: 'monthly' },
    { path: '/trade-credentials', priority: 0.7, freq: 'monthly' },
    { path: '/contact', priority: 0.8, freq: 'monthly' },
    { path: '/privacy', priority: 0.3, freq: 'yearly' },
    { path: '/terms', priority: 0.3, freq: 'yearly' },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...materials.map((m) => ({
      url: `${SITE_URL}/products/${m.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];
}
