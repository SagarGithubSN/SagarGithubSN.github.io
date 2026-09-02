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
 * THE CROP. The source carried a generator watermark in the bottom-right
 * corner. It is cropped out of the file itself at encode time rather than
 * hidden by CSS, so nothing is painted over and nothing is magnified to push
 * it out of view. The poster is cut from the encoded film, so the still and
 * the film are the same pixels.
 *
 * REDUCED MOTION. `prefers-reduced-motion` gets the poster as a still image and
 * the <video> is never mounted, so no bytes are spent on a film that will not
 * play.
 */

/*
 * The watermark is gone from the file itself.
 *
 * A transform used to sit here, magnifying the film 16% and sliding it up so
 * the generator's mark fell outside the viewport. That was always a workaround
 * for not having a transcoder: it cost real sharpness on an already-modest
 * 720p source, and it made the browser decode 1280x720 in order to display
 * about 1102x620 of it.
 *
 * The film is now cropped to exactly that window at encode time, so there is
 * nothing to hide and nothing to magnify. Same framing, no upscaling.
 */

/**
 * Lifts the film out of its own shadows.
 *
 * The footage is dark: measured across three frames, 37% / 22% / 9% of pixels
 * sit below a luminance of 60, and the foreground foliage reads as near-black
 * on a bright screen.
 *
 * `brightness` alone is the obvious lever and the wrong one — it is a straight
 * multiply, so at 1.10 the sky is already clipping across 3% of the frame and
 * the highlights go flat white. Pairing it with a slight contrast reduction
 * pulls the top end back down while the multiply lifts the bottom, which is
 * where the picture actually needed help. At these values the dark fraction
 * drops by about four points on every frame tested and *no* channel clips
 * anywhere — it even recovers the small amount of clipping present in the
 * source. Saturation compensates for the flattening that lower contrast costs.
 *
 * The poster carries the identical grade, or the still and the film would not
 * match when the video fades in over it.
 */
const HERO_GRADE = 'brightness(1.18) contrast(0.92) saturate(1.1)';

export function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  /**
   * Decides whether to fetch the film at all.
   *
   * Only Data Saver. That is a preference the visitor has actually expressed,
   * so honouring it is unambiguous.
   *
   * `effectiveType` was tried as a second signal and dropped. It is a rolling
   * estimate, and in testing the same browser on the same connection reported
   * `4g` and `slow-2g` minutes apart — gating on that would have silently
   * denied the film to people whose connection was fine, which is a worse
   * failure than a slow load. The weight argument that justified it has also
   * mostly gone: the film is 5.9 MB now, not 26 MB, and the readiness gate
   * below already guarantees a half-buffered film is never shown.
   */
  useEffect(() => {
    if (reduced) return;
    type Conn = { saveData?: boolean };
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    if (!conn?.saveData) setAllowVideo(true);
  }, [reduced]);

  /**
   * Start playback, and only reveal the film once it can actually sustain it.
   *
   * This used to reveal at `readyState >= 2`. That constant means "the current
   * frame is available", not "playback can continue" — so on any connection
   * that could not keep ahead of a 14 Mbit/s file, the video faded in and then
   * immediately ran the buffer dry, leaving a frozen frame on screen. It looked
   * broken, and it was: the condition was answering a different question from
   * the one being asked.
   *
   * The bar is now `HAVE_ENOUGH_DATA`, the browser's own estimate that it can
   * play through without stalling, and a stall after that fades the still back
   * over the top rather than leaving the picture stuck. On a slow line the
   * outcome is simply the poster, which is a good photograph and an honest
   * result.
   *
   * Readiness is still read from `readyState` directly and re-polled, because
   * `loadeddata` and `canplay` can both fire before hydration on a warm cache,
   * which would otherwise leave the video loaded and invisible at opacity 0.
   */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced || !allowVideo) return;
    v.muted = true;

    let cancelled = false;
    const markReady = () => {
      if (!cancelled && v.readyState >= 4) setReady(true);
    };
    const attempt = () => {
      markReady();
      v.play().catch(() => {
        /* Autoplay refused. The poster stays, which is a fine outcome. */
      });
    };
    // Buffer underrun: hand the frame back to the still until it recovers.
    const onStall = () => {
      if (!cancelled) setReady(false);
    };

    attempt();
    v.addEventListener('loadeddata', attempt);
    v.addEventListener('canplay', attempt);
    v.addEventListener('canplaythrough', attempt);
    v.addEventListener('playing', markReady);
    v.addEventListener('waiting', onStall);
    v.addEventListener('stalled', onStall);

    // Covers the case where every event fired before hydration.
    const poll = window.setInterval(markReady, 250);
    const stopPolling = window.setTimeout(() => window.clearInterval(poll), 20000);

    // Last resort: a real gesture always satisfies the autoplay policy.
    const onGesture = () => attempt();
    window.addEventListener('pointerdown', onGesture, { once: true });

    return () => {
      cancelled = true;
      v.removeEventListener('loadeddata', attempt);
      v.removeEventListener('canplay', attempt);
      v.removeEventListener('canplaythrough', attempt);
      v.removeEventListener('playing', markReady);
      v.removeEventListener('waiting', onStall);
      v.removeEventListener('stalled', onStall);
      window.removeEventListener('pointerdown', onGesture);
      window.clearInterval(poll);
      window.clearTimeout(stopPolling);
    };
  }, [reduced, allowVideo]);

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
          style={{ filter: HERO_GRADE }}
        />

        {!reduced && allowVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[50%_45%] transition-opacity duration-1000"
            style={{ filter: HERO_GRADE, opacity: ready ? 1 : 0 }}
            src={hero.video}
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : null}
      </div>

      {/* Gradient only where the type sits — see `.hero-scrim`. The top of the
          frame is completely untouched on every breakpoint. */}
      <div className="hero-scrim pointer-events-none absolute inset-0" />

      {/* ---------- Type ---------- */}
      <div className="shell relative z-10 pb-[clamp(3rem,9vh,6rem)] pt-40">
        {/* The navigation goes solid when the top of this block reaches the
            bar, so no hero type ever passes behind a transparent nav. It is
            the block rather than the headline because the eyebrow sits above
            the headline and therefore arrives first — only ~20px earlier, but
            on a phone that 20px is the difference between a clean handover and
            two sets of type overlapping. See Nav.tsx. */}
        <div id="hero-copy" className="max-w-[46rem]">
          <Reveal>
            <p
              className="label mb-7 text-[color:rgba(255,253,248,0.9)]"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.55), 0 2px 18px rgba(0,0,0,0.45)' }}
            >
              {hero.eyebrow}
            </p>
          </Reveal>

          <div>
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
          </div>

          <Reveal delay={400}>
            <p
              className="mt-7 max-w-[44ch] text-[length:var(--text-lede)] leading-relaxed text-[color:rgba(255,253,248,0.88)]"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 18px rgba(0,0,0,0.45)' }}
            >
              {hero.lede}
            </p>
          </Reveal>

          {/* The navigation watches this row too: its own quote button stays
              hidden while these are on screen, and takes over the moment they
              leave. One call to action at a time. See Nav.tsx. */}
          <Reveal delay={520}>
            <div id="hero-cta" className="mt-9 flex flex-wrap gap-3">
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
