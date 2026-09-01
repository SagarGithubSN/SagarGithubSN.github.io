import type { Metadata, Viewport } from 'next';
import { Newsreader, Schibsted_Grotesk, JetBrains_Mono } from 'next/font/google';

import './globals.css';

import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { organizationJsonLd, SITE_URL } from '@/lib/seo';

/**
 * Fonts are self-hosted at build time by next/font — no render-blocking request
 * to Google, and no layout shift from a late swap.
 *
 * Newsreader carries the display voice (a contemporary serif with a real
 * italic), Schibsted Grotesk the interface, JetBrains Mono the trade labels and
 * specification figures. Two voices plus one utility face, as the brief asks.
 */
const display = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
});

const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-schibsted',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Captain Exim — Agricultural & natural product sourcing from Mysuru, India',
    template: '%s · Captain Exim',
  },
  description:
    'Captain Exim connects international buyers with carefully sourced agricultural and natural products from Mysuru, Karnataka — areca leaf tableware, fresh produce, spices, coconut, cold-pressed oils and FCV tobacco.',
  keywords: [
    'areca leaf products exporter India',
    'areca plate exporter India',
    'Mysore FCV tobacco supplier',
    'agricultural products exporter India',
    'agricultural exporter Karnataka',
    'Indian spices exporter',
    'coconut products exporter India',
    'cold pressed oil exporter India',
  ],
  authors: [{ name: 'Captain Exim' }],
  openGraph: {
    type: 'website',
    siteName: 'Captain Exim',
    locale: 'en_IN',
    title: 'Captain Exim — Sourcing from Mysuru, India',
    description:
      'International sourcing of agricultural and natural products from Mysuru, Karnataka.',
    images: [{ url: '/img/areca-plates.webp', width: 1200, height: 630, alt: 'Captain Exim' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captain Exim — Sourcing from Mysuru, India',
    description:
      'International sourcing of agricultural and natural products from Mysuru, Karnataka.',
    images: ['/img/areca-plates.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#f8f5ee',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:bg-forest focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />

        <script
          type="application/ld+json"
          // Organization data only — every field is verified business
          // information. Nothing aspirational is published here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
