import type { Metadata } from 'next';

import { brand, contact } from '@/lib/content';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Terms governing use of the ${brand.name} website.`,
  alternates: { canonical: '/terms' },
};

/**
 * Terms of use.
 *
 * Deliberately narrow: these govern the website, not a contract of sale. The
 * commercial terms of any actual trade are agreed per order, and saying so
 * plainly is more useful to a buyer than boilerplate that implies otherwise.
 *
 * NOT LEGAL ADVICE — requires review before launch, including the tobacco
 * clause, which is jurisdiction-sensitive.
 */
export default function TermsPage() {
  const sections: { h: string; p: string[] }[] = [
    {
      h: 'About these terms',
      p: [
        `These terms govern your use of this website. They are not a contract for the sale of goods. Any trade with ${brand.name} is governed by the commercial terms agreed for that specific order.`,
      ],
    },
    {
      h: 'Information on this site',
      p: [
        'Product descriptions, specification ranges and process information are published in good faith as trade information. Specifications are indicative ranges rather than guarantees for any particular lot; the specification that applies to your order is the one confirmed in writing for that order.',
        'Availability, grades and packing vary by season and by consignment. Nothing on this website is an offer capable of acceptance, and no price is published here.',
      ],
    },
    {
      h: 'Enquiries',
      p: [
        'Submitting an enquiry does not create a contract or reserve stock. We will respond with a quotation where we can supply, and tell you where we cannot.',
        'Please do not send payment details, identity documents or other sensitive personal data through the enquiry form.',
      ],
    },
    {
      h: 'Tobacco',
      p: [
        'Flue-cured Virginia tobacco is offered business-to-business only. The information published about it is trade specification for commercial buyers and is not a consumer advertisement or an inducement to use tobacco.',
        'Tobacco is subject to advertising, labelling, import and licensing restrictions that differ by country. It is the buyer’s responsibility to ensure that any purchase and import complies with the law of the destination market.',
      ],
    },
    {
      h: 'Intellectual property',
      p: [
        `The text, design and original graphics of this website belong to ${brand.name} unless otherwise stated. You may not reproduce them commercially without permission.`,
      ],
    },
    {
      h: 'External links',
      p: [
        'This site links to third-party services such as WhatsApp and Google Maps. We are not responsible for their content or their handling of your data.',
      ],
    },
    {
      h: 'Liability',
      p: [
        'This website is provided as-is. To the extent permitted by law we are not liable for loss arising from reliance on general information published here, as distinct from the specification and terms confirmed for an actual order.',
      ],
    },
    {
      h: 'Governing law and contact',
      p: [
        'These terms are governed by the laws of India, and the courts of Karnataka have jurisdiction.',
        `Questions: ${contact.email}, or ${contact.phone}.`,
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        headline={['Terms of Use']}
        lede="These govern the website. The commercial terms of any trade are agreed per order."
        crumbs={[{ name: 'Terms of Use', path: '/terms' }]}
      />

      <section className="band-tight bg-ivory">
        <div className="shell-narrow border-t border-rule pt-12">
          {sections.map((s) => (
            <div key={s.h} className="mb-11">
              <h2 className="font-display text-[1.625rem] font-light text-ink">{s.h}</h2>
              {s.p.map((para, i) => (
                <p
                  key={i}
                  className="mt-4 max-w-[68ch] text-[0.9375rem] leading-relaxed text-on-light-muted"
                >
                  {para}
                </p>
              ))}
            </div>
          ))}

          <p className="border-l-2 border-stone-deep pl-5 text-[0.8125rem] leading-relaxed text-on-light-faint">
            Not legal advice. These terms must be reviewed by a qualified adviser before the site
            goes live, in particular the tobacco clause against each target market.
          </p>
        </div>
      </section>
    </>
  );
}
