import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { materialById, materials, tobacco, whatsappHref } from '@/lib/content';
import { breadcrumbJsonLd, productJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SpecTable } from '@/components/ui/SpecTable';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';

/** All six pages are statically generated. */
export function generateStaticParams() {
  return materials.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = materialById(slug);
  if (!m) return {};

  return {
    title: m.name,
    description: m.lede,
    alternates: { canonical: `/products/${m.id}` },
    openGraph: {
      title: `${m.name} · Captain Exim`,
      description: m.lede,
      images: [{ url: m.image, alt: m.alt }],
    },
  };
}

/**
 * Product category page.
 *
 * Structured the way an export buyer reads: what it is, what is available, how
 * it is processed, where it comes from, how it packs, in what units it is
 * quoted — then the enquiry form, preselected to this category.
 *
 * Two honesty mechanics are built into the layout rather than bolted on:
 *
 *   - `items: []` renders an explicit "not yet confirmed" panel instead of a
 *     fabricated catalogue. Spices and coconut both use it today.
 *   - `specs` is optional. A page with no verified specification simply does
 *     not show a specification table.
 */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = materialById(slug);
  if (!m) notFound();

  const { page } = m;
  const isTobacco = m.id === 'fcv-tobacco';

  return (
    <>
      <PageHeader
        eyebrow={`${m.number} - Product`}
        headline={page.headline}
        lede={m.lede}
        crumbs={[
          { name: 'Products', path: '/products' },
          { name: m.name, path: `/products/${m.id}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#enquire" variant="solid">
            Request a quote
          </Button>
          <Button href={whatsappHref(m.whatsapp)} variant="light" external>
            WhatsApp
          </Button>
        </div>
      </PageHeader>

      {/* Hero image */}
      <section className="bg-ivory">
        <div className="shell">
          <Reveal>
            <div className="img-mask relative aspect-[2/1] w-full overflow-hidden bg-stone sm:aspect-[21/9]">
              <Image
                src={m.image}
                alt={m.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview + gallery.
          Reduced top padding: a full `band` here stacked on top of the hero
          image band and the header's own bottom padding, which read as a large
          dead gap between the CTAs and the first line of copy. */}
      <section className="bg-ivory pb-[clamp(4.5rem,11vh,8.5rem)] pt-[clamp(2.75rem,6vh,4.25rem)]">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-6 text-accent">Overview</p>
            </Reveal>
            {page.overview.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p
                  className={`max-w-[54ch] text-[length:var(--text-lede)] leading-relaxed ${
                    i === 0 ? 'text-ink' : 'mt-5 text-on-light-muted'
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            {/* Available products */}
            <div className="mt-10">
              <p className="label mb-5 text-on-light-faint">Available products</p>
              {page.items.length ? (
                <ul className="flex flex-wrap gap-2">
                  {page.items.map((item) => (
                    <li
                      key={item}
                      className="border border-rule bg-paper px-4 py-2 text-[0.9375rem] text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="border-l-2 border-accent-bright bg-paper px-5 py-4 text-[0.9375rem] leading-relaxed text-on-light-muted">
                  {page.itemsNote}
                </p>
              )}
              {page.items.length && page.itemsNote ? (
                <p className="mt-4 max-w-[54ch] text-[0.875rem] leading-relaxed text-on-light-faint">
                  {page.itemsNote}
                </p>
              ) : null}
            </div>
          </div>

          {/* Gallery + trade facts */}
          <div>
            {m.gallery?.length ? (
              <div className="grid grid-cols-2 gap-4">
                {m.gallery.map((g, i) => (
                  <Reveal key={g.src} delay={i * 130}>
                    <div className={`img-hover relative aspect-[3/4] overflow-hidden bg-stone ${i % 2 ? 'mt-8' : ''}`}>
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(min-width:1024px) 22vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : null}

            <Reveal delay={200}>
              <dl className="mt-10 border-t border-rule">
                <div className="border-b border-rule py-4">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                    Origin
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink">
                    {page.originNote}
                  </dd>
                </div>
                <div className="border-b border-rule py-4">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                    Packaging
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink">
                    {page.packagingNote}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                    Trade units
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {m.units.map((u) => (
                      <span
                        key={u}
                        className="border border-rule px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-light-muted"
                      >
                        {u}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The range, one photograph per named item.
          Categories with a confirmed list get this; the ones still awaiting
          client confirmation deliberately do not, so the page cannot imply a
          catalogue that has not been agreed. */}
      {page.itemImages?.length ? (
        <section className="band bg-sand">
          <div className="shell">
            <Reveal>
              <p className="label mb-8 text-accent">The range</p>
            </Reveal>
            <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {page.itemImages.map((item, i) => (
                <Reveal key={item.label} delay={i * 70}>
                  <li>
                    <div className="img-hover relative aspect-square overflow-hidden bg-stone">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(min-width:1024px) 22vw, (min-width:768px) 30vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-3 font-display text-[1.125rem] font-light text-ink">
                      {item.label}
                    </p>
                    {item.note ? (
                      <p className="mt-1 text-[0.75rem] leading-relaxed text-on-light-faint">
                        {item.note}
                      </p>
                    ) : null}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Processing */}
      {page.processing?.length ? (
        <section className={`band ${page.itemImages?.length ? 'bg-ivory' : 'bg-sand'}`}>
          <div className="shell">
            <Reveal>
              <p className="label mb-8 text-accent">Processing</p>
            </Reveal>
            <ol className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {page.processing.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <li className={`h-full p-7 ${page.itemImages?.length ? 'bg-ivory' : 'bg-sand'}`}>
                    <p className="font-mono text-[0.625rem] tracking-[0.2em] text-accent">{s.n}</p>
                    <h3 className="mt-3 font-display text-[1.375rem] font-light text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-on-light-muted">
                      {s.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Specification */}
      {page.specs?.length || isTobacco ? (
        <section className="band bg-ivory">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <Reveal>
                <p className="label mb-6 text-accent">Specification</p>
              </Reveal>
              <Reveal delay={120}>
                <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                  {isTobacco
                    ? 'The ranges below are what we offer against. Lot sizes and grading follow the buyer’s requirement.'
                    : 'What this product is, stated plainly. Anything not listed here has not been verified and will be confirmed against your enquiry.'}
                </p>
              </Reveal>
            </div>

            <div className="grid gap-9">
              {isTobacco ? (
                <>
                  <SpecTable rows={tobacco.chemical} caption="Chemical" />
                  <SpecTable rows={tobacco.physical} caption="Physical" />
                </>
              ) : (
                <SpecTable rows={page.specs!} />
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Tobacco curing, only where it belongs */}
      {isTobacco ? (
        <section className="band bg-sand">
          <div className="shell">
            <Reveal>
              <p className="label mb-8 text-accent">Curing process</p>
            </Reveal>
            <ol className="grid gap-6 md:grid-cols-3">
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
                    <p className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] text-accent">
                      {c.n}
                    </p>
                    <h3 className="mt-2 font-display text-[1.375rem] font-light text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-on-light-muted">
                      {c.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <p className="mt-10 max-w-[70ch] border-l-2 border-stone-deep pl-5 text-[0.8125rem] leading-relaxed text-on-light-faint">
              {tobacco.notice}
            </p>
          </div>
        </section>
      ) : null}

      {/* Enquiry, preselected */}
      <section id="enquire" className="band bg-ivory">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-6 text-accent">Enquire</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display text-[length:var(--text-headline)] font-light text-ink">
                Ask about {m.short.toLowerCase()}.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                The form is already set to this category, and the units match it. Tell us the volume
                and destination and we will come back with a quotation.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8">
                <Button href={whatsappHref(m.whatsapp)} variant="light" external>
                  Ask on WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <EnquiryForm defaultProduct={m.id} />
          </Reveal>
        </div>
      </section>

      {/* Other categories */}
      <section className="band-tight bg-sand">
        <div className="shell">
          <p className="label mb-7 text-on-light-faint">Other lines</p>
          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
            {materials
              .filter((x) => x.id !== m.id)
              .map((x) => (
                <li key={x.id}>
                  <Link
                    href={`/products/${x.id}`}
                    className="flex h-full flex-col justify-between gap-6 bg-sand p-6 transition-colors duration-500 hover:bg-ivory"
                  >
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] text-accent">
                      {x.number}
                    </span>
                    <span className="font-display text-[1.25rem] font-light leading-tight text-ink">
                      {x.name}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(m.id)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Products', path: '/products' },
              { name: m.name, path: `/products/${m.id}` },
            ]),
          ),
        }}
      />
    </>
  );
}
