import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo';

/* Both of these are derived entirely from build-time constants, so there is
   nothing to recompute per request. Declaring that explicitly is what lets the
   static export emit them as plain files. */
export const dynamic = 'force-static';


export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Neither is useful in an index, and both should stay out of one.
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
