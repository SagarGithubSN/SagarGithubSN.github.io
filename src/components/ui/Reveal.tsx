'use client';

import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fades and lifts a block once, the first time it enters the viewport. */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal-fade ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

interface RevealLinesProps {
  /** Each entry is its own masked line, so the type wipes up in sequence. */
  lines: readonly ReactNode[];
  level?: 1 | 2 | 3;
  className?: string;
  stagger?: number;
}

/**
 * Line-by-line mask reveal.
 *
 * Lines are authored rather than measured and split at runtime: splitting live
 * text nodes fights the browser's own line-breaking and wrecks both selection
 * and screen-reader flow.
 */
export function RevealLines({ lines, level = 2, className = '', stagger = 110 }: RevealLinesProps) {
  const ref = useReveal<HTMLHeadingElement>(0.2);

  const inner = lines.map((line, i) => (
    <span className="reveal-line" key={i}>
      <span style={{ transitionDelay: `${i * stagger}ms` }}>{line}</span>
    </span>
  ));

  if (level === 1) {
    return (
      <h1 ref={ref} className={className}>
        {inner}
      </h1>
    );
  }
  if (level === 3) {
    return (
      <h3 ref={ref} className={className}>
        {inner}
      </h3>
    );
  }
  return (
    <h2 ref={ref} className={className}>
      {inner}
    </h2>
  );
}
