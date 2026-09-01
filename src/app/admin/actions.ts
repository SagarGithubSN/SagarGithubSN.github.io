'use server';

import { revalidatePath } from 'next/cache';

import { STATUSES, updateEnquiry, type EnquiryStatus } from '@/server/db';

/**
 * Update one enquiry's pipeline status or internal note.
 *
 * The route is behind Basic auth in middleware, but a server action is a public
 * endpoint in its own right, so the status value is re-validated here against
 * the allow-list rather than trusted from the form.
 */
export async function updateEnquiryAction(formData: FormData) {
  const reference = String(formData.get('reference') ?? '').trim();
  if (!reference) return;

  const rawStatus = String(formData.get('status') ?? '').trim();
  const status = STATUSES.includes(rawStatus as EnquiryStatus)
    ? (rawStatus as EnquiryStatus)
    : undefined;

  const rawNotes = formData.get('notes');
  const notes = rawNotes === null ? undefined : String(rawNotes).slice(0, 4000);

  updateEnquiry(reference, { status, notes });
  revalidatePath('/admin');
}
