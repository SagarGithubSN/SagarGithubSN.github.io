/**
 * Two build targets from one source tree.
 *
 * The default build is the real thing: server-rendered, with the enquiry API,
 * the admin view and its Basic-auth middleware, and optimised images.
 *
 * `STATIC_EXPORT=1` produces a flat directory of files for a host that cannot
 * run Node — GitHub Pages, an S3 bucket, any static CDN. That target genuinely
 * cannot carry the API route, the admin view or middleware, so the deploy
 * workflow removes those files before building rather than pretending they
 * survive. See .github/workflows/deploy-pages.yml and DEPLOYMENT.md.
 */

const staticExport = process.env.STATIC_EXPORT === '1';

/* A GitHub Pages project site is served from /<repo>/, not from the domain
   root, so every asset URL needs that prefix baked in at build time. Empty for
   a user site (<user>.github.io) or any host serving from the root. */
const basePath = process.env.BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * `next dev` and `next build` both own `.next`, so running a build while the
   * dev server is live tears the dev server down — which is exactly what made
   * the local server unstable during development.
   *
   * Setting NEXT_DIST_DIR lets a verification build go somewhere else:
   *
   *   NEXT_DIST_DIR=.next-build npm run build
   *
   * The dev server keeps its own `.next` and stays up.
   */
  distDir: process.env.NEXT_DIST_DIR || '.next',

  /**
   * Hides the floating "N" badge Next.js draws in the bottom-left corner during
   * development. It is a dev-only overlay and never appears in a production
   * build, but it sits on top of the design while reviewing, so it goes.
   */
  devIndicators: false,

  images: staticExport
    ? {
        /* No server means no image optimiser. The source files are already
           resized WebP (see IMAGE_ASSET_MANIFEST.md), so this serves them as
           they are rather than failing at build time. */
        unoptimized: true,
      }
    : {
        // AVIF first, WebP fallback. The source photography is large (one file
        // is 6016x4016), so serving originals would be indefensible.
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
      },

  ...(staticExport
    ? {
        output: 'export',
        basePath,
        assetPrefix: basePath || undefined,
        /* Emits `products/index.html` rather than `products.html`. Static hosts
           differ on whether they will resolve an extensionless path to a .html
           file; every one of them resolves a directory to its index. */
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
