'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { materials } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';

/**
 * 04 — The product universe, as an index rather than a grid of cards.
 *
 * Desktop: six oversized type rows. Hovering or focusing one cross-fades a tall
 * photograph, reveals the description, and shifts the section's own background
 * tint — so a single pointer move changes three things at once. That is the
 * feedback-density rule applied to a hover instead of a scroll.
 *
 * Mobile: hover does not exist, so this becomes a stacked list with every image
 * visible. A different layout, not a squeezed one.
 *
 * Each row is a real link to its product page — the index is navigation, not
 * decoration.
 */

/** Per-category ground tints. Kept within a few points of ivory so the change
    reads as a shift in light, not a colour swap. */
const TINTS = [
  '#f4f1e6', // areca — pale leaf
  '#f2f2e7', // agro — green-biased
  '#f6efe4', // spices — warm
  '#f5f3ec', // coconut — neutral ivory
  '#f7f1e3', // oils — golden
  '#f3f0e8', // tobacco — muted
];

export function Materials() {
  const [active, setActive] = useState(0);
  const current = materials[active];

  return (
    <section
      id="products"
      className="band transition-colors duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ background: TINTS[active] }}
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-10">
          <div>
            <Reveal>
              <p className="label mb-6 text-accent">What we ship</p>
            </Reveal>
            <RevealLines
              lines={['Six lines,', 'one standard.']}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
          </div>
          <Reveal delay={140}>
            <p className="max-w-[34ch] text-[0.9375rem] text-on-light-muted">
              Quoted by container, metric ton, litre or whichever unit you work in. Tell us which
              and we will work in it.
            </p>
          </Reveal>
        </div>

        {/* ---------- Desktop ---------- */}
        <div className="mt-2 hidden lg:grid lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-16">
          <ul>
            {materials.map((m, i) => (
              <li key={m.id}>
                <Link
                  href={`/products/${m.id}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-8 border-b border-rule py-8"
                >
                  <span
                    className={`font-mono text-[0.6875rem] tracking-[0.2em] transition-colors duration-500 ${
                      active === i ? 'text-accent' : 'text-on-light-faint'
                    }`}
                  >
                    {m.number}
                  </span>

                  <span>
                    <span
                      className={`flex items-center gap-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.1] transition-[color,transform] duration-500 ${
                        active === i
                          ? 'translate-x-2 text-ink'
                          : 'translate-x-0 text-on-light-muted'
                      }`}
                    >
                      {m.name}
                      <svg
                        width="16"
                        height="9"
                        viewBox="0 0 16 9"
                        fill="none"
                        aria-hidden="true"
                        className="transition-all duration-500"
                        style={{
                          opacity: active === i ? 1 : 0,
                          transform: active === i ? 'none' : 'translateX(-0.5rem)',
                        }}
                      >
                        <path
                          d="M0 4.5h14M11 1l3 3.5-3 3.5"
                          stroke="var(--color-accent)"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </span>

                    {/* Grows in only for the active row, so this stays a list. */}
                    <span
                      className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        gridTemplateRows: active === i ? '1fr' : '0fr',
                        opacity: active === i ? 1 : 0,
                      }}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[50ch] pt-3 text-[0.9375rem] leading-relaxed text-on-light-muted">
                          {m.lede}
                        </span>
                        <span className="mt-4 flex flex-wrap gap-2">
                          {(m.notes ?? []).map((note) => (
                            <span
                              key={note}
                              className="border border-rule px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-light-muted"
                            >
                              {note}
                            </span>
                          ))}
                          {m.awaitingDetail ? (
                            <span className="border border-dashed border-rule-strong px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-light-faint">
                              Product list on enquiry
                            </span>
                          ) : null}
                        </span>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Composed image column: tall primary frame plus an offset inset. */}
          <div className="relative self-start pb-24">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone">
              {materials.map((m, i) => (
                <Image
                  key={m.id}
                  src={m.image}
                  alt={active === i ? m.alt : ''}
                  aria-hidden={active !== i}
                  fill
                  sizes="27rem"
                  className="object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
            </div>

            <div className="absolute -bottom-2 -left-14 h-40 w-32 overflow-hidden border-4 border-ivory bg-stone xl:h-48 xl:w-40">
              {materials.map((m, i) =>
                m.gallery?.[0] ? (
                  <Image
                    key={m.id}
                    src={m.gallery[0].src}
                    alt=""
                    fill
                    sizes="10rem"
                    className="object-cover transition-opacity duration-[900ms]"
                    style={{ opacity: active === i ? 1 : 0 }}
                  />
                ) : null,
              )}
            </div>

            <p className="absolute bottom-6 right-0 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
              {current.number} — {current.short}
            </p>
          </div>
        </div>

        {/* ---------- Mobile ---------- */}
        <ul className="mt-2 lg:hidden">
          {materials.map((m) => (
            <li key={m.id} className="border-b border-rule py-8">
              <Link href={`/products/${m.id}`} className="block">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-accent">
                    {m.number}
                  </span>
                  <h3 className="font-display text-[1.75rem] font-light leading-tight text-ink">
                    {m.name}
                  </h3>
                </div>

                <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-stone">
                  <Image src={m.image} alt={m.alt} fill sizes="100vw" className="object-cover" />
                </div>

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-on-light-muted">
                  {m.lede}
                </p>
                <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                  View product →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
