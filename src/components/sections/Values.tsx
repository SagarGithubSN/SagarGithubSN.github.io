import { values } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';

/**
 * 11 — What we stand for.
 *
 * The original business listed Trust & Faith, Compassion & Humility, Integrity,
 * and Safety & Customer Service — as four icon tiles, one of which had the
 * wrong caption pasted under it.
 *
 * The themes survive; the tiles do not. These are set as an editorial list with
 * the value as display type and a sentence that says something specific enough
 * to be disagreed with.
 */
export function Values() {
  return (
    <section id="values" className="band bg-ivory">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{values.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={values.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
          </div>

          <dl className="border-t border-rule">
            {values.items.map((v, i) => (
              <Reveal key={v.k} delay={i * 110}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-8 gap-y-2 border-b border-rule py-7 sm:grid-cols-[minmax(0,11rem)_1fr]">
                  <dt className="font-display text-[1.5rem] font-light text-forest">{v.k}</dt>
                  <dd className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                    {v.v}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
