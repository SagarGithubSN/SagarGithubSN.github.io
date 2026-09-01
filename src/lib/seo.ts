import { brand, contact, materials } from '@/lib/content';

/**
 * Structured data.
 *
 * Everything below is built from `content.ts`, which is the file that carries
 * the "nothing invented" rule. That matters more than usual for JSON-LD:
 * fabricated `aggregateRating`, `award` or `numberOfEmployees` fields are the
 * easiest kind of lie to ship and the hardest for a client to notice.
 *
 * Absent here, deliberately: sameAs (no verified social profiles), foundingDate
 * (2021 is unconfirmed under the Captain Exim name), and any review or rating.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://captainexim.com';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: SITE_URL,
    description: brand.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No 3747/1, New No M-3, 11th Cross, Thilak Nagar',
      addressLocality: brand.city,
      addressRegion: brand.region,
      postalCode: '570001',
      addressCountry: 'IN',
    },
    telephone: contact.phone,
    email: contact.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contact.phone,
        email: contact.email,
        contactType: 'sales',
        areaServed: 'Worldwide',
        availableLanguage: ['en', 'kn'],
      },
    ],
    location: {
      '@type': 'Place',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: contact.coords.lat,
        longitude: contact.coords.lon,
      },
    },
    knowsAbout: materials.map((m) => m.name),
  };
}

export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/**
 * Product-category structured data.
 *
 * Modelled as `ProductGroup` without `offers`: there is no published price, no
 * confirmed MOQ and no stock position, so claiming an Offer would be false.
 */
export function productJsonLd(id: string) {
  const m = materials.find((x) => x.id === id);
  if (!m) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name: m.name,
    description: m.lede,
    image: `${SITE_URL}${m.image}`,
    url: `${SITE_URL}/products/${m.id}`,
    brand: { '@type': 'Brand', name: brand.name },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
  };
}
