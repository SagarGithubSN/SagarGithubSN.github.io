'use client';

import Image from 'next/image';

import { source } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { useReveal } from '@/hooks/useReveal';

/**
 * 05 — Closer to the source.
 *
 * The farmer relationship is the previous business's most genuine
 * differentiator, so it gets a human section rather than a bullet list.
 *
 * "Jai Jawan, Jai Kisan" is preserved as the brief requires, but framed
 * carefully: given a gloss, given a reason for being here, and kept small so it
 * reads as respect rather than decoration or politics.
 */
export function Source() {
  const chainRef = useReveal<HTMLOListElement>(0.35);

  return (
    <section id="sourcing" className="band bg-sand">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{source.eyebrow}</p>
            </Reveal>

            <RevealLines
              lines={source.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />

            {source.body.map((p, i) => (
              <Reveal key={i} delay={160 + i * 110}>
                <p
                  className={`max-w-[48ch] text-[length:var(--text-lede)] leading-relaxed ${
                    i === 0 ? 'mt-8 text-ink' : 'mt-5 text-on-light-muted'
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            {/* The slogan. Small, glossed, and given a stated reason. */}
            <Reveal delay={420}>
              <figure className="mt-10 border-l-2 border-accent-bright pl-6">
                <blockquote>
                  <p className="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-light italic text-forest">
                    {source.slogan.text}
                  </p>
                </blockquote>
                <figcaption className="mt-2.5">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-on-light-faint">
                    {source.slogan.gloss}
                  </span>
                  <span className="mt-3 block max-w-[40ch] text-[0.875rem] leading-relaxed text-on-light-muted">
                    {source.slogan.note}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Photography */}
          <div className="grid grid-cols-2 gap-4 self-start lg:gap-5">
            <Reveal className="col-span-2">
              <div className="img-mask is-in relative aspect-[16/10] overflow-hidden bg-stone">
                <Image
                  src={source.images[0].src}
                  alt={source.images[0].alt}
                  fill
                  sizes="(min-width:1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="relative aspect-square overflow-hidden bg-stone">
                <Image
                  src={source.images[1].src}
                  alt={source.images[1].alt}
                  fill
                  sizes="(min-width:1024px) 23vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex h-full flex-col justify-end bg-forest p-6 text-on-dark">
                <p className="font-display text-[1.5rem] font-light leading-tight">
                  We buy at the farm, not through a chain of agents.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The chain. Each node draws in on entry, and the connecting rule
            grows between them — a small piece of scroll feedback at the point
            where the reader is deciding whether this claim is real. */}
        <ol
          ref={chainRef}
          className="mt-[clamp(3rem,7vh,5rem)] grid grid-cols-2 gap-y-6 border-t border-rule pt-10 sm:grid-cols-3 lg:grid-cols-5"
        >
          {source.chain.map((node, i) => (
            <li key={node} className="relative flex items-center gap-4">
              <span
                className="reveal-fade flex items-baseline gap-3"
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <span className="font-mono text-[0.625rem] tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-display text-[1.25rem] font-light ${
                    node === 'Captain Exim' ? 'text-forest' : 'text-ink'
                  }`}
                >
                  {node}
                </span>
              </span>
              {i < source.chain.length - 1 ? (
                <span
                  className="rule-draw hidden h-px flex-1 bg-rule-strong lg:block"
                  style={{ transitionDelay: `${i * 130 + 200}ms` }}
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
