'use client';

import { useMemo, useRef, useState } from 'react';

import { countries } from '@/lib/countries';
import { contact, materials, purposes, whatsappHref } from '@/lib/content';
import { enquirySchema, unitsForProduct } from '@/lib/enquiry-schema';

type Errors = Record<string, string>;

interface EnquiryFormProps {
  /** Preselects the category when the form is embedded on a product page. */
  defaultProduct?: string;
  className?: string;
}

const INITIAL = {
  product: '',
  quantity: '',
  unit: '',
  destination: '',
  purpose: '',
  company: '',
  contactPerson: '',
  email: '',
  phone: '',
  requirement: '',
  website: '', // honeypot
};

/**
 * The primary conversion interface.
 *
 * Three things make it a trade form rather than a contact form:
 *
 *   1. Quantity + unit + purpose. This is the qualifying set the old site got
 *      right, and it is what lets a quotation be produced from one submission
 *      instead of three emails.
 *   2. Units are filtered by category. An areca buyer sees Pieces and Cartons;
 *      an oils buyer sees Litres and Barrel. The brief is explicit that a
 *      34-entry unfiltered dropdown is the wrong answer.
 *   3. It reports a reference number back, so the buyer has something to quote.
 *
 * Validation runs against the same zod schema the API uses, and on blur rather
 * than on keystroke — correcting someone mid-word is hostile.
 */
function LiveEnquiryForm({ defaultProduct = '', className = '' }: EnquiryFormProps) {
  const [values, setValues] = useState({ ...INITIAL, product: defaultProduct });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const [formError, setFormError] = useState('');
  const mountedAt = useRef(Date.now());

  const units = useMemo(
    () => (values.product ? unitsForProduct(values.product) : []),
    [values.product],
  );

  function set(field: keyof typeof INITIAL, value: string) {
    setValues((v) => {
      // Changing category can invalidate the chosen unit — clear it rather than
      // silently submitting a unit the category does not use.
      if (field === 'product' && v.unit && !unitsForProduct(value).includes(v.unit)) {
        return { ...v, product: value, unit: '' };
      }
      return { ...v, [field]: value };
    });
    setErrors((e) => {
      if (!e[field]) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  }

  function validateField(field: keyof typeof INITIAL) {
    const result = enquirySchema.safeParse(buildPayload());
    if (result.success) return;
    const issue = result.error.issues.find((i) => i.path[0] === field);
    if (issue) setErrors((e) => ({ ...e, [field]: issue.message }));
  }

  function buildPayload() {
    return {
      ...values,
      purpose: values.purpose || undefined,
      sourcePage: typeof window !== 'undefined' ? window.location.pathname : undefined,
    };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');

    // A genuine buyer does not complete this in under three seconds.
    if (Date.now() - mountedAt.current < 3000) {
      setFormError('Please take a moment to complete the form.');
      return;
    }

    const payload = buildPayload();
    const result = enquirySchema.safeParse(payload);

    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        next[key] ??= issue.message;
      }
      setErrors(next);

      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    setState('sending');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error ?? 'Something went wrong. Please try again.');
        setState('error');
        return;
      }

      setReference(data.reference);
      setState('done');
    } catch {
      setFormError(
        'We could not reach the server. Please email or WhatsApp us and we will pick it up.',
      );
      setState('error');
    }
  }

  /* ---------------- Success ---------------- */
  if (state === 'done') {
    return (
      <div
        className={`border border-rule bg-paper p-8 md:p-12 ${className}`}
        role="status"
        aria-live="polite"
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
          <circle cx="17" cy="17" r="16" stroke="var(--color-forest)" strokeWidth="1" />
          <path
            d="M10.5 17.5l4.5 4.5 8.5-9"
            stroke="var(--color-forest)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h3 className="mt-6 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light text-ink">
          Thank you — we have it.
        </h3>

        <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
          Your enquiry reference is{' '}
          <strong className="font-mono text-[0.9375rem] text-ink">{reference}</strong>. We have sent
          an acknowledgement to your email. A named person will come back to you with a quotation
          and a realistic lead time.
        </p>

        <p className="mt-5 text-[0.875rem] text-on-light-muted">
          Have a specification sheet? Reply to that acknowledgement with it attached, quoting your
          reference — or{' '}
          <a
            href={whatsappHref(`Hello Captain Exim, this is about enquiry ${reference}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="link text-accent"
          >
            send it on WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  /* ---------------- Form ---------------- */
  const invalid = (f: string) => (errors[f] ? true : undefined);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`border border-rule bg-paper p-6 md:p-10 ${className}`}
    >
      {/* Honeypot. Off-screen rather than display:none — some bots skip hidden
          inputs but not positioned ones. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Product */}
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="product">
            Product / category <span className="text-clay-deep">*</span>
          </label>
          <select
            id="product"
            className="field"
            value={values.product}
            aria-invalid={invalid('product')}
            aria-describedby={errors.product ? 'product-err' : undefined}
            onChange={(e) => set('product', e.target.value)}
            onBlur={() => validateField('product')}
          >
            <option value="">Select a category…</option>
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.number} — {m.name}
              </option>
            ))}
            <option value="general">Something else / general enquiry</option>
          </select>
          <FieldError id="product-err" message={errors.product} />
        </div>

        {/* Quantity + unit */}
        <div>
          <label className="field-label" htmlFor="quantity">
            Quantity <span className="text-clay-deep">*</span>
          </label>
          <input
            id="quantity"
            className="field"
            inputMode="decimal"
            placeholder="e.g. 5000"
            value={values.quantity}
            aria-invalid={invalid('quantity')}
            aria-describedby={errors.quantity ? 'quantity-err' : undefined}
            onChange={(e) => set('quantity', e.target.value)}
            onBlur={() => validateField('quantity')}
          />
          <FieldError id="quantity-err" message={errors.quantity} />
        </div>

        <div>
          <label className="field-label" htmlFor="unit">
            Unit <span className="text-clay-deep">*</span>
          </label>
          <select
            id="unit"
            className="field"
            value={values.unit}
            disabled={!values.product}
            aria-invalid={invalid('unit')}
            aria-describedby={errors.unit ? 'unit-err' : 'unit-hint'}
            onChange={(e) => set('unit', e.target.value)}
            onBlur={() => validateField('unit')}
          >
            <option value="">{values.product ? 'Select a unit…' : 'Choose a category first'}</option>
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          {!errors.unit ? (
            <p id="unit-hint" className="mt-1.5 text-[0.75rem] text-on-light-faint">
              Units shown match the category you selected.
            </p>
          ) : null}
          <FieldError id="unit-err" message={errors.unit} />
        </div>

        {/* Destination */}
        <div>
          <label className="field-label" htmlFor="destination">
            Destination country <span className="text-clay-deep">*</span>
          </label>
          <input
            id="destination"
            className="field"
            list="country-list"
            placeholder="Start typing…"
            autoComplete="country-name"
            value={values.destination}
            aria-invalid={invalid('destination')}
            aria-describedby={errors.destination ? 'destination-err' : undefined}
            onChange={(e) => set('destination', e.target.value)}
            onBlur={() => validateField('destination')}
          />
          <datalist id="country-list">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <FieldError id="destination-err" message={errors.destination} />
        </div>

        {/* Purpose */}
        <div>
          <span className="field-label">Purpose</span>
          <div className="flex flex-wrap gap-2">
            {purposes.map((p) => {
              const on = values.purpose === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => set('purpose', on ? '' : p)}
                  aria-pressed={on}
                  className={`border px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                    on
                      ? 'border-forest bg-forest text-ivory'
                      : 'border-rule text-on-light-muted hover:border-rule-strong'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Company / contact */}
        <div>
          <label className="field-label" htmlFor="company">
            Company name <span className="text-clay-deep">*</span>
          </label>
          <input
            id="company"
            className="field"
            autoComplete="organization"
            value={values.company}
            aria-invalid={invalid('company')}
            aria-describedby={errors.company ? 'company-err' : undefined}
            onChange={(e) => set('company', e.target.value)}
            onBlur={() => validateField('company')}
          />
          <FieldError id="company-err" message={errors.company} />
        </div>

        <div>
          <label className="field-label" htmlFor="contactPerson">
            Contact person <span className="text-clay-deep">*</span>
          </label>
          <input
            id="contactPerson"
            className="field"
            autoComplete="name"
            value={values.contactPerson}
            aria-invalid={invalid('contactPerson')}
            aria-describedby={errors.contactPerson ? 'contactPerson-err' : undefined}
            onChange={(e) => set('contactPerson', e.target.value)}
            onBlur={() => validateField('contactPerson')}
          />
          <FieldError id="contactPerson-err" message={errors.contactPerson} />
        </div>

        <div>
          <label className="field-label" htmlFor="email">
            Business email <span className="text-clay-deep">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="field"
            autoComplete="email"
            value={values.email}
            aria-invalid={invalid('email')}
            aria-describedby={errors.email ? 'email-err' : undefined}
            onChange={(e) => set('email', e.target.value)}
            onBlur={() => validateField('email')}
          />
          <FieldError id="email-err" message={errors.email} />
        </div>

        <div>
          <label className="field-label" htmlFor="phone">
            Phone / WhatsApp <span className="text-clay-deep">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className="field"
            autoComplete="tel"
            placeholder="+00 000 000 0000"
            value={values.phone}
            aria-invalid={invalid('phone')}
            aria-describedby={errors.phone ? 'phone-err' : undefined}
            onChange={(e) => set('phone', e.target.value)}
            onBlur={() => validateField('phone')}
          />
          <FieldError id="phone-err" message={errors.phone} />
        </div>

        {/* Requirement */}
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="requirement">
            Requirement details <span className="text-clay-deep">*</span>
          </label>
          <textarea
            id="requirement"
            rows={5}
            className="field resize-y"
            placeholder="Specification, grade, packing, target price, delivery window — whatever you already know."
            value={values.requirement}
            aria-invalid={invalid('requirement')}
            aria-describedby={errors.requirement ? 'requirement-err' : 'requirement-hint'}
            onChange={(e) => set('requirement', e.target.value)}
            onBlur={() => validateField('requirement')}
          />
          {!errors.requirement ? (
            <p id="requirement-hint" className="mt-1.5 text-[0.75rem] text-on-light-faint">
              Have a specification document? Send the enquiry first — you can reply to the
              acknowledgement email with it attached.
            </p>
          ) : null}
          <FieldError id="requirement-err" message={errors.requirement} />
        </div>
      </div>

      {formError ? (
        <p
          role="alert"
          className="mt-6 border-l-2 border-clay-deep bg-ivory px-4 py-3 text-[0.875rem] text-clay-deep"
        >
          {formError}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn btn-solid disabled:cursor-wait disabled:opacity-70"
        >
          <span>{state === 'sending' ? 'Sending…' : 'Request quotation'}</span>
          {state === 'sending' ? (
            <span
              aria-hidden="true"
              className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent"
            />
          ) : (
            <svg className="btn__arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
              <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
        </button>

        <p className="max-w-[34ch] text-[0.75rem] leading-relaxed text-on-light-faint">
          We use these details only to answer your enquiry. They are not sold or shared.
        </p>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.75rem] text-clay-deep">
      {message}
    </p>
  );
}

/**
 * Is this build a static export with no server behind it?
 *
 * Read once at module scope, not per render: it is inlined at build time and
 * cannot change while the page is open.
 */
const STATIC_PREVIEW = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

/**
 * What the enquiry panel becomes on a static host.
 *
 * GitHub Pages serves files and nothing else, so `/api/enquiry` does not exist
 * there. The one unacceptable option was to keep rendering the form: it would
 * collect a buyer's full requirement, fail on submit, and lose the enquiry —
 * and a trade buyer who fills in quantity, destination and lead time and hears
 * nothing back does not fill it in twice.
 *
 * So on that build the form is replaced by the ways of reaching Captain Exim
 * that genuinely work from a static page, using the real contact details this
 * site already carries. It says plainly that this is a preview, because the
 * alternative is a buyer wondering why nobody replied.
 */
function DirectContactPanel({ className = '' }: { className?: string }) {
  return (
    <div className={`border border-rule bg-paper p-8 md:p-12 ${className}`}>
      <p className="label text-accent">Preview build</p>

      <h3 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light text-ink">
        Talk to us directly.
      </h3>

      <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-on-light-muted">
        This is a static preview of the Captain Exim site, so the enquiry form is not connected
        here. Every route below reaches us as normally — please include your product, quantity,
        destination port and required lead time, and you will get a quotation back.
      </p>

      <dl className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <dt className="label text-on-light-faint">Email</dt>
          <dd className="mt-2">
            <a href={`mailto:${contact.email}`} className="link text-[0.9375rem] text-ink">
              {contact.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="label text-on-light-faint">Telephone</dt>
          <dd className="mt-2">
            <a href={contact.phoneHref} className="link text-[0.9375rem] text-ink">
              {contact.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="label text-on-light-faint">WhatsApp</dt>
          <dd className="mt-2">
            <a
              href={whatsappHref('Hello Captain Exim, I would like to enquire about a product.')}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-[0.9375rem] text-ink"
            >
              Message us
            </a>
          </dd>
        </div>
        <div>
          <dt className="label text-on-light-faint">Hours</dt>
          <dd className="mt-2 text-[0.9375rem] text-on-light-muted">{contact.hours}</dd>
        </div>
      </dl>

      <p className="mt-8 max-w-[52ch] text-[0.875rem] leading-relaxed text-on-light-faint">
        The working form — with validation, a reference number and an emailed acknowledgement —
        is part of the full build and runs wherever the site is hosted on a server.
      </p>
    </div>
  );
}

export function EnquiryForm(props: EnquiryFormProps) {
  if (STATIC_PREVIEW) return <DirectContactPanel className={props.className} />;
  return <LiveEnquiryForm {...props} />;
}
