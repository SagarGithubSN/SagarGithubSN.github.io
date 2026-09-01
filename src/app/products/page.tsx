import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { materials } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Enquiry } from '@/components/sections/Enquiry';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Six sourcing lines from Mysuru, Karnataka: areca leaf tableware, agricultural produce, spices, coconut and by-products, cold-pressed cooking oils, and FCV tobacco.',
  alternates: { canonical: '/products' },
};

/**
 * Product index.
 *
 * A full-width editorial list rather than a card grid — each row gets a real
 * photograph, the trade units it is quoted in, and an honest badge where the
 * catalogue is still unconfirmed.
 */
export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        headline={['Six lines,', 'one standard.']}
        lede="Every line is quoted against your specification, in the unit you work in. Where a catalogue is not yet confirmed, this site says so rather than inventing one."
        crumbs={[{ name: 'Products', path: '/products' }]}
      />

      <section className="band-tight bg-ivory">
        <div className="shell">
          <ul className="border-t border-rule">
            {materials.map((m, i) => (
              <Reveal key={m.id} delay={i * 70}>
                <li>
                  <Link
                    href={`/products/${m.id}`}
                    className="group grid items-center gap-6 border-b border-rule py-8 md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,16rem)] md:gap-10"
                  >
                    <div className="img-hover relative aspect-[4/3] w-full overflow-hidden bg-stone md:aspect-square">
                      <Image
                        src={m.image}
                        alt={m.alt}
                        fill
                        sizes="(min-width:768px) 7rem, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-accent">
                          {m.number}
                        </span>
                        <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] font-light text-ink transition-transform duration-500 group-hover:translate-x-1">
                          {m.name}
                        </h2>
                      </div>
                      <p className="mt-3 max-w-[56ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                        {m.lede}
                      </p>
                      {m.awaitingDetail ? (
                        <p className="mt-3 inline-block border border-dashed border-rule-strong px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-light-faint">
                          Product list confirmed on enquiry
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                        Quoted in
                      </p>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-on-light-muted">
                        {m.units.join(' · ')}
                      </p>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Enquiry />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Products', path: '/products' }])),
        }}
      />
    </>
  );
}
