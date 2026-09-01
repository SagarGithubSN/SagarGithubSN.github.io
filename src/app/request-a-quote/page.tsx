import type { Metadata } from 'next';

import { contact, whatsappHref } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';
import { Reveal } from '@/components/ui/Reveal';
import { HowWeWork } from '@/components/sections/HowWeWork';

export const metadata: Metadata = {
  title: 'Request a quote',
  description:
    'Tell Captain Exim what you are sourcing — product, volume, unit and destination — and receive a quotation and a realistic lead time from a named person.',
  alternates: { canonical: '/request-a-quote' },
};

/**
 * The standalone quote page.
 *
 * Every primary CTA on the site lands here, so it opens with the form rather
 * than making a buyer scroll past marketing to reach it. "How we work" sits
 * below as reassurance about what happens after they press send.
 */
export default function RequestAQuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        headline={['Tell us what', 'you’re sourcing.']}
        lede="Product, volume, unit and destination is enough to start. You will get a quotation and a realistic lead time from a named person — not a ticket number."
        crumbs={[{ name: 'Request a quote', path: '/request-a-quote' }]}
      />

      <section className="band-tight bg-ivory">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <div>
            <Reveal>
              <dl className="border-t border-rule">
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
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                    Hours
                  </dt>
                  <dd className="text-right text-[0.9375rem] text-on-light-muted">
                    {contact.hours}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-[38ch] text-[0.875rem] leading-relaxed text-on-light-faint">
                Every enquiry gets a reference number and an acknowledgement by email. If you do not
                receive one, something has gone wrong — please call or message us.
              </p>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <HowWeWork />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: 'Request a quote', path: '/request-a-quote' }]),
          ),
        }}
      />
    </>
  );
}
