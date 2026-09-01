'use client';

import Image from 'next/image';

import { brand, contact, origin } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { useReveal } from '@/hooks/useReveal';

/**
 * 08 — Origin.
 *
 * The brief asks for an elegant custom map and rules out a spinning globe. It
 * does not license inventing cartography: a hand-drawn India outline from
 * memory would be both inaccurate and generic.
 *
 * So this is a locator rather than a map — concentric rings settling onto
 * Mysuru's real coordinates, with the three scales of the address stepping in
 * behind it. It is honest, it is specific to this business, and it animates
 * without ever spinning.
 */
export function Origin() {
  const figureRef = useReveal<HTMLDivElement>(0.3);

  return (
    <section id="origin" className="band bg-sand">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{origin.eyebrow}</p>
            </Reveal>

            <RevealLines
              lines={origin.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />

            {origin.body.map((p, i) => (
              <Reveal key={i} delay={160 + i * 120}>
                <p
                  className={`max-w-[48ch] text-[length:var(--text-lede)] leading-relaxed ${
                    i === 0 ? 'mt-8 text-ink' : 'mt-5 text-on-light-muted'
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            {/* Scale steps */}
            <ol className="mt-10 border-t border-rule">
              {origin.levels.map((l, i) => (
                <Reveal key={l.label} delay={320 + i * 130}>
                  <li className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.625rem] tracking-[0.2em] text-on-light-faint">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display font-light ${
                          i === origin.levels.length - 1
                            ? 'text-[1.75rem] text-forest'
                            : 'text-[1.375rem] text-ink'
                        }`}
                      >
                        {l.label}
                      </span>
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-on-light-faint">
                      {l.note}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Locator */}
          <div ref={figureRef} className="relative mx-auto w-full max-w-[26rem]">
            <svg viewBox="0 0 400 400" className="w-full" role="img" aria-label={`Locator diagram centred on ${brand.city}, ${brand.region}, ${brand.country}`}>
              {/* Concentric scale rings — India, Karnataka, Mysuru district. */}
              {[168, 116, 64].map((r, i) => (
                <circle
                  key={r}
                  cx="200"
                  cy="200"
                  r={r}
                  fill="none"
                  stroke="var(--color-stone-deep)"
                  strokeWidth="1"
                  className="origin-ring"
                  style={{
                    transformOrigin: '200px 200px',
                    transitionDelay: `${i * 180}ms`,
                  }}
                />
              ))}

              {/* Innermost disc */}
              <circle
                cx="200"
                cy="200"
                r="26"
                fill="var(--color-sage-wash)"
                className="origin-ring"
                style={{ transformOrigin: '200px 200px', transitionDelay: '540ms' }}
              />

              {/* Crosshair */}
              <line
                x1="14"
                y1="200"
                x2="386"
                y2="200"
                stroke="var(--color-rule)"
                strokeWidth="1"
                className="origin-axis"
                style={{ transformOrigin: '200px 200px', transitionDelay: '260ms' }}
              />
              <line
                x1="200"
                y1="14"
                x2="200"
                y2="386"
                stroke="var(--color-rule)"
                strokeWidth="1"
                className="origin-axis origin-axis--v"
                style={{ transformOrigin: '200px 200px', transitionDelay: '340ms' }}
              />

              {/* The point itself */}
              <circle
                cx="200"
                cy="200"
                r="5"
                fill="var(--color-forest)"
                className="origin-ring"
                style={{ transformOrigin: '200px 200px', transitionDelay: '660ms' }}
              />

              {/* Ring labels */}
              <text x="200" y="24" textAnchor="middle" className="origin-label" style={{ transitionDelay: '760ms' }}>
                INDIA
              </text>
              <text x="200" y="76" textAnchor="middle" className="origin-label" style={{ transitionDelay: '820ms' }}>
                KARNATAKA
              </text>
              <text x="200" y="128" textAnchor="middle" className="origin-label" style={{ transitionDelay: '880ms' }}>
                MYSURU
              </text>
            </svg>

            <Reveal delay={900}>
              <p className="mt-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.2em] text-on-light-faint">
                {contact.coords.lat}° N &nbsp;/&nbsp; {contact.coords.lon}° E
              </p>
            </Reveal>

            {/* The place itself, so the locator is not the only thing standing
                in for a region the buyer has probably never seen. */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {origin.images.map((img, i) => (
                <Reveal key={img.src} delay={980 + i * 120}>
                  <div className="img-hover relative aspect-[4/5] overflow-hidden bg-stone">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width:1024px) 13rem, 45vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
