import fs from 'node:fs';
import path from 'node:path';

import type { EnquiryInput } from '@/lib/enquiry-schema';

/**
 * Enquiry storage.
 *
 * Uses Node's built-in `node:sqlite`, so there is no native module to compile
 * and no service to run — the whole thing is one file on disk. That is the
 * right scale for a five-person business, and the repository interface below is
 * deliberately narrow so swapping in Postgres later touches only this file.
 *
 * If SQLite is unavailable for any reason, every write still lands in a JSONL
 * file. Losing a lead silently is the one failure this system must not have —
 * it is exactly what the previous site did by posting to a .com mailbox while
 * displaying a .in address.
 */

export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUOTATION SENT'
  | 'IN DISCUSSION'
  | 'WON'
  | 'CLOSED';

export const STATUSES: readonly EnquiryStatus[] = [
  'NEW',
  'CONTACTED',
  'QUOTATION SENT',
  'IN DISCUSSION',
  'WON',
  'CLOSED',
];

export interface EnquiryRecord extends EnquiryInput {
  id: number;
  reference: string;
  createdAt: string;
  status: EnquiryStatus;
  notes: string | null;
  ip: string | null;
}

const DATA_DIR = process.env.ENQUIRY_DATA_DIR ?? path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'enquiries.db');
const JSONL_PATH = path.join(DATA_DIR, 'enquiries.jsonl');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

/* -------------------------------------------------------------------------
   SQLite
   ------------------------------------------------------------------------- */

type Db = {
  exec(sql: string): void;
  prepare(sql: string): {
    run(...params: unknown[]): { lastInsertRowid: number | bigint };
    get(...params: unknown[]): Record<string, unknown> | undefined;
    all(...params: unknown[]): Record<string, unknown>[];
  };
};

let db: Db | null = null;
let dbTried = false;

function getDb(): Db | null {
  if (dbTried) return db;
  dbTried = true;

  try {
    ensureDir();
    // Required lazily: importing it at module scope would make the whole route
    // fail to load on a runtime without node:sqlite.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DatabaseSync } = require('node:sqlite') as {
      DatabaseSync: new (p: string) => Db;
    };
    const instance = new DatabaseSync(DB_PATH);

    instance.exec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        reference     TEXT NOT NULL UNIQUE,
        createdAt     TEXT NOT NULL,
        product       TEXT NOT NULL,
        quantity      REAL NOT NULL,
        unit          TEXT NOT NULL,
        destination   TEXT NOT NULL,
        purpose       TEXT,
        company       TEXT NOT NULL,
        contactPerson TEXT NOT NULL,
        email         TEXT NOT NULL,
        phone         TEXT NOT NULL,
        requirement   TEXT NOT NULL,
        sourcePage    TEXT,
        status        TEXT NOT NULL DEFAULT 'NEW',
        notes         TEXT,
        ip            TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries (createdAt DESC);
      CREATE INDEX IF NOT EXISTS idx_enquiries_status  ON enquiries (status);
    `);

    db = instance;
  } catch (err) {
    console.error('[enquiry] SQLite unavailable, falling back to JSONL:', err);
    db = null;
  }

  return db;
}

/* -------------------------------------------------------------------------
   Reference numbers
   ------------------------------------------------------------------------- */

/** CE-YYMM-0001, restarting each month. Human-quotable over the phone. */
function nextReference(handle: Db | null, now: Date): string {
  const stamp = `${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
  let seq = 1;

  if (handle) {
    try {
      const row = handle
        .prepare(`SELECT COUNT(*) AS n FROM enquiries WHERE reference LIKE ?`)
        .get(`CE-${stamp}-%`);
      seq = Number(row?.n ?? 0) + 1;
    } catch {
      seq = Math.floor(Math.random() * 8999) + 1000;
    }
  } else {
    seq = Math.floor(Math.random() * 8999) + 1000;
  }

  return `CE-${stamp}-${String(seq).padStart(4, '0')}`;
}

/* -------------------------------------------------------------------------
   Repository
   ------------------------------------------------------------------------- */

export function createEnquiry(
  input: EnquiryInput,
  meta: { ip?: string | null } = {},
): { reference: string; stored: 'sqlite' | 'jsonl' } {
  const handle = getDb();
  const now = new Date();
  const reference = nextReference(handle, now);
  const createdAt = now.toISOString();

  const record = {
    reference,
    createdAt,
    product: input.product,
    quantity: input.quantity,
    unit: input.unit,
    destination: input.destination,
    purpose: input.purpose ?? null,
    company: input.company,
    contactPerson: input.contactPerson,
    email: input.email,
    phone: input.phone,
    requirement: input.requirement,
    sourcePage: input.sourcePage ?? null,
    status: 'NEW' as const,
    ip: meta.ip ?? null,
  };

  // The JSONL line is written regardless — it is the safety net, not a mirror.
  try {
    ensureDir();
    fs.appendFileSync(JSONL_PATH, `${JSON.stringify(record)}\n`, 'utf8');
  } catch (err) {
    console.error('[enquiry] JSONL append failed:', err);
  }

  if (handle) {
    try {
      handle
        .prepare(
          `INSERT INTO enquiries
             (reference, createdAt, product, quantity, unit, destination, purpose,
              company, contactPerson, email, phone, requirement, sourcePage, status, ip)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        )
        .run(
          record.reference,
          record.createdAt,
          record.product,
          record.quantity,
          record.unit,
          record.destination,
          record.purpose,
          record.company,
          record.contactPerson,
          record.email,
          record.phone,
          record.requirement,
          record.sourcePage,
          record.status,
          record.ip,
        );
      return { reference, stored: 'sqlite' };
    } catch (err) {
      console.error('[enquiry] SQLite insert failed:', err);
    }
  }

  return { reference, stored: 'jsonl' };
}

export interface ListFilters {
  status?: string;
  product?: string;
  destination?: string;
  q?: string;
  limit?: number;
}

export function listEnquiries(filters: ListFilters = {}): EnquiryRecord[] {
  const handle = getDb();
  if (!handle) return [];

  const where: string[] = [];
  const params: unknown[] = [];

  if (filters.status) {
    where.push('status = ?');
    params.push(filters.status);
  }
  if (filters.product) {
    where.push('product = ?');
    params.push(filters.product);
  }
  if (filters.destination) {
    where.push('destination = ?');
    params.push(filters.destination);
  }
  if (filters.q) {
    where.push('(company LIKE ? OR contactPerson LIKE ? OR email LIKE ? OR reference LIKE ?)');
    const like = `%${filters.q}%`;
    params.push(like, like, like, like);
  }

  const sql = `SELECT * FROM enquiries ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
               ORDER BY id DESC LIMIT ?`;
  params.push(Math.min(filters.limit ?? 200, 500));

  try {
    return handle.prepare(sql).all(...params) as unknown as EnquiryRecord[];
  } catch (err) {
    console.error('[enquiry] list failed:', err);
    return [];
  }
}

export function updateEnquiry(
  reference: string,
  patch: { status?: EnquiryStatus; notes?: string },
): boolean {
  const handle = getDb();
  if (!handle) return false;

  const sets: string[] = [];
  const params: unknown[] = [];

  if (patch.status) {
    sets.push('status = ?');
    params.push(patch.status);
  }
  if (patch.notes !== undefined) {
    sets.push('notes = ?');
    params.push(patch.notes);
  }
  if (!sets.length) return false;

  params.push(reference);

  try {
    handle.prepare(`UPDATE enquiries SET ${sets.join(', ')} WHERE reference = ?`).run(...params);
    return true;
  } catch (err) {
    console.error('[enquiry] update failed:', err);
    return false;
  }
}

export function countByStatus(): Record<string, number> {
  const handle = getDb();
  if (!handle) return {};
  try {
    const rows = handle.prepare(`SELECT status, COUNT(*) AS n FROM enquiries GROUP BY status`).all();
    return Object.fromEntries(rows.map((r) => [String(r.status), Number(r.n)]));
  } catch {
    return {};
  }
}
