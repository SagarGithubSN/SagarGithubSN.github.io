import { credentials, credentialsCopy } from '@/lib/content';
import { Reveal, RevealLines } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/**
 * 14 — Trade credentials.
 *
 * The business file is blunt that proof is the entire decision for an export
 * buyer, and equally blunt that the previous site had none. Inventing an IEC
 * number or drawing a plausible-looking ISO badge would be the single most
 * damaging thing this redesign could do, so the section is built to hold real
 * credentials the moment they exist and to be honest until then.
 *
 * `credentials` is currently an empty array by design. Populate it from
 * client-verified documents and the grid replaces the honest empty state
 * automatically — no other change required.
 */
export function Credentials() {
  const hasAny = credentials.length > 0;

  return (
    <section id="credentials" className="band bg-sand">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-7 text-accent">{credentialsCopy.eyebrow}</p>
            </Reveal>
            <RevealLines
              lines={credentialsCopy.headline}
              className="font-display text-[length:var(--text-display)] font-light text-ink"
            />
            {credentialsCopy.body.map((p, i) => (
              <Reveal key={i} delay={160 + i * 110}>
                <p
                  className={`max-w-[46ch] text-[0.9375rem] leading-relaxed ${
                    i === 0 ? 'mt-8 text-ink' : 'mt-4 text-on-light-muted'
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={420}>
              <div className="mt-9">
                <Button href="/trade-credentials" variant="light">
                  Trade credentials
                </Button>
              </div>
            </Reveal>
          </div>

          <div>
            {hasAny ? (
              <dl className="border-t border-rule">
                {credentials.map((c) => (
                  <div
                    key={c.label}
                    className="grid grid-cols-[minmax(0,12rem)_1fr] items-baseline gap-6 border-b border-rule py-5"
                  >
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-on-light-muted">
                      {c.label}
                    </dt>
                    <dd className="font-display text-[1.1875rem] font-light text-ink">
                      {c.value}
                      {c.note ? (
                        <span className="mt-1 block text-[0.8125rem] text-on-light-faint">
                          {c.note}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Reveal delay={200}>
                <div className="border border-rule bg-ivory p-7 md:p-9">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-on-light-faint">
                    Provided on enquiry
                  </p>
                  <ul className="mt-6 space-y-3.5">
                    {credentialsCopy.onRequest.map((item) => (
                      <li key={item} className="flex gap-3.5 text-[0.9375rem] text-ink">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-bright"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
