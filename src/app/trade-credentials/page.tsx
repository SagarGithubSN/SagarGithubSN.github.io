import type { Metadata } from 'next';

import { credentials, credentialsCopy } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Enquiry } from '@/components/sections/Enquiry';

export const metadata: Metadata = {
  title: 'Trade Credentials',
  description:
    'Registration and certification details are shared directly with buyers during enquiry, against the destination market and product. Captain Exim publishes nothing it cannot evidence.',
  alternates: { canonical: '/trade-credentials' },
};

/**
 * Trade credentials.
 *
 * The business file names this as the single biggest gap: for an export buyer
 * deciding whether to wire money to an unknown Indian supplier, proof is the
 * whole decision.
 *
 * The page therefore does two things. It is built to display verified
 * registrations the moment `credentials` is populated — and until then it is
 * explicit about why nothing is shown, which is a stronger signal to a
 * professional buyer than a wall of unverifiable badges.
 */
export default function TradeCredentialsPage() {
  const hasAny = credentials.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={credentialsCopy.eyebrow}
        headline={credentialsCopy.headline}
        lede={credentialsCopy.body[0]}
        crumbs={[{ name: 'Trade Credentials', path: '/trade-credentials' }]}
      />

      <section className="band-tight bg-ivory">
        <div className="shell grid gap-12 border-t border-rule pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
                {credentialsCopy.body[1]}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 border border-rule bg-paper p-6">
                <p className="label mb-4 text-on-light-faint">Due diligence</p>
                <p className="max-w-[44ch] text-[0.875rem] leading-relaxed text-on-light-muted">
                  If you are evaluating Captain Exim as a supplier, ask for the registrations
                  relevant to your product and market in your first message. They will be sent as
                  documents with numbers you can verify with the issuing body - not as images.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            {hasAny ? (
              <dl className="border-t border-rule">
                {credentials.map((c) => (
                  <div
                    key={c.label}
                    className="grid grid-cols-[minmax(0,13rem)_1fr] items-baseline gap-6 border-b border-rule py-5"
                  >
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-on-light-muted">
                      {c.label}
                    </dt>
                    <dd className="font-display text-[1.1875rem] font-light text-ink">
                      {c.value}
                      {c.note ? (
                        <span className="mt-1 block text-[0.8125rem] text-on-light-faint">
                          {c.note}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Reveal delay={180}>
                <div className="border border-rule bg-paper p-7 md:p-9">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-on-light-faint">
                    Provided on enquiry
                  </p>
                  <ul className="mt-6 space-y-3.5">
                    {credentialsCopy.onRequest.map((item) => (
                      <li key={item} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-ink">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-bright"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 border-t border-rule pt-5 text-[0.8125rem] leading-relaxed text-on-light-faint">
                    Applicability varies by product and destination - not every registration is
                    relevant to every consignment, and we will tell you which ones are.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <Enquiry />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: 'Trade Credentials', path: '/trade-credentials' }]),
          ),
        }}
      />
    </>
  );
}
