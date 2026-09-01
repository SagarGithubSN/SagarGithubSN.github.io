import { NextResponse } from 'next/server';

import { enquirySchema } from '@/lib/enquiry-schema';
import { createEnquiry } from '@/server/db';
import { sendEnquiryMail } from '@/server/mail';
import { clientIp, rateLimit } from '@/server/rate-limit';

/**
 * POST /api/enquiry
 *
 * Order of operations matters here:
 *
 *   rate limit -> honeypot -> schema -> STORE -> email
 *
 * Storage happens before mail, and a mail failure does not fail the request.
 * The previous site's single worst defect was that leads could vanish silently
 * (forms posted to a .com mailbox while the site displayed a .in address); the
 * fix is to make persistence the thing that defines success.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  // 1. Rate limit — five per ten minutes per IP.
  const limit = rateLimit(`enquiry:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Too many enquiries from this connection. Please try again shortly, or email us.',
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  // 2. Parse the body defensively.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  // 3. Validate. This is the authoritative check — the client's copy of the
  //    schema is a convenience, never a guarantee.
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    // The honeypot lives in the schema as `website: max(0)`. A bot that filled
    // it gets a 200 with a plausible reference so it does not learn anything,
    // but nothing is stored or sent.
    const honeypotTripped = parsed.error.issues.some((i) => i.path[0] === 'website');
    if (honeypotTripped) {
      return NextResponse.json({ ok: true, reference: 'CE-0000-0000' }, { status: 200 });
    }

    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      fieldErrors[key] ??= issue.message;
    }

    return NextResponse.json(
      { ok: false, error: 'Please check the highlighted fields.', fieldErrors },
      { status: 422 },
    );
  }

  const enquiry = parsed.data;

  // 4. Store. If this throws, the request genuinely failed.
  let reference: string;
  try {
    ({ reference } = createEnquiry(enquiry, { ip }));
  } catch (err) {
    console.error('[enquiry] storage failed:', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'We could not record your enquiry. Please email or WhatsApp us instead.',
      },
      { status: 500 },
    );
  }

  // 5. Email. Best effort, and never the reason a buyer sees an error.
  const mail = await sendEnquiryMail(enquiry, reference);

  return NextResponse.json({ ok: true, reference, mail }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed.' }, { status: 405 });
}
