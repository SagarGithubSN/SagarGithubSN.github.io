import { contact, enquiry, whatsappHref } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';

/**
 * 15 — Request a quote.
 *
 * The page's conversion moment, and the only section that carries three
 * alternative routes beside it. An export buyer in a different timezone who is
 * not ready to fill a form should still be one tap from WhatsApp.
 */
export function Enquiry({ defaultProduct = '' }: { defaultProduct?: string }) {
  return (
    <section id="enquiry" className="band bg-sand">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{enquiry.eyebrow}</p>
            </Reveal>

            <RevealLines
              lines={enquiry.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />

            <Reveal delay={160}>
              <p className="mt-8 max-w-[42ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
                {enquiry.body}
              </p>
            </Reveal>

            {/* Direct routes */}
            <Reveal delay={300}>
              <dl className="mt-10 border-t border-rule">
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
                  <dd className="text-[0.9375rem] text-on-light-muted">{contact.hours}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <EnquiryForm defaultProduct={defaultProduct} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
