import type { Metadata } from 'next';

import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Source } from '@/components/sections/Source';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Shipment } from '@/components/sections/Shipment';
import { Enquiry } from '@/components/sections/Enquiry';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Sourcing',
  description:
    'How Captain Exim sources: direct grower relationships around Mysuru, a hands-on approach to product and specification, and a six-step commercial process from requirement to shipment.',
  alternates: { canonical: '/sourcing' },
};

/**
 * Sourcing.
 *
 * The brief is explicit that "micro-manage suppliers" — the old site's own
 * phrase — must not appear in public copy. The underlying idea is genuine and
 * worth keeping, so it is restated here as hands-on sourcing, with a clear
 * statement of what the business does not claim to be.
 */
export default function SourcingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sourcing"
        headline={['Hands-on,', 'not at arm’s length.']}
        lede="Captain Exim takes a hands-on approach to understanding product requirements, sources and buyer expectations, rather than acting only as a distant intermediary."
        crumbs={[{ name: 'Sourcing', path: '/sourcing' }]}
      />

      <section className="band-tight bg-ivory">
        <div className="shell">
          <div className="grid gap-10 border-t border-rule pt-12 md:grid-cols-3 md:gap-14">
            <Reveal>
              <div>
                <h2 className="font-display text-[1.5rem] font-light text-forest">
                  What that means
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-light-muted">
                  We go to the farm and the press. We can describe how a consignment was grown,
                  graded and packed because we were there while it happened.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <h2 className="font-display text-[1.5rem] font-light text-forest">
                  What it does not mean
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-light-muted">
                  We do not own farms, factories or warehouses, and this site does not claim
                  certifications the business has not been issued. Where a capability is a sourcing
                  relationship rather than an asset, we say so.
                </p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div>
                <h2 className="font-display text-[1.5rem] font-light text-forest">
                  Why it is a trade-off
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-light-muted">
                  Working this closely does not scale indefinitely. It buys precision and a named
                  person who can answer a technical question, which for most buyers is the more
                  useful thing.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Source />
      <Shipment />
      <HowWeWork />
      <Enquiry />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Sourcing', path: '/sourcing' }])),
        }}
      />
    </>
  );
}
