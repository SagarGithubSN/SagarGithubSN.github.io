import Link from 'next/link';

import { Reveal, RevealLines } from '@/components/ui/Reveal';

interface Crumb {
  name: string;
  path: string;
}

interface PageHeaderProps {
  eyebrow: string;
  headline: readonly string[];
  lede?: string;
  crumbs?: readonly Crumb[];
  /** Optional slot for a CTA row or metadata. */
  children?: React.ReactNode;
}

/**
 * The standard opening for every page other than the homepage.
 *
 * Sits on ivory with generous top padding to clear the fixed nav, and carries
 * a real breadcrumb trail — which is both a usability affordance for a buyer
 * navigating six product pages and the visible counterpart of the
 * BreadcrumbList JSON-LD.
 */
export function PageHeader({ eyebrow, headline, lede, crumbs, children }: PageHeaderProps) {
  return (
    <section className="bg-ivory pt-[8.5rem]">
      <div className="shell">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-on-light-faint">
              <li>
                <Link href="/" className="link hover:text-on-light-muted">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {i === crumbs.length - 1 ? (
                    <span className="text-ink">{c.name}</span>
                  ) : (
                    <Link href={c.path} className="link hover:text-on-light-muted">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="grid gap-8 pb-[clamp(2.5rem,6vh,4.5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{eyebrow}</p>
            </Reveal>
            <RevealLines
              level={1}
              lines={headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
          </div>

          {lede || children ? (
            <div className="lg:pt-4">
              {lede ? (
                <Reveal delay={140}>
                  <p className="max-w-[50ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
                    {lede}
                  </p>
                </Reveal>
              ) : null}
              {children ? (
                <Reveal delay={260}>
                  <div className="mt-8">{children}</div>
                </Reveal>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
