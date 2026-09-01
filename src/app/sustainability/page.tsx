import type { Metadata } from 'next';
import Link from 'next/link';

import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Sustainability } from '@/components/sections/Sustainability';
import { ArecaProcess } from '@/components/sections/ArecaProcess';
import { Enquiry } from '@/components/sections/Enquiry';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Sustainability',
  description:
    'Areca tableware made from naturally fallen leaf sheaths, cold-pressed oils drawn on a wooden gaana, and direct grower relationships. Stated plainly, with no carbon claims.',
  alternates: { canonical: '/sustainability' },
};

/**
 * Sustainability.
 *
 * The section that most invites invention, so it opens by stating what is
 * absent. No carbon figures, no net-zero language, no offsets, no ESG score and
 * no organic certification appear anywhere on this site, because none has been
 * measured or issued.
 */
export default function SustainabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sustainability"
        headline={['Only what we', 'can actually show.']}
        lede="Three of our six lines have a genuine environmental story. They are told here, and nothing else is added around them."
        crumbs={[{ name: 'Sustainability', path: '/sustainability' }]}
      />

      <section className="band-tight bg-ivory">
        <div className="shell">
          <Reveal>
            <div className="border-l-2 border-accent-bright bg-paper p-7 md:p-9">
              <p className="label mb-5 text-on-light-faint">What this page does not claim</p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {[
                  'No carbon-neutral or net-zero claim',
                  'No CO₂ figures or offsets',
                  'No ESG score',
                  'No organic certification',
                  'No recycled-content percentage',
                  'No claim that every product is chemical-free',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9375rem] leading-relaxed text-on-light-muted"
                  >
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stone-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[62ch] text-[0.875rem] leading-relaxed text-on-light-faint">
                If any of these are later measured or certified, they will appear here with the
                evidence attached. Until then their absence is the honest position.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Sustainability />

      <section className="band-tight bg-ivory">
        <div className="shell">
          <Reveal>
            <p className="max-w-[62ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
              The clearest example is areca. Nothing is grown or cut for it — the palm drops its
              leaf sheath on its own, and the whole process from there is water, heat and pressure.{' '}
              <Link href="/products/areca" className="link text-accent">
                See the areca process
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <ArecaProcess />
      <Enquiry />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: 'Sustainability', path: '/sustainability' }]),
          ),
        }}
      />
    </>
  );
}
