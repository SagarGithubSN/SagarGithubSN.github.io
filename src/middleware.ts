import { NextResponse, type NextRequest } from 'next/server';

/**
 * HTTP Basic auth for /admin.
 *
 * Two deliberate choices:
 *
 *   1. If ADMIN_USER or ADMIN_PASSWORD is unset, the route is **closed**, not
 *      open. A default credential is how internal dashboards end up public.
 *   2. Comparison is constant-time-ish over the whole string, so a wrong
 *      password does not leak its correct prefix through timing.
 *
 * This is appropriate for a single internal user on a small deployment. If more
 * than a couple of people need access, replace it with a real session layer
 * rather than sharing one password.
 */

export const config = { matcher: ['/admin/:path*'] };

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function unauthorized(message = 'Authentication required.') {
  return new NextResponse(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Captain Exim admin", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
}

export function middleware(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    return new NextResponse(
      'Admin access is not configured. Set ADMIN_USER and ADMIN_PASSWORD.',
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const header = request.headers.get('authorization');
  if (!header?.startsWith('Basic ')) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized('Malformed credentials.');
  }

  const index = decoded.indexOf(':');
  if (index < 0) return unauthorized('Malformed credentials.');

  const givenUser = decoded.slice(0, index);
  const givenPass = decoded.slice(index + 1);

  if (!safeEqual(givenUser, user) || !safeEqual(givenPass, password)) {
    return unauthorized('Invalid credentials.');
  }

  return NextResponse.next();
}
