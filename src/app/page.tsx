import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { Philosophy } from '@/components/sections/Philosophy';
import { Materials } from '@/components/sections/Materials';
import { Source } from '@/components/sections/Source';
import { ArecaProcess } from '@/components/sections/ArecaProcess';
import { Oils } from '@/components/sections/Oils';
import { Origin } from '@/components/sections/Origin';
import { Shipment } from '@/components/sections/Shipment';
import { Tobacco } from '@/components/sections/Tobacco';
import { Values } from '@/components/sections/Values';
import { Sustainability } from '@/components/sections/Sustainability';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Credentials } from '@/components/sections/Credentials';
import { Enquiry } from '@/components/sections/Enquiry';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { Wipe } from '@/components/ui/Wipe';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * Homepage.
 *
 * The narrative, and its deliberate tonal rhythm:
 *
 *   01 Hero              ivory      HIGH ENERGY   six products, moving
 *   02 Who we are        ivory      CALM          type, one drifting rail
 *   03 Philosophy        sage wash  EMOTIONAL     the Kannada moment
 *   04 Products          tinted     INTERACTIVE   hover-driven index
 *   05 Sourcing          sand       HUMAN         farmers, Jai Jawan
 *   06 Areca             ivory      VISUAL        scrubbed photography
 *   07 Oils              ivory      CRAFT         line diagram
 *   08 Origin            sand       CALM          locator
 *   09 Source→shipment   ivory      IMMERSIVE     the one 3D block
 *   10 FCV tobacco       sand       TECHNICAL     specifications
 *   11 Values            ivory      HUMAN         editorial list
 *   12 Sustainability    sage wash  EMOTIONAL     fallen material, one tree
 *   13 How we work       ivory      PRACTICAL     six steps
 *   14 Credentials       sand       CREDIBILITY   honest empty state
 *   15 Enquiry           sand       CONVERSION    the form
 *   16 Contact           ivory      CLOSE
 *
 * Grounds alternate but never fight: ivory is the constant, sand is the
 * alternate band, and the sage wash is spent exactly twice — on the two moments
 * that are meant to feel different. Deep ground appears only in the footer.
 *
 * `Wipe` carries the two changes into and out of the philosophy moment, which
 * is the reference's shaped-transition device reinterpreted
 * (REFERENCE_VIDEO_LEARNINGS.md §E.3).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />

      <Wipe from="var(--color-ivory)" to="var(--color-sage-wash)" />
      <Philosophy />
      <Wipe from="var(--color-sage-wash)" to="var(--color-ivory)" flip />

      <Materials />
      <Source />
      <ArecaProcess />
      <Oils />
      <Origin />
      <Shipment />
      <Tobacco />
      <Values />

      <Wipe from="var(--color-ivory)" to="var(--color-sage-wash)" />
      <Sustainability />
      <Wipe from="var(--color-sage-wash)" to="var(--color-ivory)" flip />

      <HowWeWork />
      <Credentials />
      <Enquiry />
      <ContactStrip />
    </>
  );
}
