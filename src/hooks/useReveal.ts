'use client';

import { useEffect, useRef } from 'react';

/**
 * Adds `.is-in` to an element once it enters the viewport, then stops watching.
 *
 * IntersectionObserver rather than a scroll library: these are one-shot CSS
 * transitions with no scrub, so a ScrollTrigger per element would cost more
 * than it returns.
 *
 * THREE SAFETY NETS, because these transitions start at `opacity: 0` and a
 * reveal that never fires is content the user can never read:
 *
 *   1. If the element is already within the viewport at mount, it is revealed
 *      immediately and synchronously. Above-the-fold content — the hero
 *      headline in particular — must never wait on an observer callback.
 *   2. If IntersectionObserver is missing, everything is revealed at once.
 *   3. A timeout reveals the element regardless after a short delay. If the
 *      observer is throttled, mis-fires, or the page never scrolls, the copy
 *      still appears rather than staying invisible forever.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add('is-in');

    // 2. No observer support: show everything.
    if (typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    // 1. Already on screen at mount — reveal now, do not wait to be told.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      // Fire a little BEFORE the element reaches the fold. A negative bottom
      // margin delays large blocks enough that they can read as empty gaps.
      { threshold, rootMargin: '0px 0px 12% 0px' },
    );

    io.observe(el);

    // 3. Backstop. Cheap, and it makes "invisible forever" impossible.
    const failsafe = window.setTimeout(() => {
      show();
      io.disconnect();
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, [threshold]);

  return ref;
}
