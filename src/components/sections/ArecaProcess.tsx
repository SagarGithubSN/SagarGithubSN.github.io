import Image from 'next/image';
import Link from 'next/link';

import { arecaProcess } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { ProcessSequence } from '@/components/ui/ProcessSequence';

/**
 * 06 — Areca, told with photography.
 *
 * The decision not to build this in 3D is the direct result of the reference
 * analysis: the reference's own "3D" set pieces are pre-rendered frame
 * sequences, not runtime geometry (REFERENCE_VIDEO_LEARNINGS.md §B). A procedural
 * leaf would have been a worse version of a photograph we already have.
 *
 * The previous build ran this as 500vh of pinned canvas with five state
 * changes — roughly 1,000px of scroll between visible events. Here six beats
 * run across ~3.5 screens with a continuously filling rail and a continuously
 * scaling photograph, so nothing is ever still.
 */
export function ArecaProcess() {
  return (
    <section id="areca" aria-labelledby="areca-heading" className="bg-ivory">
      {/* Intro band */}
      <div className="shell pt-[clamp(4.5rem,11vh,8.5rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{arecaProcess.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={arecaProcess.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
          </div>
          <div className="lg:pt-3">
            <Reveal delay={120}>
              <p className="max-w-[50ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
                {arecaProcess.intro}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {arecaProcess.features.map((f) => (
                  <li
                    key={f}
                    className="border border-rule px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-light-muted"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <h3 id="areca-heading" className="sr-only">
        How areca leaf tableware is made
      </h3>

      <ProcessSequence beats={arecaProcess.beats} ground="bg-ivory" />

      {/* The packing story, shown. The sequence's final beat carries the
          finished product; these three carry carton, pallet and container so
          "shipped by the carton, pallet or container" is demonstrated. */}
      <div className="shell pt-[clamp(2.5rem,6vh,4rem)]">
        <Reveal>
          <p className="label mb-8 text-accent">{arecaProcess.packing.eyebrow}</p>
        </Reveal>
        <ol className="grid gap-6 md:grid-cols-3">
          {arecaProcess.packing.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 110}>
              <li>
                <div className="img-hover relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width:768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] text-accent">
                  {step.n}
                </p>
                <h4 className="mt-2 font-display text-[1.3125rem] font-light text-ink">
                  {step.title}
                </h4>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-on-light-muted">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="shell pb-[clamp(4.5rem,11vh,8.5rem)] pt-[clamp(2rem,5vh,3rem)]">
        <Reveal>
          <Link
            href="/products/areca"
            className="link font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent"
          >
            Areca leaf products - specifications and packing →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
