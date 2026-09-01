'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { hero } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * The opening: a full-bleed cinematic film.
 *
 * The footage runs plantation -> container ship -> cargo aircraft, which is
 * literally "From India. To the world." — so the video carries the headline
 * rather than decorating it, and the type stays out of its way.
 *
 * BRIGHTNESS. There is no full-frame scrim and no glass sheet. The support is
 * directional — see `.hero-scrim`: it lifts the left edge and the bottom, where
 * the type sits, and leaves the right side and the top of the frame alone. The
 * ocean, the sky and the canopy keep their colour.
 *
 * THE CROP. The source carries a generator watermark in the bottom-right
 * corner. The video is scaled slightly and biased up-left so that corner falls
 * outside the frame — see `HERO_CROP`. It is a crop, not a cover-up: nothing is
 * painted over. The poster frame was cut with the identical crop so the still
 * and the film match exactly.
 *
 * REDUCED MOTION. `prefers-reduced-motion` gets the poster as a still image and
 * the <video> is never mounted, so no bytes are spent on a film that will not
 * play.
 */

/**
 * Scale + offset that pushes the source's bottom-right corner out of frame.
 *
 * The translate is POSITIVE: moving the content down-right carries the
 * bottom-right watermark past the container edge. A negative offset does the
 * opposite — it drags that corner back toward the middle of the frame.
 *
 * scale(1.16) alone hides ~6.9% on every side; +2.5% biases that to ~9.4% on
 * the right and bottom, which is where the mark sits.
 */
const HERO_CROP = 'scale(1.16) translate(2.5%, 2.5%)';

export function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  /**
   * Start playback without depending on a media event arriving after React has
   * attached its handlers. `loadeddata` and `canplay` can both fire before
   * hydration on a warm cache, which would otherwise leave the video mounted,
   * loaded, and invisible behind an opacity of 0.
   *
   * So readiness is read from `readyState` directly, re-checked briefly, and
   * play is retried on the first user gesture if the autoplay policy refused.
   */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.muted = true;

    let cancelled = false;
    const markReady = () => {
      if (!cancelled && v.readyState >= 2) setReady(true);
    };
    const attempt = () => {
      markReady();
      v.play().catch(() => {
        /* Autoplay refused. The poster stays, which is a fine outcome. */
      });
    };

    attempt();
    v.addEventListener('loadeddata', attempt);
    v.addEventListener('canplay', attempt);

    // Covers the case where every event fired before hydration.
    const poll = window.setInterval(markReady, 250);
    const stopPolling = window.setTimeout(() => window.clearInterval(poll), 6000);

    // Last resort: a real gesture always satisfies the autoplay policy.
    const onGesture = () => attempt();
    window.addEventListener('pointerdown', onGesture, { once: true });

    return () => {
      cancelled = true;
      v.removeEventListener('loadeddata', attempt);
      v.removeEventListener('canplay', attempt);
      window.removeEventListener('pointerdown', onGesture);
      window.clearInterval(poll);
      window.clearTimeout(stopPolling);
    };
  }, [reduced]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest"
    >
      {/* ---------- Film ---------- */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Poster sits underneath always: it covers the first frames while the
            video buffers, and it is the whole picture under reduced motion.
            Because it fills the same box, there is no layout shift either way. */}
        <Image
          src={hero.poster}
          alt="Aerial view over a coconut plantation in coastal India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />

        {!reduced ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[50%_45%] transition-opacity duration-1000"
            style={{ transform: HERO_CROP, opacity: ready ? 1 : 0 }}
            src={hero.video}
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setReady(true)}
          />
        ) : null}
      </div>

      {/* Gradient only where the type sits — see `.hero-scrim`. The top of the
          frame is completely untouched on every breakpoint. */}
      <div className="hero-scrim pointer-events-none absolute inset-0" />

      {/* ---------- Type ---------- */}
      <div className="shell relative z-10 pb-[clamp(3rem,9vh,6rem)] pt-40">
        <div className="max-w-[46rem]">
          <Reveal>
            <p
              className="label mb-7 text-[color:rgba(255,253,248,0.9)]"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.55), 0 2px 18px rgba(0,0,0,0.45)' }}
            >
              {hero.eyebrow}
            </p>
          </Reveal>

          <RevealLines
            level={1}
            stagger={130}
            lines={[
              hero.headline[0],
              <span key="world" className="italic">
                {hero.headline[1]}
              </span>,
            ]}
            className="font-display text-[length:var(--text-hero)] font-light text-[color:var(--color-warm-white)] [text-shadow:0_1px_4px_rgba(0,0,0,0.35),0_3px_26px_rgba(0,0,0,0.4)]"
          />

          <Reveal delay={400}>
            <p
              className="mt-7 max-w-[44ch] text-[length:var(--text-lede)] leading-relaxed text-[color:rgba(255,253,248,0.88)]"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 18px rgba(0,0,0,0.45)' }}
            >
              {hero.lede}
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={hero.primary.href} variant="ivory">
                {hero.primary.label}
              </Button>
              <Button href={hero.secondary.href} variant="dark">
                {hero.secondary.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
