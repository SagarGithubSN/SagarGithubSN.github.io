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

  images: {
    // AVIF first, WebP fallback. The source photography is large (one file is
    // 6016x4016), so serving originals would be indefensible.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
};

export default nextConfig;
