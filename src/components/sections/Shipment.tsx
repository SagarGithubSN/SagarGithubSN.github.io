import { shipment } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { ProcessSequence } from '@/components/ui/ProcessSequence';

/**
 * 09 — From source to shipment.
 *
 * This was a live R3F scene: cartons, a pallet and a container, lit and
 * choreographed in WebGL. It was removed. Hand-built low-poly geometry against
 * real agricultural photography looked like what it was — a diagram pretending
 * to be a photograph — and it sat in the middle of a page whose whole argument
 * is "we can show you the actual thing".
 *
 * The replacement is the site's own device: real photographs scrubbed on scroll,
 * the same treatment the areca sequence uses. That also means the desktop and
 * mobile experiences are finally the same content rather than two different
 * ones, and the section costs a few images instead of three JS libraries.
 *
 * This is the reference analysis applied honestly (REFERENCE_VIDEO_LEARNINGS.md
 * §B): the reference's premium moments are pre-rendered frames played back on
 * scroll, not runtime geometry. Photography is our equivalent of a pre-render.
 *
 * If a rendered film is commissioned later, it drops in here as a scrubbed
 * <video> behind the same beat copy — the structure does not need to change.
 */
export function Shipment() {
  const beats = shipment.scenes.map((s) => ({
    n: s.n,
    label: s.title,
    heading: s.title,
    body: s.body,
    image: s.image,
    alt: s.alt,
  }));

  return (
    <section id="shipment" className="bg-ivory">
      <div className="shell pt-[clamp(4.5rem,11vh,8.5rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{shipment.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={shipment.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
          </div>
          <Reveal delay={140} className="lg:pt-3">
            <p className="max-w-[46ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
              {shipment.intro}
            </p>
          </Reveal>
        </div>
      </div>

      <ProcessSequence beats={beats} ground="bg-ivory" />

      <div className="h-[clamp(2rem,5vh,3.5rem)]" />
    </section>
  );
}
