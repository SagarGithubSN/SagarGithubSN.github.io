'use client';

import { useEffect, useRef } from 'react';

import { intro } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * 02 — Who Captain Exim is.
 *
 * Calm by design: this is the pause after the hero, so the only motion is the
 * commodity rail, which drifts horizontally against scroll. That rail is doing
 * real work — it names eleven actual products in the first screen after the
 * fold, which is faster than any paragraph could.
 */
export function Intro() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = railRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        // -1 .. 1 across the viewport, so the rail is always mid-move while
        // the section is on screen.
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translate3d(${-p * 140}px, 0, 0)`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section id="about" className="band overflow-hidden bg-ivory">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{intro.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={intro.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
          </div>

          <div className="lg:pt-4">
            {intro.body.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p
                  className={`max-w-[52ch] text-[length:var(--text-lede)] leading-relaxed ${
                    i === 0 ? 'text-ink' : 'mt-6 text-on-light-muted'
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Commodity rail. Deliberately wider than the shell so it bleeds. */}
      <div className="mt-[clamp(3rem,7vh,5rem)] border-y border-rule py-6">
        <div
          ref={railRef}
          className="flex w-max items-center gap-10 px-8 will-change-transform"
          aria-hidden="true"
        >
          {[...intro.marquee, ...intro.marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light text-on-light-faint">
                {m}
              </span>
              <span className="h-1 w-1 rounded-full bg-accent-bright" />
            </span>
          ))}
        </div>
        <p className="sr-only">
          Products sourced by Captain Exim: {intro.marquee.join(', ')}.
        </p>
      </div>
    </section>
  );
}
