import { z } from 'zod';

import { countries } from '@/lib/countries';
import { allUnits, materials, purposes } from '@/lib/content';

/**
 * One schema, used by the browser for inline validation and by the API route as
 * the authoritative check.
 *
 * The server never trusts the client's copy: `parse` runs again inside the
 * route handler, and everything stored or emailed comes from the parsed result,
 * not from the raw body.
 */

const productIds = materials.map((m) => m.id);

export const enquirySchema = z.object({
  /** A category id, or 'general' from the standalone quote page. */
  product: z
    .string()
    .refine((v) => v === 'general' || productIds.includes(v), 'Choose a product category'),

  quantity: z.coerce
    .number({ message: 'Enter a quantity' })
    .positive('Quantity must be greater than zero')
    .max(1_000_000_000, 'Enter a realistic quantity'),

  unit: z.enum(allUnits, { message: 'Choose a unit' }),

  destination: z.string().refine((v) => countries.includes(v), 'Choose a destination country'),

  purpose: z.enum(purposes).optional(),

  company: z.string().trim().min(2, 'Enter your company name').max(160),

  contactPerson: z.string().trim().min(2, 'Enter a contact name').max(160),

  email: z.string().trim().toLowerCase().email('Enter a valid business email').max(200),

  phone: z
    .string()
    .trim()
    .min(6, 'Enter a phone or WhatsApp number')
    .max(40)
    .regex(/^[+()\d\s.-]+$/, 'Use digits, spaces and + ( ) - only'),

  requirement: z
    .string()
    .trim()
    .min(10, 'Tell us a little more about the requirement')
    .max(4000, 'Please keep this under 4000 characters'),

  /** Which page the enquiry came from. Useful for attribution, not user input. */
  sourcePage: z.string().max(300).optional(),

  /**
   * Honeypot. Real users never see this field, so anything in it is a bot.
   * Named `website` because that is what naive scrapers look for and fill.
   */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Units that make sense for a given category, per the brief's §52. */
export function unitsForProduct(productId: string): readonly string[] {
  const m = materials.find((x) => x.id === productId);
  return m ? m.units : allUnits;
}
