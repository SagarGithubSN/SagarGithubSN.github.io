import Link from 'next/link';

import { materials } from '@/lib/content';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="bg-ivory pt-[9rem]">
      <div className="shell band-tight">
        <p className="label mb-7 text-accent">404</p>
        <h1 className="max-w-[18ch] font-display text-[length:var(--text-display)] font-light text-ink">
          That page isn’t here.
        </h1>
        <p className="mt-6 max-w-[46ch] text-[length:var(--text-lede)] leading-relaxed text-on-light-muted">
          It may have moved, or the link may be out of date. The six product lines are below, or
          tell us what you are sourcing and we will point you at the right one.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/request-a-quote" variant="solid">
            Request a quote
          </Button>
          <Button href="/products" variant="light">
            All products
          </Button>
        </div>

        <ul className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m) => (
            <li key={m.id}>
              <Link
                href={`/products/${m.id}`}
                className="flex h-full items-baseline gap-3 bg-ivory p-6 transition-colors duration-500 hover:bg-sand"
              >
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-accent">
                  {m.number}
                </span>
                <span className="font-display text-[1.25rem] font-light text-ink">{m.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
