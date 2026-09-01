'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepOptions {
  steps: number;
  /** When false the hook does nothing — mobile and reduced-motion. */
  enabled: boolean;
  /** Minimum gap between advances, ms. Should exceed the visual transition. */
  cooldown?: number;
}

/**
 * One gesture, one stage.
 *
 * The section used to map a tall scroll track continuously onto progress, so a
 * single stage took several wheel clicks and the boundaries landed wherever the
 * arithmetic put them. This holds the section still and advances exactly one
 * stage per gesture.
 *
 * ENGAGEMENT IS MEASURED SYNCHRONOUSLY, in the wheel handler itself, from
 * `getBoundingClientRect`. An IntersectionObserver was tried first and is the
 * wrong instrument here: it reports asynchronously, so the first gestures
 * arrive before it has said "engaged", the page scrolls under them, and by the
 * third stage the section has drifted far enough out of frame that the observer
 * disengages and the remaining stages are skipped entirely. Reading geometry at
 * event time cannot lag behind the thing it is gating.
 *
 * THE PAGE IS HELD STILL while the section is engaged — every consumed gesture
 * is preventDefault'd and any residual offset is corrected back to top:0, so
 * the stage cannot creep upward one wheel click at a time.
 *
 * The part that keeps this from being the scroll-hijacking the brief warns
 * against is the release rule: a gesture is only taken when there is a next
 * stage to go to. Scrolling up on the first stage, or down on the last, is
 * never swallowed — so the section can always be left, in either direction,
 * with a single ordinary gesture.
 *
 * A trackpad emits a burst of wheel events per physical flick, so a cooldown
 * collapses each burst into one advance. Touch is read as a swipe. Keyboard
 * users get arrows and page keys, and the stage labels are buttons, so none of
 * this is wheel-only.
 */
export function useStepSequence<T extends HTMLElement = HTMLElement>({
  steps,
  enabled,
  cooldown = 620,
}: StepOptions) {
  const ref = useRef<T | null>(null);
  const [step, setStepState] = useState(0);

  const stepRef = useRef(0);
  const lockedUntil = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(steps - 1, next));
      stepRef.current = clamped;
      setStepState(clamped);
    },
    [steps],
  );

  useEffect(() => {
    if (!enabled) return;

    /** Section geometry, or null when it is not the screen right now. */
    const framed = () => {
      const el = ref.current;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      // Generous enough to catch the section as it arrives, tight enough that
      // a neighbouring section is never mistaken for this one.
      const slack = window.innerHeight * 0.15;
      const inView = r.top <= slack && r.bottom >= window.innerHeight - slack;
      return inView ? r : null;
    };

    /** Pull the stage back to the top of the viewport. */
    const align = (top: number) => {
      if (Math.abs(top) < 1) return;
      window.scrollTo({ top: window.scrollY + top, behavior: 'instant' as ScrollBehavior });
    };

    /**
     * Scroll to `target` under our own control.
     *
     * Neither of the browser's own routes survives here. `behavior:'smooth'` is
     * cancelled partway by the section's snap point and ends back where it
     * started — measured, twice — and turning snapping off for the duration
     * only moves the problem, because the restore lands mid-animation and pulls
     * it back again. Driving the frames means the scroll finishes before
     * snapping is allowed to have an opinion.
     */
    const tween = (target: number, ms: number) => {
      const root = document.documentElement;
      const previous = root.style.scrollSnapType;
      root.style.scrollSnapType = 'none';

      const from = window.scrollY;
      const delta = target - from;
      const t0 = performance.now();
      let settled = false;

      const settle = (top: number) => {
        if (settled) return;
        settled = true;
        window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
        root.style.scrollSnapType = previous;
      };

      const frame = (t: number) => {
        if (settled) return;
        const p = Math.min(1, (t - t0) / ms);
        // easeInOutQuad — matches the settle of the stage transitions.
        const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
        if (p < 1) {
          window.scrollTo({
            top: from + delta * e,
            behavior: 'instant' as ScrollBehavior,
          });
          requestAnimationFrame(frame);
        } else {
          settle(target);
        }
      };
      requestAnimationFrame(frame);

      // Animation frames stop in a hidden or heavily throttled tab, which would
      // otherwise leave the reader parked on the last stage with snapping
      // switched off. Timers keep running, so this guarantees the scroll
      // completes and snapping is handed back either way.
      window.setTimeout(() => settle(target), ms + 300);
    };

    /**
     * Returns true when the gesture belongs to the sequence and the caller
     * should suppress the browser's own scrolling.
     */
    const handle = (dir: 1 | -1) => {
      const r = framed();
      if (!r) return false;

      // Mid-burst, or mid-exit. Consume it: the page stays where we put it.
      if (Date.now() < lockedUntil.current) return true;

      const next = stepRef.current + dir;

      if (next < 0 || next > steps - 1) {
        // Leaving. This has to be driven rather than handed back to the
        // browser: the section declares a snap point, so one released wheel
        // click moves ~100px and is then pulled straight back onto the stage
        // the reader has just finished — which feels like being trapped. One
        // gesture past the last stage should leave, so it does exactly that.
        const target =
          dir > 0
            ? window.scrollY + r.bottom + 1
            : window.scrollY + r.top - window.innerHeight - 1;

        tween(Math.max(0, target), 520);
        lockedUntil.current = Date.now() + 620;
        return true;
      }

      // Arriving slightly off-frame: spend this gesture settling the stage
      // into place rather than advancing past a half-visible one.
      if (Math.abs(r.top) > 8) {
        align(r.top);
        lockedUntil.current = Date.now() + cooldown;
        return true;
      }

      align(r.top);
      lockedUntil.current = Date.now() + cooldown;
      goTo(next);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 4) return; // inertial dribble
      if (handle(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - (e.touches[0]?.clientY ?? touchY);
      if (Math.abs(dy) < 40) return; // a swipe, not a jitter
      touchY = e.touches[0]?.clientY ?? null;
      if (handle(dy > 0 ? 1 : -1) && e.cancelable) e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      const down = e.key === 'ArrowDown' || e.key === 'PageDown';
      const up = e.key === 'ArrowUp' || e.key === 'PageUp';
      if (!down && !up) return;
      if (handle(down ? 1 : -1)) e.preventDefault();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [enabled, steps, cooldown, goTo]);

  return { ref, step, goTo };
}
