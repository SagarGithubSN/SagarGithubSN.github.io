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
/**
 * Three states, not two.
 *
 *   film   at rest on the hero — no bar at all
 *   veil   scrolling through the hero — a thin translucent bar
 *   solid  the hero is behind you — the normal ivory bar
 */
type NavState = 'film' | 'veil' | 'solid';

export function Nav() {
  const pathname = usePathname();

  /**
   * The starting state has to be the one the page will actually be in.
   *
   * This used to start at 'solid' everywhere and correct itself in an effect,
   * which meant the homepage painted a full ivory bar over the film and then
   * faded it out — a visible flash on every load, made worse by the 500ms
   * transition animating the correction. Deriving it from the route at the
   * first render means there is nothing to correct.
   */
  const [state, setState] = useState<NavState>(() => (pathname === '/' ? 'film' : 'solid'));
  /**
   * Whether the bar shows its own quote button.
   *
   * This is a separate question from what the bar looks like, and tying the
   * two together was wrong: the bar now goes solid as the headline reaches it,
   * which is well before the hero's own quote button has left the screen — so
   * both appeared at once, which is the duplication this was meant to avoid.
   * It is now driven by the hero's button row directly. One call to action on
   * screen at a time.
   */
  const [showCta, setShowCta] = useState(() => pathname !== '/');
  const [open, setOpen] = useState(false); // products dropdown (desktop)
  const [menu, setMenu] = useState(false); // full menu (mobile)
  const closeTimer = useRef<number | undefined>(undefined);

  /**
   * Suppresses the crossfade until after the first measurement.
   *
   * A page restored mid-scroll still starts at 'film' and is corrected a frame
   * later. That correction should be instant — animating it is the same flash
   * in a different place.
   */
  const [ready, setReady] = useState(false);

  /**
   * Which state the bar is in.
   *
   * The hero is bottom-aligned, so scrolling drives its headline and lede
   * straight up underneath the navigation. With nothing between them the two
   * sets of type overlap and read as one tangled block — ivory links sitting
   * on an ivory headline. That is the collision this middle state exists to
   * prevent.
   *
   * The bar is still completely absent at rest, which is the point of the
   * treatment: at the top of the page the links float on the footage with no
   * panel behind them. The veil only appears once the reader has actually
   * started moving, when there is something to separate.
   *
   * The switch to the solid bar is driven by the hero's own bottom edge rather
   * than a scroll distance, because what matters is whether the film is still
   * behind the bar — a fixed threshold flipped it to ivory after one wheel
   * click while the footage still filled the screen.
   *
   * A missed event here is not cosmetic: over the film the links are ivory on
   * nothing, so if the page reaches an ivory section while the bar still thinks
   * it is over the hero, the navigation becomes ivory on ivory — invisible.
   * Scroll events can be coalesced or dropped, so a cheap 250ms backstop reads
   * the geometry directly. Same reasoning as the failsafe in `useReveal`.
   */
  useEffect(() => {
    const NAV_H = 72; // h-[4.5rem]
    /* Roughly two or three wheel clicks: past an accidental nudge, and well
       before the hero's text has climbed anywhere near the bar. */
    const VEIL_AT = 200;

    const sync = () => {
      /* Hidden until the hero's own button row has gone behind the bar. On a
         route with no hero row there is nothing to defer to, so it shows. */
      const heroCta = document.getElementById('hero-cta');
      setShowCta(!heroCta || heroCta.getBoundingClientRect().bottom <= NAV_H);

      const hero = document.getElementById('top');
      // Routes without a film hero are solid from the first paint.
      if (!hero) {
        setState('solid');
        return;
      }

      /* The top of the page is always the bare treatment, whatever the
         viewport. On a short screen the headline can already sit above the bar
         at rest, and without this it would load solid and lose the film. */
      if (window.scrollY <= VEIL_AT) {
        setState('film');
        return;
      }

      /* Solid at the moment the hero's type reaches the bar. The veil is
         enough while the two are still apart, but nothing thin enough to be
         called a veil will hold hero type off the navigation once they
         actually meet, so the bar takes a ground of its own before they touch.

         This measures the whole copy block, not the headline. The headline is
         what the eye notices, but the eyebrow above it arrives first, and on a
         narrow screen it was crossing into the bar while the veil was still
         the active state. */
      const copy = document.getElementById('hero-copy');
      const copyReached = copy ? copy.getBoundingClientRect().top <= NAV_H : false;
      const heroPassed = hero.getBoundingClientRect().bottom <= NAV_H;

      setState(copyReached || heroPassed ? 'solid' : 'veil');
    };
    sync();
    setReady(true);
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
  /* The mobile sheet is ivory, so an open menu forces the solid treatment
     whatever the scroll position. */
  const mode: NavState = pathname === '/' && !menu ? state : 'solid';

  /* Both hero states put ivory type on the footage; only the ground differs. */
  const onFilm = mode !== 'solid';

  const blur = mode === 'film' ? 'none' : mode === 'veil' ? 'blur(4px)' : 'blur(10px)';

  // A whisper of shadow — enough to hold an edge against a bright sky frame,
  // not enough to read as a drop shadow.
  const heroTextShadow = onFilm ? '0 1px 10px rgba(0,0,0,0.18)' : undefined;

  /* The site's own ivory rather than a generic white — the same ground colour
     every other section uses, so the nav belongs to this brand and not to the
     video player. */
  const linkColour = onFilm ? 'text-[color:var(--color-ivory)]/90' : 'text-on-light-muted';
  const linkActive = onFilm ? 'text-[color:var(--color-ivory)]' : 'text-ink';
  /* Whole class names only — Tailwind cannot see a `hover:` prefix that is
     assembled inside a template literal at runtime. */
  const linkHover = onFilm
    ? 'hover:text-[color:var(--color-ivory)]'
    : 'hover:text-ink';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b ${
        ready
          ? 'transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
          : ''
      }`}
      style={{
        /* At rest: nothing at all, so the links read as part of the film.
           Past the hero: the normal ivory bar.

           Scrolling, in between: as close to nothing as still works. The
           separation here is done almost entirely by the blur, not by the
           tint — blur has no colour and no surface, so it reads as the footage
           going soft behind the type rather than as a panel laid over it. The
           white is down to 3%, which is below the threshold where it registers
           as a material at all; it is there only to keep the ivory links off
           an equally bright frame. Taking the tint to zero is possible if this
           is still too present. */
        background:
          mode === 'film'
            ? 'transparent'
            : mode === 'veil'
              ? 'rgba(255,255,255,0.03)'
              : 'rgba(248,245,238,0.95)',
        borderColor:
          mode === 'film'
            ? 'transparent'
            : mode === 'veil'
              ? 'rgba(255,255,255,0.08)'
              : 'var(--color-rule)',
        /* The veil's blur is deliberately weaker than the solid bar's. Behind
           the solid bar sits 95% opaque ivory, where the blur is barely doing
           anything anyway; behind the veil it is the only thing separating two
           layers of type, but at 10px it was soft enough to read as a material.
           4px still breaks up the hero's letterforms without looking like
           frosted glass. */
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
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
            onFilm ? 'text-[color:var(--color-ivory)]' : 'text-ink'
          }`}
          style={{ textShadow: heroTextShadow }}
          aria-label={`${brand.name} — home`}
        >
          <span className="font-display text-[clamp(1.25rem,1.7vw,1.6rem)] font-light leading-none tracking-[0.06em]">
            {brand.wordmark}
          </span>
          <span
            className={`mt-1 hidden whitespace-nowrap font-mono text-[0.5rem] uppercase leading-none tracking-[0.2em] xl:block transition-opacity duration-500 ${
              onFilm ? 'opacity-70' : 'opacity-55'
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
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap py-2 font-mono text-[0.75rem] uppercase tracking-[0.2em] transition-colors duration-500 ${linkColour} ${linkHover}`}
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
                className={`shrink-0 whitespace-nowrap py-2 font-mono text-[0.75rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                  pathname === n.href ? linkActive : linkColour
                } ${linkHover}`}
                style={{ textShadow: heroTextShadow }}
              >
                {n.label}
              </Link>
            ))}

          {/* Suppressed while the hero's own REQUEST A QUOTE is on screen —
              two of them at once is just repetition. It fades in at the
              moment that one goes behind the bar, in the same position. */}
          <Link
            href="/request-a-quote"
            aria-hidden={!showCta}
            tabIndex={showCta ? 0 : -1}
            className="btn btn-solid !px-6 !py-3 !text-[0.6875rem] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: showCta ? 1 : 0,
              transform: showCta ? 'none' : 'translateY(-0.4rem)',
              pointerEvents: showCta ? 'auto' : 'none',
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
                background: onFilm ? 'var(--color-ivory)' : 'var(--color-ink)',
                boxShadow: onFilm ? '0 1px 6px rgba(0,0,0,0.22)' : undefined,
              }}
            />
            <span
              className="absolute left-0 block h-px w-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                top: menu ? '6px' : '12px',
                transform: menu ? 'rotate(-45deg)' : 'none',
                background: onFilm ? 'var(--color-ivory)' : 'var(--color-ink)',
                boxShadow: onFilm ? '0 1px 6px rgba(0,0,0,0.22)' : undefined,
              }}
            />
          </span>
        </button>
      </div>

      {/* ---------- Mobile sheet ---------- */}
      <div
        id="mobile-menu"
        className="overflow-hidden border-t border-rule bg-ivory transition-[max-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden"
        style={{
          maxHeight: menu ? 'calc(100svh - 4.5rem)' : '0',
          /* Collapsing this panel sets its content height to zero, but the
             border is outside the content box and is still painted — a
             hairline the full width of the screen, directly under a
             navigation that is supposed to have no bar at all over the film.

             Making it `transparent` does not remove it. Backgrounds paint
             under the border box (`background-clip: border-box` is the
             default), so this panel's own ivory showed straight through the
             transparent border and the line simply changed colour. The width
             has to go to zero, which is the only thing that stops a border
             occupying space. */
          borderTopWidth: menu ? '1px' : '0px',
        }}
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
