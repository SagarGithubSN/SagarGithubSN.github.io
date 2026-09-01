import { howWeWork } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';

/**
 * 13 — How we work.
 *
 * Practical after emotional: the sustainability section is the page's second
 * warm moment, so this one is deliberately plain — a numbered process on a
 * hairline grid, no photography, no motion beyond the stagger.
 *
 * Steps are written to describe what Captain Exim actually does. Where the
 * business does not control a stage, the copy says so rather than implying
 * in-house capability that has not been verified.
 */
export function HowWeWork() {
  return (
    <section id="how-we-work" className="band bg-ivory">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{howWeWork.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={howWeWork.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
          </div>
          <Reveal delay={140} className="lg:pt-3">
            <p className="max-w-[46ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
              {howWeWork.intro}
            </p>
          </Reveal>
        </div>

        <ol className="mt-[clamp(3rem,7vh,5rem)] grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {howWeWork.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <li className="h-full bg-ivory p-7 transition-colors duration-500 hover:bg-sand">
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-accent">{s.n}</p>
                <h3 className="mt-4 font-display text-[1.4375rem] font-light text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-light-muted">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
