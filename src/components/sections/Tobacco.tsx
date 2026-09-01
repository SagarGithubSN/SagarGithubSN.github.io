import Image from 'next/image';
import Link from 'next/link';

import { tobacco } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { SpecTable } from '@/components/ui/SpecTable';

/**
 * 10 — FCV tobacco.
 *
 * The most technically credible content the business has, and the section most
 * at risk of taking over the brand. It is therefore placed late, kept on the
 * sand ground rather than given its own dramatic treatment, and written as
 * trade specification.
 *
 * Regional figures are labelled as regional figures. The old site let
 * "70,000 hectares" and "56,000 growers" sit close enough to its own copy to
 * read as company scale; here the caption says plainly that they are not.
 */
export function Tobacco() {
  return (
    <section id="tobacco" className="band bg-sand">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{tobacco.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={tobacco.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
            <Reveal delay={160}>
              <p className="mt-8 max-w-[48ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
                {tobacco.intro}
              </p>
            </Reveal>
            <Reveal delay={280}>
              <Link
                href="/products/fcv-tobacco"
                className="link mt-7 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent"
              >
                Full specification &amp; curing process →
              </Link>
            </Reveal>
          </div>

          {/* Specs */}
          <div className="grid gap-9">
            <SpecTable rows={tobacco.chemical} caption="Chemical" />
            <SpecTable rows={tobacco.physical} caption="Physical" />
          </div>
        </div>

        {/* Curing, as three photographed stages. */}
        <ol className="mt-[clamp(3.5rem,8vh,6rem)] grid gap-6 md:grid-cols-3">
          {tobacco.curing.map((c, i) => (
            <Reveal key={c.n} delay={i * 130}>
              <li>
                <div className="img-hover relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(min-width:768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] text-accent">{c.n}</p>
                <h3 className="mt-2 font-display text-[1.375rem] font-light text-ink">{c.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-on-light-muted">{c.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Regional context — explicitly not company figures. */}
        <div className="mt-[clamp(3rem,7vh,5rem)] border-t border-rule pt-8">
          <p className="label mb-6 text-on-light-faint">{tobacco.regional.caption}</p>
          <dl className="grid gap-8 sm:grid-cols-3">
            {tobacco.regional.stats.map((s, i) => (
              <Reveal key={s.k} delay={i * 120}>
                <div>
                  <dt className="font-display text-[clamp(2rem,3.4vw,2.75rem)] font-light text-forest">
                    {s.v}
                  </dt>
                  <dd className="mt-2 max-w-[26ch] text-[0.875rem] leading-relaxed text-on-light-muted">
                    {s.k}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <p className="mt-10 max-w-[70ch] border-l-2 border-stone-deep pl-5 text-[0.8125rem] leading-relaxed text-on-light-faint">
          {tobacco.notice}
        </p>
      </div>
    </section>
  );
}
