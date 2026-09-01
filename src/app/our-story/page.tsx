import type { Metadata } from 'next';
import Image from 'next/image';

import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Philosophy } from '@/components/sections/Philosophy';
import { Origin } from '@/components/sections/Origin';
import { Values } from '@/components/sections/Values';
import { Enquiry } from '@/components/sections/Enquiry';
import { Wipe } from '@/components/ui/Wipe';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Captain Exim is a sourcing and export house in Mysuru, Karnataka, working directly with growers across the region. Our origin, our philosophy and what we stand for.',
  alternates: { canonical: '/our-story' },
};

/**
 * Our Story.
 *
 * The people section the brief asks for is architected here but not populated:
 * the business file is clear that the only proprietor name on the old site
 * appeared inside a paragraph copied from a different company, so it cannot be
 * used. The panel below states that a founder introduction is coming rather
 * than inventing one — see CONTENT_GAPS.md §2.
 */
export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        headline={['A small house,', 'close to the source.']}
        lede="Captain Exim is a sourcing and export house based in Mysuru, Karnataka. We work directly with growers and sourcing networks across the region, and we would rather be precise than large."
        crumbs={[{ name: 'Our Story', path: '/our-story' }]}
      />

      <section className="band-tight bg-ivory">
        <div className="shell grid gap-12 border-t border-rule pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div>
              {/* The client's own logo lockup. Its background is
                  rgb(250,242,235) — within a couple of points of our ivory —
                  so it sits on this ground with no visible edge and needs no
                  cut-out. This is the one place on the site where the mark can
                  be read at a size that does it justice. */}
              <div className="mb-9 max-w-[15rem]">
                <Image
                  src="/img/captain-exim-logo.webp"
                  alt="Captain Exim — together, we export excellence"
                  width={1000}
                  height={1000}
                  sizes="15rem"
                  className="h-auto w-full"
                />
              </div>

              <p className="label mb-6 text-accent">The business</p>
              <p className="max-w-[52ch] text-[length:var(--text-lede)] leading-relaxed text-ink">
                Captain Exim trades as an exporter and sourcing partner across six lines: areca leaf
                tableware, agricultural produce, spices, coconut and by-products, cold-pressed
                cooking oils, and flue-cured Virginia tobacco.
              </p>
              <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                The common thread is not a category — it is proximity. Everything here comes from a
                region we can reach in a morning, from people we deal with directly.
              </p>
            </div>
          </Reveal>

          {/* Founder placeholder — architected, deliberately unpopulated. */}
          <Reveal delay={160}>
            <div className="border border-dashed border-rule-strong bg-paper p-7">
              <p className="label mb-5 text-on-light-faint">The people behind Captain Exim</p>
              <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                International buyers want to know who they are dealing with, and this page is built
                to carry a founder introduction, a photograph and the reason the business was
                started.
              </p>
              <p className="mt-4 max-w-[46ch] text-[0.875rem] leading-relaxed text-on-light-faint">
                We have left it empty rather than fill it with a name we cannot verify. It will be
                published once confirmed.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Wipe from="var(--color-ivory)" to="var(--color-sage-wash)" />
      <Philosophy />
      <Wipe from="var(--color-sage-wash)" to="var(--color-sand)" flip />

      <Origin />
      <Values />
      <Enquiry />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Our Story', path: '/our-story' }])),
        }}
      />
    </>
  );
}
