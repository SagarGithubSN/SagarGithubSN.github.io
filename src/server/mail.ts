import nodemailer from 'nodemailer';

import { brand, contact, materialById } from '@/lib/content';
import type { EnquiryInput } from '@/lib/enquiry-schema';

/**
 * Outbound mail for enquiries.
 *
 * Two messages per enquiry: the internal notification, and an acknowledgement
 * to the buyer carrying their reference number. The acknowledgement matters
 * commercially — an export buyer who gets nothing back assumes the form is
 * broken, which on the previous site it effectively was.
 *
 * Credentials come from the environment only. Nothing here is ever bundled to
 * the browser: this module is imported exclusively from a route handler.
 */

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  MAIL_FROM,
  ENQUIRY_RECIPIENT,
} = process.env;

const configured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

/** The single address enquiries are delivered to. */
const recipient = ENQUIRY_RECIPIENT ?? contact.email;
const from = MAIL_FROM ?? `${brand.name} <${contact.email}>`;

let transporter: nodemailer.Transporter | null = null;

function getTransport() {
  if (!configured) return null;
  transporter ??= nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

/** Escape anything that will be interpolated into an HTML body. */
function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function productLabel(id: string): string {
  return id === 'general' ? 'General enquiry' : (materialById(id)?.name ?? id);
}

function rows(enquiry: EnquiryInput, reference: string): [string, string][] {
  return [
    ['Reference', reference],
    ['Product', productLabel(enquiry.product)],
    ['Quantity', `${enquiry.quantity} ${enquiry.unit}`],
    ['Destination', enquiry.destination],
    ['Purpose', enquiry.purpose ?? '-'],
    ['Company', enquiry.company],
    ['Contact', enquiry.contactPerson],
    ['Email', enquiry.email],
    ['Phone / WhatsApp', enquiry.phone],
    ['From page', enquiry.sourcePage ?? '-'],
  ];
}

function internalHtml(enquiry: EnquiryInput, reference: string): string {
  const table = rows(enquiry, reference)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#605d54;font:12px/1.5 -apple-system,sans-serif;white-space:nowrap">${esc(k)}</td>
             <td style="padding:6px 0;color:#292824;font:14px/1.5 -apple-system,sans-serif"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join('');

  return `<div style="background:#f8f5ee;padding:28px">
    <div style="max-width:640px;margin:auto;background:#fff;border:1px solid #e6dfd3;padding:28px">
      <p style="margin:0 0 6px;font:11px/1.4 ui-monospace,monospace;letter-spacing:.2em;color:#8a6e42;text-transform:uppercase">New enquiry</p>
      <h1 style="margin:0 0 22px;font:300 26px/1.2 Georgia,serif;color:#292824">${esc(reference)}</h1>
      <table style="border-collapse:collapse;width:100%">${table}</table>
      <p style="margin:22px 0 6px;font:11px/1.4 ui-monospace,monospace;letter-spacing:.18em;color:#605d54;text-transform:uppercase">Requirement</p>
      <p style="margin:0;white-space:pre-wrap;font:14px/1.65 -apple-system,sans-serif;color:#292824">${esc(enquiry.requirement)}</p>
      <p style="margin:26px 0 0;padding-top:16px;border-top:1px solid #e6dfd3;font:12px/1.5 -apple-system,sans-serif;color:#8c887c">
        Reply directly to this message to reach the buyer.
      </p>
    </div>
  </div>`;
}

function ackHtml(enquiry: EnquiryInput, reference: string): string {
  return `<div style="background:#f8f5ee;padding:28px">
    <div style="max-width:600px;margin:auto;background:#fff;border:1px solid #e6dfd3;padding:30px">
      <p style="margin:0 0 20px;font:11px/1.4 ui-monospace,monospace;letter-spacing:.22em;color:#292824;text-transform:uppercase">${esc(brand.wordmark)}</p>
      <h1 style="margin:0 0 16px;font:300 26px/1.25 Georgia,serif;color:#292824">Thank you - we have your enquiry.</h1>
      <p style="margin:0 0 16px;font:15px/1.65 -apple-system,sans-serif;color:#605d54">
        Dear ${esc(enquiry.contactPerson)}, we have received your enquiry for
        <strong style="color:#292824">${esc(productLabel(enquiry.product))}</strong>
        (${esc(enquiry.quantity)} ${esc(enquiry.unit)}) to ${esc(enquiry.destination)}.
      </p>
      <p style="margin:0 0 22px;font:15px/1.65 -apple-system,sans-serif;color:#605d54">
        Your reference is
        <strong style="color:#292824;font-family:ui-monospace,monospace">${esc(reference)}</strong>.
        A named person will come back to you with a quotation and a realistic lead time.
        If it is urgent, reply to this email or message us on WhatsApp.
      </p>
      <table style="border-collapse:collapse">
        <tr><td style="padding:3px 14px 3px 0;font:12px/1.5 -apple-system,sans-serif;color:#8c887c">Phone</td>
            <td style="padding:3px 0;font:13px/1.5 -apple-system,sans-serif;color:#292824">${esc(contact.phone)}</td></tr>
        <tr><td style="padding:3px 14px 3px 0;font:12px/1.5 -apple-system,sans-serif;color:#8c887c">Email</td>
            <td style="padding:3px 0;font:13px/1.5 -apple-system,sans-serif;color:#292824">${esc(contact.email)}</td></tr>
        <tr><td style="padding:3px 14px 3px 0;font:12px/1.5 -apple-system,sans-serif;color:#8c887c">Hours</td>
            <td style="padding:3px 0;font:13px/1.5 -apple-system,sans-serif;color:#292824">${esc(contact.hours)}</td></tr>
      </table>
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e6dfd3;font:12px/1.6 -apple-system,sans-serif;color:#8c887c">
        ${esc(brand.name)} · ${esc(contact.addressInline)}<br>
        We use your details only to answer this enquiry.
      </p>
    </div>
  </div>`;
}

export async function sendEnquiryMail(
  enquiry: EnquiryInput,
  reference: string,
): Promise<{ notified: boolean; acknowledged: boolean }> {
  const transport = getTransport();

  if (!transport) {
    // Development, or SMTP not yet provisioned. The enquiry is already stored,
    // so this is a degraded path, not a lost lead.
    console.warn(
      `[enquiry] SMTP not configured - ${reference} stored but not emailed. ` +
        'Set SMTP_HOST, SMTP_USER and SMTP_PASS to enable delivery.',
    );
    return { notified: false, acknowledged: false };
  }

  const plain = rows(enquiry, reference)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  let notified = false;
  let acknowledged = false;

  try {
    await transport.sendMail({
      from,
      to: recipient,
      replyTo: `${enquiry.contactPerson} <${enquiry.email}>`,
      subject: `[${reference}] ${productLabel(enquiry.product)} - ${enquiry.company} (${enquiry.destination})`,
      text: `${plain}\n\nRequirement:\n${enquiry.requirement}\n`,
      html: internalHtml(enquiry, reference),
    });
    notified = true;
  } catch (err) {
    console.error(`[enquiry] internal notification failed for ${reference}:`, err);
  }

  try {
    await transport.sendMail({
      from,
      to: enquiry.email,
      subject: `${brand.name} - enquiry received (${reference})`,
      text:
        `Dear ${enquiry.contactPerson},\n\n` +
        `We have received your enquiry for ${productLabel(enquiry.product)} ` +
        `(${enquiry.quantity} ${enquiry.unit}) to ${enquiry.destination}.\n\n` +
        `Your reference is ${reference}.\n\n` +
        `A named person will come back to you with a quotation and a realistic lead time.\n\n` +
        `${brand.name}\n${contact.phone}\n${contact.email}\n`,
      html: ackHtml(enquiry, reference),
    });
    acknowledged = true;
  } catch (err) {
    console.error(`[enquiry] acknowledgement failed for ${reference}:`, err);
  }

  return { notified, acknowledged };
}
