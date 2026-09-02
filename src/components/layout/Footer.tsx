import Image from 'next/image';
import Link from 'next/link';

import { brand, contact, footer, materials, nav, whatsappHref } from '@/lib/content';

/**
 * Footer.
 *
 * No social icons: the previous site shipped four that all pointed at "#".
 * Dead links are worse than absent ones, so these appear only once real
 * profile URLs are supplied (CONTENT_GAPS.md §5).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-on-dark">
      <div className="shell band-tight">
        <div className="grid gap-12 border-b border-rule-dark pb-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-10">
          {/* Positioning */}
          <div>
            {/* The client's mark, on the one dark ground on the site.
                
                It was supplied as navy and gold artwork on cream with no alpha
                channel, and keying that cream out is not an option: the soft
                shadows, the cloud and the compass rose all dissolve into it,
                and a knocked-out mark would be navy on forest, which is
                unreadable. So it keeps its own ground, and the ground is made
                deliberate rather than accidental — this plate is ivory, within
                two or three points of the artwork's own background, so no seam
                shows between the two and the whole thing reads as a single
                cream square rather than a picture pasted onto the footer.

                Only the emblem is used. The supplied lockup sets CAPTAIN EXIM
                and the tagline inside the artwork, which at this size would be
                unreadable, and the name is already set in type immediately
                below it. The image is marked presentational for the same
                reason: a screen reader would otherwise hear the name twice. */}
            <div className="mb-7 inline-block bg-ivory p-3">
              <Image
                src="/img/captain-exim-mark.webp"
                alt=""
                width={670}
                height={617}
                sizes="7rem"
                className="h-[5.5rem] w-auto"
              />
            </div>

            <p className="font-mono text-[0.8125rem] font-medium tracking-[0.22em] text-ivory">
              {brand.wordmark}
            </p>
            <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-on-dark-muted">
              {footer.positioning}
            </p>
          </div>

          {/* Products */}
          <nav aria-label="Products">
            <p className="label mb-5 text-on-dark-faint">Products</p>
            <ul className="space-y-2.5">
              {materials.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/products/${m.id}`}
                    className="link text-[0.9375rem] text-on-dark-muted transition-colors hover:text-ivory"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <p className="label mb-5 text-on-dark-faint">Company</p>
            <ul className="space-y-2.5">
              {nav
                .filter((n) => n.label !== 'Products')
                .map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="link text-[0.9375rem] text-on-dark-muted transition-colors hover:text-ivory"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/request-a-quote"
                  className="link text-[0.9375rem] text-on-dark-muted transition-colors hover:text-ivory"
                >
                  Request a quote
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="label mb-5 text-on-dark-faint">Contact</p>
            <address className="not-italic">
              <p className="text-[0.9375rem] leading-relaxed text-on-dark-muted">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href={contact.phoneHref} className="link text-[0.9375rem] hover:text-ivory">
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-[0.9375rem] hover:text-ivory"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="link break-all text-[0.9375rem] hover:text-ivory"
                  >
                    {contact.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-[0.8125rem] text-on-dark-faint">{contact.hours}</p>
            </address>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-dark-faint">
            © {year} {brand.name} · {brand.city}, {brand.region}, {brand.country}
          </p>
          <ul className="flex flex-wrap gap-6">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-dark-faint hover:text-on-dark-muted"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
