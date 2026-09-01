import { brand, contact, whatsappHref } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * 16 — Contact.
 *
 * The homepage close. Deliberately not a map: the brief is right that a large
 * embedded Google map in the middle of a homepage is a performance and design
 * cost with little return. The map lives on /contact, and this strip carries
 * the address, the three direct routes and the coordinates.
 */
export function ContactStrip() {
  return (
    <section id="contact" className="band-tight bg-ivory">
      <div className="shell">
        <div className="grid gap-10 border-t border-rule pt-12 md:grid-cols-[1.2fr_1fr_1fr] md:gap-14">
          <div>
            <Reveal>
              <p className="label mb-6 text-accent">Contact</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light text-ink">
                Let’s talk trade.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/request-a-quote" variant="solid">
                  Request a quote
                </Button>
                <Button href="/contact" variant="light">
                  Contact page
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <address className="not-italic">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
                {brand.name}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-light-muted">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-on-light-faint">
                {contact.coords.lat}° N / {contact.coords.lon}° E
              </p>
            </address>
          </Reveal>

          <Reveal delay={240}>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-[0.9375rem] text-ink"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="link text-[0.9375rem] text-ink">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="link break-all text-[0.9375rem] text-ink"
                >
                  {contact.email}
                </a>
              </li>
              <li className="pt-2 text-[0.875rem] text-on-light-muted">{contact.hours}</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
