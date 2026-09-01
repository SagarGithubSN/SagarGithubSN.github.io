'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { materials, whatsappHref } from '@/lib/content';

const DEFAULT_MESSAGE =
  'Hello Captain Exim, I would like to discuss sourcing from India. Please share product and commercial details.';

/**
 * WhatsApp access, kept deliberately quiet.
 *
 * The brief rules out the oversized third-party green bubble, and it is right
 * to: on a light ivory page it reads as a plugin someone bolted on. This is the
 * house style instead — a small ink pill that expands its label on hover, and
 * only appears once the reader has committed to the page.
 *
 * The prefilled message is derived from the route, so a buyer messaging from
 * /products/oils opens WhatsApp with an oils enquiry already written. One
 * instance lives in the root layout; nothing needs to pass it a prop.
 */
export function WhatsAppFloat({ message }: { message?: string } = {}) {
  const [shown, setShown] = useState(false);
  const pathname = usePathname();

  const contextual =
    message ??
    materials.find((m) => pathname?.startsWith(`/products/${m.id}`))?.whatsapp ??
    DEFAULT_MESSAGE;

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappHref(contextual)}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 overflow-hidden rounded-full bg-ink py-3 pl-3.5 pr-3.5 text-ivory shadow-[0_6px_28px_rgba(41,40,36,0.22)] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:gap-2.5 hover:pr-5 focus-visible:gap-2.5 focus-visible:pr-5 print:hidden"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(0.75rem)',
        pointerEvents: shown ? 'auto' : 'none',
      }}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.21.89 2.39 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
      <span className="max-w-0 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100">
        WhatsApp
      </span>
      <span className="sr-only">Message Captain Exim on WhatsApp</span>
    </a>
  );
}
