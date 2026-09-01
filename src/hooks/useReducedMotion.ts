'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks `prefers-reduced-motion` and keeps tracking it — the user can change
 * the OS setting while the page is open.
 *
 * Returns false during SSR and the first paint so markup matches on hydration;
 * the effect corrects it immediately after mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
