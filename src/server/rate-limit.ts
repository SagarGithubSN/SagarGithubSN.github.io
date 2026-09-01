/**
 * In-memory sliding-window rate limiter.
 *
 * Scope: one Node process. That is honest about what it is — for a single
 * container it is genuinely useful, and for a multi-instance deployment it
 * should be swapped for Redis or the platform's own limiter. It is not the only
 * defence: the schema, the honeypot and the submission-timing check all sit in
 * front of the mailer as well.
 */

interface Window {
  hits: number[];
}

const buckets = new Map<string, Window>();

/** Drop windows that can no longer matter, so the map cannot grow unbounded. */
function sweep(now: number, windowMs: number) {
  for (const [key, w] of buckets) {
    w.hits = w.hits.filter((t) => now - t < windowMs);
    if (w.hits.length === 0) buckets.delete(key);
  }
}

let lastSweep = 0;

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): { ok: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();

  if (now - lastSweep > windowMs) {
    sweep(now, windowMs);
    lastSweep = now;
  }

  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    const oldest = bucket.hits[0];
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  return { ok: true, remaining: limit - bucket.hits.length, retryAfterSeconds: 0 };
}

/** Best-effort client IP from the usual proxy headers. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return headers.get('x-real-ip') ?? headers.get('cf-connecting-ip') ?? 'unknown';
}
