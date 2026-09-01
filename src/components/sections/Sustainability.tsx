import Image from 'next/image';

import { sustainability } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';

/**
 * 12 — Trade should leave something behind.
 *
 * The sustainability story here is unusually coherent because it is not a
 * policy — it is three product decisions that happen to be defensible. Those
 * are stated; nothing else is.
 *
 * The tree-per-export commitment is gated behind `sustainability.tree.confirmed`.
 * Until the client confirms it is active under Captain Exim, it renders as an
 * intention with an explicit note, and never with a count. See CONTENT_GAPS.md.
 */
export function Sustainability() {
  const { tree } = sustainability;

  return (
    <section
      id="sustainability"
      className="band"
      style={{ background: 'var(--color-sage-wash)' }}
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-forest-2">{sustainability.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={sustainability.headline}
              className="font-display text-[length:var(--text-display)] font-light text-forest"
            />
            <Reveal delay={160}>
              <p className="mt-8 max-w-[46ch] text-[length:var(--text-lede)] leading-relaxed text-ink/80">
                {sustainability.body}
              </p>
            </Reveal>
          </div>

          <dl className="border-t border-forest/15">
            {sustainability.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div className="border-b border-forest/15 py-7">
                  <dt className="font-display text-[1.5rem] font-light text-forest">{p.title}</dt>
                  <dd className="mt-2.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink/75">
                    {p.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* The tree commitment. */}
        <Reveal delay={200}>
          <div className="mt-[clamp(3rem,7vh,5rem)] grid items-center gap-10 border border-forest/15 bg-ivory/60 p-8 md:grid-cols-[1fr_minmax(0,18rem)] md:p-10">
            <div>
              <p className="label mb-4 text-forest-2">Our commitment</p>
              <p className="font-display text-[clamp(2rem,3.6vw,3rem)] font-light leading-[1.08] text-forest">
                {tree.headline}
              </p>
              <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink/75">
                {tree.body}
              </p>

              {!tree.confirmed ? (
                <p className="mt-5 flex max-w-[52ch] gap-3 text-[0.8125rem] leading-relaxed text-on-light-faint">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright"
                  />
                  {tree.pendingNote}
                </p>
              ) : null}
            </div>

            {/* A sapling going into the ground, not a crop: the image has to
                carry "one export, one tree" on its own. */}
            <div className="img-hover relative aspect-[4/5] overflow-hidden bg-stone">
              <Image
                src={tree.image}
                alt={tree.imageAlt}
                fill
                sizes="(min-width:768px) 18rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
