'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';

interface ImageRevealProps {
  src: string;
  alt: string;
  /** Layout sizing hint passed to next/image. */
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Adds a subtle scale-up on hover, for images that are also links. */
  hover?: boolean;
}

/**
 * The site's one image treatment: the frame wipes open, and the photograph
 * settles out of a slight overscale behind it.
 *
 * `fill` is used throughout, so every caller must establish its own aspect ratio
 * on the wrapper — which keeps the layout stable and avoids CLS.
 */
export function ImageReveal({
  src,
  alt,
  sizes = '100vw',
  className = '',
  priority = false,
  hover = false,
}: ImageRevealProps) {
  const ref = useReveal<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`img-mask ${hover ? 'img-hover' : ''} relative ${className}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
