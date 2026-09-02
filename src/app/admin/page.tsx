import type { Metadata } from 'next';

import { materialById, materials } from '@/lib/content';
import { countByStatus, listEnquiries, STATUSES } from '@/server/db';
import { updateEnquiryAction } from './actions';

export const metadata: Metadata = {
  title: 'Enquiries',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/**
 * Internal enquiry management.
 *
 * Intentionally plain: no charts, no widgets, no theme demo content — the
 * previous admin shipped with the template's sample calendar ("My Event One")
 * still in it. This does the four things the business actually needs: see what
 * came in, filter it, read it, and move it along a pipeline.
 */
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]) as string | undefined;

  const filters = {
    status: one('status'),
    product: one('product'),
    q: one('q'),
  };

  const rows = listEnquiries(filters);
  const counts = countByStatus();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <section className="bg-ivory pt-[7rem]">
      <div className="shell band-tight">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-8">
          <div>
            <p className="label mb-4 text-accent">Internal</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-ink">
              Enquiries
            </h1>
          </div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-on-light-faint">
            {rows.length} shown · {total} total
          </p>
        </div>

        {/* Pipeline summary */}
        <ul className="mt-8 flex flex-wrap gap-2">
          <li>
            <a
              href="/admin"
              className={`border px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors ${
                !filters.status ? 'border-forest bg-forest text-ivory' : 'border-rule text-on-light-muted'
              }`}
            >
              All ({total})
            </a>
          </li>
          {STATUSES.map((s) => (
            <li key={s}>
              <a
                href={`/admin?status=${encodeURIComponent(s)}`}
                className={`border px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors ${
                  filters.status === s
                    ? 'border-forest bg-forest text-ivory'
                    : 'border-rule text-on-light-muted hover:border-rule-strong'
                }`}
              >
                {s} ({counts[s] ?? 0})
              </a>
            </li>
          ))}
        </ul>

        {/* Filters */}
        <form method="get" className="mt-6 flex flex-wrap items-end gap-3">
          {filters.status ? <input type="hidden" name="status" value={filters.status} /> : null}
          <div className="min-w-[16rem] flex-1">
            <label className="field-label" htmlFor="q">
              Search
            </label>
            <input
              id="q"
              name="q"
              defaultValue={filters.q ?? ''}
              placeholder="Company, contact, email or reference"
              className="field"
            />
          </div>
          <div className="min-w-[12rem]">
            <label className="field-label" htmlFor="product">
              Product
            </label>
            <select id="product" name="product" defaultValue={filters.product ?? ''} className="field">
              <option value="">All products</option>
              {materials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
              <option value="general">General</option>
            </select>
          </div>
          <button type="submit" className="btn btn-solid !py-3">
            Filter
          </button>
        </form>

        {/* Results */}
        {rows.length === 0 ? (
          <p className="mt-12 border border-dashed border-rule-strong bg-paper p-8 text-[0.9375rem] text-on-light-muted">
            No enquiries match. If this is unexpected, check that the server can write to the data
            directory - enquiries are also appended to <code>data/enquiries.jsonl</code> as a
            fallback.
          </p>
        ) : (
          <ul className="mt-10 space-y-4">
            {rows.map((r) => (
              <li key={r.reference} className="border border-rule bg-paper p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-mono text-[0.8125rem] text-ink">{r.reference}</span>
                    <span className="font-display text-[1.25rem] font-light text-ink">
                      {r.company}
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-on-light-faint">
                      {r.status}
                    </span>
                  </div>
                  <time
                    dateTime={r.createdAt}
                    className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-on-light-faint"
                  >
                    {new Date(r.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })} IST
                  </time>
                </div>

                <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ['Product', materialById(r.product)?.name ?? 'General enquiry'],
                    ['Quantity', `${r.quantity} ${r.unit}`],
                    ['Destination', r.destination],
                    ['Purpose', r.purpose ?? '-'],
                    ['Contact', r.contactPerson],
                    ['Email', r.email],
                    ['Phone', r.phone],
                    ['From page', r.sourcePage ?? '-'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-on-light-faint">
                        {k}
                      </dt>
                      <dd className="mt-1 break-words text-[0.875rem] text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 border-t border-rule pt-4">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-on-light-faint">
                    Requirement
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-[0.9375rem] leading-relaxed text-on-light-muted">
                    {r.requirement}
                  </p>
                </div>

                {/* Pipeline + notes */}
                <form action={updateEnquiryAction} className="mt-5 flex flex-wrap items-end gap-3 border-t border-rule pt-4">
                  <input type="hidden" name="reference" value={r.reference} />
                  <div className="min-w-[11rem]">
                    <label className="field-label" htmlFor={`status-${r.reference}`}>
                      Status
                    </label>
                    <select
                      id={`status-${r.reference}`}
                      name="status"
                      defaultValue={r.status}
                      className="field !py-2.5"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-[18rem] flex-1">
                    <label className="field-label" htmlFor={`notes-${r.reference}`}>
                      Internal note
                    </label>
                    <input
                      id={`notes-${r.reference}`}
                      name="notes"
                      defaultValue={r.notes ?? ''}
                      className="field !py-2.5"
                    />
                  </div>
                  <button type="submit" className="btn btn-light !py-3">
                    Save
                  </button>

                  <a
                    href={`mailto:${r.email}?subject=${encodeURIComponent(`Captain Exim - your enquiry ${r.reference}`)}`}
                    className="btn btn-light !py-3"
                  >
                    Reply
                  </a>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
