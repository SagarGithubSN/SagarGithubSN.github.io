import type { Metadata } from 'next';

import { brand, contact } from '@/lib/content';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${brand.name} handles the personal data submitted through enquiry forms.`,
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

/**
 * Privacy policy.
 *
 * Written to describe what this site actually does — which is knowable, because
 * the data flow is entirely in this repository: form -> /api/enquiry -> SQLite
 * on the server + two emails. No analytics, no advertising pixels and no
 * third-party trackers are installed, so none are claimed.
 *
 * NOT LEGAL ADVICE. This must be reviewed by the client's adviser before
 * launch, particularly for buyers in the EU/UK (GDPR) and for India's DPDP Act.
 * See CONTENT_GAPS.md.
 */
export default function PrivacyPage() {
  const sections: { h: string; p: string[] }[] = [
    {
      h: 'Who we are',
      p: [
        `${brand.name} is a sourcing and export business based at ${contact.addressInline}. For any question about this policy or your data, contact ${contact.email} or ${contact.phone}.`,
      ],
    },
    {
      h: 'What we collect',
      p: [
        'When you submit an enquiry we collect only the fields on the form: product category, quantity, unit, destination country, purpose, company name, contact person, business email, phone or WhatsApp number, and your requirement description.',
        'We also record the page the enquiry was sent from, the time it was received, and the IP address of the connection. The IP address is used for rate limiting and abuse prevention.',
        'We do not use advertising trackers, analytics cookies, or third-party marketing pixels on this website.',
      ],
    },
    {
      h: 'Why we use it',
      p: [
        'To answer your enquiry, prepare a quotation, and carry out any resulting trade. That is the only purpose.',
        'We do not sell, rent or share your details with third parties for marketing. We do not add enquirers to a mailing list.',
      ],
    },
    {
      h: 'Who can see it',
      p: [
        'Enquiries are stored on our server and emailed to Captain Exim staff handling the enquiry. Email is delivered through our mail provider, and the contact page embeds a map served by Google, which may set its own cookies if you interact with it.',
        'Where a shipment requires it, relevant commercial details may be shared with the parties needed to complete it - for example a freight forwarder or a customs agent.',
      ],
    },
    {
      h: 'How long we keep it',
      p: [
        'Enquiries are retained while the commercial relationship is live and for as long as we are required to keep trade records. If you would like your enquiry deleted and there is no legal reason to keep it, ask us and we will remove it.',
      ],
    },
    {
      h: 'Your rights',
      p: [
        'You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted. Depending on where you are based you may have further rights, including under the EU and UK GDPR and India’s Digital Personal Data Protection Act.',
        `Write to ${contact.email} and we will respond.`,
      ],
    },
    {
      h: 'Security',
      p: [
        'Enquiry data is transmitted over HTTPS and stored on our server. Access is limited to the people who need it to answer enquiries. No system is perfectly secure, but we do not store payment details or identity documents through this website, and you should never send them through the enquiry form.',
      ],
    },
    {
      h: 'Changes',
      p: [
        'If this policy changes, the updated version will be published on this page.',
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        headline={['Privacy Policy']}
        lede="What happens to the details you send through this website, in plain terms."
        crumbs={[{ name: 'Privacy Policy', path: '/privacy' }]}
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
            This policy describes the website as built. It is not legal advice and should be
            reviewed by a qualified adviser before the site goes live.
          </p>
        </div>
      </section>
    </>
  );
}
