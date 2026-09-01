'use client';

import Image from 'next/image';
import Link from 'next/link';

import { oils } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { useReveal } from '@/hooks/useReveal';

/**
 * 07 — Traditional oils.
 *
 * A craft beat, quieter than areca. The four stages are drawn as an animated
 * line diagram rather than photographed, because the one thing we do not have
 * is a photograph of an actual wooden gaana in motion — and an illustrated
 * process is honest where a borrowed stock photo would not be.
 *
 * The connecting rule draws itself left to right as the row enters, with each
 * node staggered behind it.
 */
export function Oils() {
  const diagramRef = useReveal<HTMLOListElement>(0.3);

  return (
    <section id="oils" className="band bg-ivory">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          {/* Photography pair, offset */}
          <div className="order-2 grid grid-cols-2 gap-4 self-start lg:order-1 lg:gap-5">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                <Image
                  src={oils.images[0].src}
                  alt={oils.images[0].alt}
                  fill
                  sizes="(min-width:1024px) 26vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden bg-stone">
                <Image
                  src={oils.images[1].src}
                  alt={oils.images[1].alt}
                  fill
                  sizes="(min-width:1024px) 26vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2 lg:pt-6">
            <Reveal>
              <p className="label mb-7 text-accent">{oils.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={oils.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
            <Reveal delay={160}>
              <p className="mt-8 max-w-[48ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
                {oils.body}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Link
                href="/products/oils"
                className="link mt-8 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent"
              >
                Cooking oils &amp; oil seeds →
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Process diagram */}
        <ol
          ref={diagramRef}
          className="mt-[clamp(3.5rem,8vh,6rem)] grid gap-8 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {oils.steps.map((s, i) => (
            <li key={s.n} className="relative lg:pr-8">
              {/* Node marker plus the rule that runs to the next node. */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="reveal-fade flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-bright font-mono text-[0.625rem] text-accent"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {s.n}
                </span>
                {i < oils.steps.length - 1 ? (
                  <span
                    className="rule-draw hidden h-px flex-1 bg-accent-bright/50 lg:block"
                    style={{ transitionDelay: `${i * 150 + 220}ms` }}
                  />
                ) : null}
              </div>

              <div
                className="reveal-fade"
                style={{ transitionDelay: `${i * 150 + 90}ms` }}
              >
                <h3 className="font-display text-[1.375rem] font-light text-ink">{s.title}</h3>
                <p className="mt-2.5 max-w-[30ch] text-[0.875rem] leading-relaxed text-on-light-muted">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
