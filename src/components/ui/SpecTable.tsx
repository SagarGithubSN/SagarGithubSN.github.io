'use client';

import { useReveal } from '@/hooks/useReveal';

export interface SpecRow {
  k: string;
  v: string;
  unit?: string;
  min?: number;
  max?: number;
  floor?: number;
  ceil?: number;
}

/**
 * A specification table that shows ranges as positions, not just numbers.
 *
 * International buyers scan for exactly these figures, so the numeric value is
 * the primary element and always readable as text. The bar is secondary: it
 * places the offered range on its plausible scale, which answers "is 1.5–1.8
 * nicotine low?" without the buyer needing to already know.
 *
 * Rows without a numeric range simply render as label/value.
 */
export function SpecTable({ rows, caption }: { rows: readonly SpecRow[]; caption?: string }) {
  const ref = useReveal<HTMLDivElement>(0.2);

  return (
    <div ref={ref}>
      {caption ? (
        <p className="label mb-5 text-on-light-faint">{caption}</p>
      ) : null}

      <dl className="border-t border-rule">
        {rows.map((r, i) => {
          const hasRange =
            r.min !== undefined && r.max !== undefined && r.floor !== undefined && r.ceil !== undefined;

          const left = hasRange ? ((r.min! - r.floor!) / (r.ceil! - r.floor!)) * 100 : 0;
          const width = hasRange ? ((r.max! - r.min!) / (r.ceil! - r.floor!)) * 100 : 0;

          return (
            <div
              key={r.k}
              className="reveal-fade grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-rule py-4 sm:grid-cols-[minmax(0,10rem)_1fr_auto]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-on-light-muted">
                {r.k}
              </dt>

              {/* Range bar, desktop only — it is an aid, never the data. */}
              <div className="order-3 col-span-2 sm:order-none sm:col-span-1">
                {hasRange ? (
                  <div className="relative h-1 w-full bg-stone">
                    <div
                      className="absolute inset-y-0 bg-forest transition-[width,left] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ left: `${left}%`, width: `${Math.max(width, 1.5)}%` }}
                    />
                  </div>
                ) : null}
              </div>

              <dd className="text-right font-display text-[1.1875rem] font-light text-ink">
                {r.v}
                {r.unit ? (
                  <span className="ml-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-light-faint">
                    {r.unit}
                  </span>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
