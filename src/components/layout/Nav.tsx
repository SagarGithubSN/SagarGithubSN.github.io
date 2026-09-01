'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { brand, materials, nav } from '@/lib/content';

/**
 * Sticky navigation with two states.
 *
 * OVER THE HERO FILM (homepage, before scroll) there is NO bar at all — no
 * panel, no blur, no border. The links sit directly on the footage in the
 * site's own ivory, so the nav reads as part of the film rather than a UI
 * strip laid over it. Legibility comes from the hero's own top gradient
 * (see `.hero-scrim`), which belongs to the image, not to the navigation.
 *
 * SCROLLED (and every other page) it becomes the normal light bar: ivory
 * ground, deep warm grey type, hairline rule.
 *
 * The two states share every transitioned property, so the change is a
 * crossfade rather than a switch.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // products dropdown (desktop)
  const [menu, setMenu] = useState(false); // full menu (mobile)
  const pathname = usePathname();
  const closeTimer = useRef<number | undefined>(undefined);

  /**
   * Which state the bar is in.
   *
   * The trigger is the hero itself, not a scroll distance. A fixed threshold
   * flipped the bar to ivory after a single wheel click, while the film was
   * still filling the screen behind it — the light bar then sat on the footage
   * as an obvious rectangle. What actually matters is whether the *film* is
   * still behind the bar, so the test is exactly that: the hero's bottom edge
   * has risen past the bar's own height.
   *
   * A missed event here is not cosmetic: the hero treatment is ivory type on
   * no background, so if the page reaches an ivory section while the bar still
   * thinks it is over the film, the navigation becomes ivory on ivory —
   * invisible. Scroll events can be coalesced or dropped, so a cheap 250ms
   * backstop reads the geometry directly. Same reasoning as the reveal
   * failsafe in `useReveal`.
   */
  useEffect(() => {
    const NAV_H = 72; // h-[4.5rem]
    const sync = () => {
      const hero = document.getElementById('top');
      // Routes without a film hero go light immediately on any movement.
      if (!hero) {
        setScrolled(window.scrollY > 24);
        return;
      }
      setScrolled(hero.getBoundingClientRect().bottom <= NAV_H);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    const backstop = window.setInterval(sync, 250);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
      window.clearInterval(backstop);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setMenu(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu]);

  const openDropdown = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeDropdown = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  /**
   * Only the homepage has the film behind the bar. Every other route opens on
   * ivory, so the light treatment applies from the first paint — no flash of
   * white-on-white. The open mobile sheet is ivory too, so it forces light.
   */
  const overHero = pathname === '/' && !scrolled && !menu;

  // A whisper of shadow — enough to hold an edge against a bright sky frame,
  // not enough to read as a drop shadow.
  const heroTextShadow = overHero ? '0 1px 10px rgba(0,0,0,0.18)' : undefined;

  /* The site's own ivory rather than a generic white — the same ground colour
     every other section uses, so the nav belongs to this brand and not to the
     video player. */
  const linkColour = overHero ? 'text-[color:var(--color-ivory)]/90' : 'text-on-light-muted';
  const linkActive = overHero ? 'text-[color:var(--color-ivory)]' : 'text-ink';
  /* Whole class names only — Tailwind cannot see a `hover:` prefix that is
     assembled inside a template literal at runtime. */
  const linkHover = overHero
    ? 'hover:text-[color:var(--color-ivory)]'
    : 'hover:text-ink';

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        // Fully transparent over the film: the links float on the footage.
        background: overHero ? 'transparent' : 'rgba(248,245,238,0.95)',
        borderColor: overHero ? 'transparent' : 'var(--color-rule)',
        backdropFilter: overHero ? 'none' : 'blur(10px)',
        WebkitBackdropFilter: overHero ? 'none' : 'blur(10px)',
      }}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        {/* The wordmark is the only brand mark in the bar, so it carries the
            lockup: a larger wordmark with the tagline from the logo set beneath
            it as a hairline. That gives it presence without a graphic that
            would muddy at this size over moving footage. */}
        <Link
          href="/"
          className={`group flex shrink-0 flex-col justify-center transition-colors duration-500 ${
            overHero ? 'text-[color:var(--color-ivory)]' : 'text-ink'
          }`}
          style={{ textShadow: heroTextShadow }}
          aria-label={`${brand.name} — home`}
        >
          <span className="font-display text-[clamp(1.25rem,1.7vw,1.6rem)] font-light leading-none tracking-[0.06em]">
            {brand.wordmark}
          </span>
          <span
            className={`mt-1 hidden whitespace-nowrap font-mono text-[0.5rem] uppercase leading-none tracking-[0.2em] xl:block transition-opacity duration-500 ${
              overHero ? 'opacity-70' : 'opacity-55'
            }`}
          >
            {brand.promise}
          </span>
        </Link>

        {/* ---------- Desktop ---------- */}
        <nav aria-label="Primary" className="hidden shrink-0 items-center gap-6 xl:flex">
          <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <Link
              href="/products"
              aria-expanded={open}
              aria-haspopup="true"
              onFocus={openDropdown}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap py-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500 ${linkColour} ${linkHover}`}
              style={{ textShadow: heroTextShadow }}
            >
              Products
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                <path
                  d="M1 1l3.5 3.5L8 1"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  className="transition-transform duration-300"
                  style={{ transformOrigin: 'center', transform: open ? 'scaleY(-1)' : 'none' }}
                />
              </svg>
            </Link>

            {/* The dropdown is always the light panel — it sits on its own
                ground rather than over the film. */}
            <div
              className="absolute left-0 top-full w-[19rem] origin-top border border-rule bg-paper p-2 shadow-[0_18px_50px_rgba(41,40,36,0.16)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(-0.4rem)',
                pointerEvents: open ? 'auto' : 'none',
                visibility: open ? 'visible' : 'hidden',
              }}
            >
              {materials.map((m) => (
                <Link
                  key={m.id}
                  href={`/products/${m.id}`}
                  className="group flex items-baseline gap-3 px-3 py-2.5 transition-colors hover:bg-sand"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] text-on-light-faint">
                    {m.number}
                  </span>
                  <span className="font-display text-[1.0625rem] font-light text-ink">
                    {m.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {nav
            .filter((n) => n.label !== 'Products')
            .map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href ? 'page' : undefined}
                className={`shrink-0 whitespace-nowrap py-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                  pathname === n.href ? linkActive : linkColour
                } ${linkHover}`}
                style={{ textShadow: heroTextShadow }}
              >
                {n.label}
              </Link>
            ))}

          {/* Over the hero this is suppressed: the hero already carries a
              REQUEST A QUOTE button a few hundred pixels below, and two of them
              on one screen is just repetition. It fades in as soon as the hero
              is behind you, in the same position. */}
          <Link
            href="/request-a-quote"
            aria-hidden={overHero}
            tabIndex={overHero ? -1 : 0}
            className="btn btn-solid !px-6 !py-3 !text-[0.625rem] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: overHero ? 0 : 1,
              transform: overHero ? 'translateY(-0.4rem)' : 'none',
              pointerEvents: overHero ? 'none' : 'auto',
            }}
          >
            Request a quote
          </Link>
        </nav>

        {/* ---------- Mobile trigger ---------- */}
        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-expanded={menu}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center xl:hidden"
        >
          <span className="sr-only">{menu ? 'Close menu' : 'Open menu'}</span>
          <span className="relative block h-3 w-6">
            <span
              className="absolute left-0 block h-px w-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                top: menu ? '6px' : '0',
                transform: menu ? 'rotate(45deg)' : 'none',
                background: overHero ? 'var(--color-ivory)' : 'var(--color-ink)',
                boxShadow: overHero ? '0 1px 6px rgba(0,0,0,0.22)' : undefined,
              }}
            />
            <span
              className="absolute left-0 block h-px w-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                top: menu ? '6px' : '12px',
                transform: menu ? 'rotate(-45deg)' : 'none',
                background: overHero ? 'var(--color-ivory)' : 'var(--color-ink)',
                boxShadow: overHero ? '0 1px 6px rgba(0,0,0,0.22)' : undefined,
              }}
            />
          </span>
        </button>
      </div>

      {/* ---------- Mobile sheet ---------- */}
      <div
        id="mobile-menu"
        className="overflow-hidden border-t border-rule bg-ivory transition-[max-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden"
        style={{ maxHeight: menu ? 'calc(100svh - 4.5rem)' : '0' }}
      >
        <nav aria-label="Mobile" className="shell max-h-[calc(100svh-4.5rem)] overflow-y-auto py-6">
          <p className="label mb-4 text-on-light-faint">Products</p>
          <ul className="mb-7">
            {materials.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/products/${m.id}`}
                  className="flex items-baseline gap-3 border-b border-rule py-3"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] text-on-light-faint">
                    {m.number}
                  </span>
                  <span className="font-display text-[1.25rem] font-light">{m.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mb-8">
            {nav
              .filter((n) => n.label !== 'Products')
              .map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block border-b border-rule py-3 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-on-light-muted"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
          </ul>

          <Link href="/request-a-quote" className="btn btn-solid w-full justify-center">
            Request a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
