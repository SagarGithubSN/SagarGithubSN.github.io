'use client';

import { useReveal } from '@/hooks/useReveal';

interface WipeProps {
  /** The ground the wipe is arriving from (the section above). */
  from: string;
  /** The ground the wipe is arriving into (the section below). */
  to: string;
  /** Mirror the curve, so consecutive wipes do not read as a repeated motif. */
  flip?: boolean;
  className?: string;
}

/**
 * The shaped ground change.
 *
 * Taken from the reference at 6.60s, where white hands off to dark not by a cut
 * but by a curved mass sweeping in from the right (REFERENCE_VIDEO_LEARNINGS.md
 * §E.3). Copying the *device* rather than the logistics imagery is the whole
 * point of that analysis.
 *
 * The curve sits in its own band so neither adjoining section needs to know
 * about it, and it sweeps horizontally into place on entry — which also means
 * the seam itself is a moment of scroll feedback rather than a dead edge.
 */
export function Wipe({ from, to, flip = false, className = '' }: WipeProps) {
  const ref = useReveal<HTMLDivElement>(0.05);

  const path = flip
    ? 'M0,140 L1440,140 L1440,42 C1040,132 420,4 0,74 Z'
    : 'M0,140 L1440,140 L1440,74 C1020,4 400,132 0,42 Z';

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`wipe relative isolate ${className}`.trim()}
      style={{ background: from }}
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="wipe__svg block h-[clamp(2.5rem,6vw,5.5rem)] w-full"
      >
        <path d={path} fill={to} />
      </svg>
    </div>
  );
}
