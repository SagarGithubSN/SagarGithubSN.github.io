'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useStepSequence } from '@/hooks/useStepSequence';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface Beat {
  n: string;
  label: string;
  heading: string;
  body: string;
  image: string;
  alt: string;
}

interface ProcessSequenceProps {
  beats: readonly Beat[];
  /** Ground colour token class, e.g. 'bg-ivory'. */
  ground?: string;
  eyebrow?: string;
  priorityFirstImage?: boolean;
}

/** Desktop only — the stepped behaviour is replaced by a stacked list below lg. */
function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return desktop;
}

/**
 * Photography, one stage per scroll.
 *
 * This section used to map a tall scroll track continuously onto progress, so a
 * single stage took several wheel clicks and the boundaries between stages
 * landed wherever the arithmetic put them. Now the section holds one screen,
 * snaps into place, and each gesture advances exactly one stage.
 *
 * Feedback density (REFERENCE_VIDEO_LEARNINGS.md §C) is still the governing
 * constraint, but it is now carried by the transition rather than by continuous
 * scrub: on every advance the photograph cross-fades and settles out of a 6%
 * over-scale, the text rises, and the rail steps forward. Nothing is ever
 * static in response to a gesture.
 *
 * The section is escapable in one gesture in both directions — see
 * `useStepSequence` for the release rule. Scroll snapping (`scroll-snap-stop`)
 * guarantees the stage is framed properly before the stepping takes over,
 * rather than engaging at whatever offset the user happened to stop at.
 */
export function ProcessSequence({
  beats,
  ground = 'bg-ivory',
  eyebrow,
  priorityFirstImage = false,
}: ProcessSequenceProps) {
  const steps = beats.length;
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();

  // Reduced motion drops the interception altogether: those readers get the
  // stacked story at every width instead of a section that no longer steps.
  const { ref, step, goTo } = useStepSequence<HTMLDivElement>({
    steps,
    enabled: desktop && !reduced,
  });

  const active = beats[step] ?? beats[0];

  return (
    <>
      {/* ---------- Desktop: one screen, one stage per gesture ----------
          Reduced motion drops this treatment entirely rather than leaving a
          stepped section that no longer steps: it would show stage one and
          give no indication the other five exist. Those readers get the
          stacked story below at every width instead. */}
      <div
        ref={ref}
        className={`relative hidden h-screen ${reduced ? '' : 'lg:flex lg:items-center'} ${ground}`}
        style={
          reduced ? undefined : { scrollSnapAlign: 'start', scrollSnapStop: 'always' }
        }
      >
        <div className="shell grid w-full grid-cols-[minmax(0,26rem)_1fr] items-center gap-16">
          {/* Text column */}
          <div>
            {eyebrow ? <p className="label mb-8 text-accent">{eyebrow}</p> : null}

            {/* Beats are stacked and cross-faded rather than swapped, so the
                column never collapses and reflows between stages. */}
            <div className="relative min-h-[19rem]">
              {beats.map((b, i) => (
                <div
                  key={b.n}
                  aria-hidden={i !== step}
                  className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: i === step ? 1 : 0,
                    transform: i === step ? 'none' : 'translateY(1.25rem)',
                    pointerEvents: i === step ? 'auto' : 'none',
                  }}
                >
                  <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-accent">
                    {b.n} - {b.label.toUpperCase()}
                  </p>
                  <h3 className="mt-5 font-display text-[clamp(1.9rem,2.9vw,2.9rem)] font-light leading-[1.08]">
                    {b.heading}
                  </h3>
                  <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>

            {/* The rail doubles as the control: every stage is directly
                reachable by click and by keyboard, so the sequence is not
                hostage to the wheel. */}
            <div className="mt-10">
              <div className="relative h-px w-full bg-rule">
                <div
                  className="absolute inset-y-0 left-0 bg-forest transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: `${(step / (steps - 1)) * 100}%` }}
                />
                {beats.map((b, i) => (
                  <span
                    key={b.n}
                    className="absolute top-1/2 h-2 w-px -translate-y-1/2 transition-colors duration-500"
                    style={{
                      left: `${(i / (steps - 1)) * 100}%`,
                      background: i <= step ? 'var(--color-forest)' : 'var(--color-rule-strong)',
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between font-mono text-[0.625rem] uppercase tracking-[0.18em]">
                {beats.map((b, i) => (
                  <button
                    key={b.n}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === step ? 'step' : undefined}
                    className="cursor-pointer transition-colors duration-500 hover:text-ink"
                    style={{
                      color: i === step ? 'var(--color-ink)' : 'var(--color-on-light-faint)',
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image column. All frames mounted and cross-faded; the incoming one
              settles out of an over-scale so each gesture reads as movement. */}
          <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone">
            {beats.map((b, i) => (
              <Image
                key={b.n}
                src={b.image}
                alt={i === step ? b.alt : ''}
                aria-hidden={i !== step}
                fill
                priority={priorityFirstImage && i === 0}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: i === step ? 1 : 0,
                  transform: reduced || i !== step ? 'scale(1.06)' : 'scale(1)',
                }}
              />
            ))}

            <span className="pointer-events-none absolute bottom-4 right-5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/85 mix-blend-difference">
              {active.n} / {String(steps).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Mobile (and reduced motion): a stacked story ---------- */}
      <div className={`${reduced ? '' : 'lg:hidden'} ${ground}`}>
        <div className="shell">
          {eyebrow ? <p className="label mb-8 text-accent">{eyebrow}</p> : null}
          <ol>
            {beats.map((b, i) => (
              <li key={b.n} className="border-t border-rule py-8 first:border-t-0 first:pt-0">
                <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-accent">
                  {b.n} - {b.label.toUpperCase()}
                </p>
                <h3 className="mt-3 font-display text-[1.65rem] font-light leading-[1.12]">
                  {b.heading}
                </h3>
                <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={b.image}
                    alt={b.alt}
                    fill
                    priority={priorityFirstImage && i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-light-muted">
                  {b.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
