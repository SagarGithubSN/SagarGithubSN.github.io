import { philosophy } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';

/**
 * 03 — Sarve Jana Sukhino Bhavantu.
 *
 * The one line the previous business displayed most prominently, and the brief
 * is right that it must survive. It gets a dedicated moment on a soft sage
 * ground: Kannada first at display size, then transliteration, then meaning.
 *
 * Deliberately the calmest section on the page — a single fade, no parallax, no
 * scrub. Treated as a business philosophy, not a devotional claim.
 */
export function Philosophy() {
  return (
    <section
      className="band"
      style={{ background: 'var(--color-sage-wash)' }}
      aria-labelledby="philosophy-heading"
    >
      <div className="shell-narrow text-center">
        <Reveal>
          <p className="label justify-center text-forest-2 before:hidden">Our philosophy</p>
        </Reveal>

        <Reveal delay={140}>
          <p
            id="philosophy-heading"
            lang="kn"
            className="kannada mt-9 font-display text-[clamp(2rem,5.4vw,4rem)] font-light text-forest"
          >
            {philosophy.kannada}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-7 font-display text-[clamp(1.25rem,2.3vw,1.75rem)] font-light italic text-forest-2">
            {philosophy.transliteration}
          </p>
        </Reveal>

        <Reveal delay={420}>
          <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-forest-2/80">
            {philosophy.meaning}
          </p>
        </Reveal>

        <Reveal delay={560}>
          <p className="mx-auto mt-10 max-w-[54ch] text-[length:var(--text-lede)] leading-relaxed text-ink/80">
            {philosophy.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
