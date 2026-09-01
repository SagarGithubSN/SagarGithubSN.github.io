import type { Metadata } from 'next';

import { brand, contact, whatsappHref } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact Captain Exim in ${brand.city}, ${brand.region}, India — by phone, WhatsApp or email. Business hours, registered address and location.`,
  alternates: { canonical: '/contact' },
};

/**
 * Contact.
 *
 * The map lives here rather than on the homepage, and it is loaded as a lazy
 * iframe rather than the Maps JS API: no key to leak, no third-party script on
 * every page, and it cannot break the way the old site's key-less http:// map
 * did. A plain "view on Google Maps" link sits beside it for anyone who blocks
 * embeds entirely.
 */
export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${contact.coords.lat},${contact.coords.lon}&z=15&output=embed`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        headline={['Let’s talk trade.']}
        lede="Tell us the product, the volume and the destination. If it is easier to talk first, call or message — someone here will answer."
        crumbs={[{ name: 'Contact', path: '/contact' }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={whatsappHref()} variant="solid" external>
            WhatsApp
          </Button>
          <Button href={contact.phoneHref} variant="light">
            {contact.phone}
          </Button>
        </div>
      </PageHeader>

      <section className="band-tight bg-ivory">
        <div className="shell grid gap-12 border-t border-rule pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* Details */}
          <div>
            <Reveal>
              <address className="not-italic">
                <p className="label mb-5 text-on-light-faint">Registered address</p>
                <p className="font-display text-[1.375rem] font-light leading-relaxed text-ink">
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>

                <dl className="mt-9 border-t border-rule">
                  <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                      Phone
                    </dt>
                    <dd>
                      <a href={contact.phoneHref} className="link text-[0.9375rem] text-ink">
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                      WhatsApp
                    </dt>
                    <dd>
                      <a
                        href={whatsappHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-[0.9375rem] text-ink"
                      >
                        Message us
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                      Email
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${contact.email}`}
                        className="link break-all text-[0.9375rem] text-ink"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                      Hours
                    </dt>
                    <dd className="text-right text-[0.9375rem] text-on-light-muted">
                      {contact.hours}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                      Coordinates
                    </dt>
                    <dd className="font-mono text-[0.8125rem] text-on-light-muted">
                      {contact.coords.lat}° N, {contact.coords.lon}° E
                    </dd>
                  </div>
                </dl>
              </address>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8">
                <a
                  href={contact.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent"
                >
                  View on Google Maps →
                </a>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={120}>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-stone">
              <iframe
                src={mapSrc}
                title={`Map showing Captain Exim in ${brand.city}, ${brand.region}, India`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="band bg-sand">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-6 text-accent">Send an enquiry</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-display text-[length:var(--text-headline)] font-light text-ink">
                Or put it in writing.
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                You will get a reference number and an acknowledgement by email straight away, then
                a quotation from a named person.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Contact', path: '/contact' }])),
        }}
      />
    </>
  );
}
