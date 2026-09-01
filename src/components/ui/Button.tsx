import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'ivory' | 'light' | 'dark';

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  /** External links get the correct rel/target without callers remembering. */
  external?: boolean;
}

const VARIANT: Record<Variant, string> = {
  solid: 'btn-solid',
  /** Ivory fill, deep text — for CTAs sitting over the hero film. */
  ivory: 'btn-ivory',
  light: 'btn-light',
  dark: 'btn-dark',
};

const Arrow = () => (
  <svg
    className="btn__arrow"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    aria-hidden="true"
  >
    <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

/**
 * The site's only button. Fill wipes up from the bottom on hover and the arrow
 * nudges — both driven by CSS in `globals.css` so no JS runs for a hover.
 */
export function Button({
  children,
  href,
  variant = 'light',
  className = '',
  external = false,
}: ButtonProps) {
  const cls = `btn ${VARIANT[variant]} ${className}`.trim();
  const label = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );

  if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
