# Captain Exim — website

International sourcing of agricultural and natural products from Mysuru,
Karnataka. Marketing site plus a working enquiry pipeline and a small internal
admin.

**Live preview:** <https://sagargithubsn.github.io/>

Published from `main` on every push. The preview is a static export, so the
enquiry form there is replaced by direct contact routes and `/admin` is absent —
both need a server. See [DEPLOYMENT.md](DEPLOYMENT.md) for what that means and
how to put the working form online.

---

## 1. Running it locally

### The short version (Windows)

Double-click, in the project folder:

| File | What it does |
|---|---|
| **`start.cmd`** | Starts the development server on **http://localhost:3000**. Leave the window open. |
| **`start-production.cmd`** | Builds and serves the real, optimised site on the same port. Slower to start, much faster to browse. Use this to show anyone the site. |
| **`stop.cmd`** | Frees port 3000 if a server was left running or a window was closed without Ctrl+C. |

`start.cmd` installs dependencies automatically the first time (a few minutes),
checks that Node is present, and refuses to start if port 3000 is already busy
rather than silently moving to another port.

**To stop:** press `Ctrl+C` in the server window and answer `Y`, or run
`stop.cmd`.

### The manual version (any OS)

```bash
npm ci          # first time only
npm run dev     # development, http://localhost:3000
```

```bash
npm run build && npm run start   # production build, http://localhost:3000
```

### Requirements

- **Node.js 20 or newer** (built and tested on 24.19.0) — <https://nodejs.org>
- npm 10+ (ships with Node)
- No database server, no Docker, no other services.

### Useful commands

| Command | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run typecheck` | TypeScript check, no output |

> **Do not run `npm run build` while the dev server is running.** Both own the
> `.next` folder and the build will kill the dev server. To build while dev is
> up, send it elsewhere:
>
> ```bash
> NEXT_DIST_DIR=.next-build npm run build
> ```

---

## 2. Tools and technologies

Everything is pinned in `package-lock.json`; `npm ci` reproduces this exactly.

### Runtime

| Technology | Version | Why it is here |
|---|---|---|
| **Node.js** | 24.19.0 | Server runtime. Also provides `node:sqlite`, so enquiry storage needs no native module and no database server. |
| **npm** | 11.17.0 | Package manager |

### Framework

| Package | Version | Role |
|---|---|---|
| **next** | 15.5.24 | React framework — App Router, server components, image optimisation, routing, API route, sitemap/robots |
| **react** / **react-dom** | 19.2.8 | UI runtime |
| **typescript** | 5.9.3 | Types across the whole codebase; the build fails on a type error |

### Styling

| Package | Version | Role |
|---|---|---|
| **tailwindcss** | 4.3.3 | Utility CSS. The design system (palette, type scale, motion) is defined once in `src/app/globals.css` under `@theme` |
| **@tailwindcss/postcss** | 4.3.3 | PostCSS integration |

Fonts are **Newsreader** (display), **Schibsted Grotesk** (interface) and
**JetBrains Mono** (trade labels and specifications), self-hosted at build time
by `next/font` — no runtime request to Google.

### 3D — one section only

| Package | Version | Role |
|---|---|---|
| **three** | 0.170.0 | WebGL engine |
| **@react-three/fiber** | 9.7.0 | React renderer for Three.js |
| **@react-three/drei** | 10.7.8 | Helpers (contact shadows) |

Used **only** by the *From source to shipment* section. It is code-split, never
requested on mobile, skipped entirely under `prefers-reduced-motion`, and its
render loop suspends when the section scrolls out of view. If it fails to load,
the section falls back to a normal list and the page is still complete.

### Enquiry pipeline

| Package | Version | Role |
|---|---|---|
| **zod** | 3.25.76 | One schema validating the form in the browser **and** authoritatively on the server |
| **nodemailer** | 6.10.1 | Sends the internal notification and the buyer acknowledgement |
| `node:sqlite` | built into Node 24 | Enquiry storage. No install, no service |

### Deliberately not used

- **No GSAP / ScrollTrigger.** Scroll scrubbing is ~40 lines in
  `src/hooks/useScrollScrub.ts`. ScrollTrigger silently failed to fire here, and
  the maths did not justify the dependency or the failure mode.
- **No animation library.** All motion is CSS transitions driven by
  `IntersectionObserver`, so nothing ships a runtime for it.
- **No UI kit, no CSS framework beyond Tailwind, no jQuery, no CDN scripts.**

Total production dependencies: **8**.

---

## 3. Project structure

```
src/
  app/                     routes (App Router)
    page.tsx               homepage — 16 sections
    products/[slug]/       six product pages, statically generated
    request-a-quote/  contact/  sourcing/  our-story/
    sustainability/   trade-credentials/   privacy/  terms/
    admin/                 internal enquiry management
    api/enquiry/route.ts   the enquiry endpoint
    sitemap.ts  robots.ts  globals.css  layout.tsx
  components/
    layout/                Nav, Footer, PageHeader
    sections/              one file per homepage section
    ui/                    Button, Reveal, ProcessSequence, SpecTable, Wipe…
    enquiry/EnquiryForm.tsx
    experience/source-to-shipment/Scene.tsx    the 3D scene
  hooks/                   useReveal, useScrollScrub, useReducedMotion
  lib/                     content.ts (all copy), seo.ts, countries.ts, schema
  server/                  db.ts, mail.ts, rate-limit.ts
  middleware.ts            HTTP Basic auth for /admin
```

**All site copy lives in `src/lib/content.ts`.** Editing text should not require
touching a component.

---

## 4. Configuration

Copy `.env.example` to `.env.local` and fill in. Nothing is required for the
site to run locally.

| Variable | Needed for | If unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, JSON-LD | Falls back to `https://captainexim.com` |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Sending enquiry email | Enquiries are still **stored**, just not emailed. A warning is logged. |
| `MAIL_FROM`, `ENQUIRY_RECIPIENT` | Sender and destination mailbox | Falls back to the site contact address |
| `ENQUIRY_DATA_DIR` | Where the enquiry database is written | `./data` |
| `ADMIN_USER`, `ADMIN_PASSWORD` | Access to `/admin` | **`/admin` returns 503.** Closed by default, never open with a default password. |

Enquiries are written to `data/enquiries.db` **and** appended to
`data/enquiries.jsonl`. The JSONL file is a deliberate safety net: the previous
site lost leads silently, so persistence — not email — defines success here.

---

## 5. Temporary hosting, before a domain is bought

All three options below give a public HTTPS URL today, free, with no domain
required. **Vercel is the right choice for this project.**

### Option A — Vercel (recommended)

Vercel builds Next.js and needs no configuration. You get
`captain-exim.vercel.app` immediately, and pointing a real domain at it later is
a two-minute change.

```bash
npm i -g vercel
vercel          # first run: links the project, deploys a preview
vercel --prod   # promotes to the public URL
```

Set the environment variables from §4 in the Vercel dashboard.

**One thing to know before relying on it:** Vercel's filesystem is ephemeral, so
`data/enquiries.db` does **not** survive a redeploy. For a temporary preview
that is fine — enquiries still email out. Before taking real enquiries, either
move storage to a hosted Postgres (only `src/server/db.ts` changes; the
interface is deliberately narrow) or use Option B.

### Option B — Render / Railway (persistent storage)

Better if you want the SQLite file to survive deploys during the trial period.
Both run a real Node process and offer a mountable disk.

- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Attach a persistent disk and set `ENQUIRY_DATA_DIR` to its mount path.

### Option C — Cloudflare Tunnel (share this machine, no signup)

Useful for showing someone the site running on this laptop, right now.

```bash
cloudflared tunnel --url http://localhost:3000
```

Prints a temporary public `trycloudflare.com` URL. Dies when you close it, and
only works while this machine is on — a demo tool, not hosting.

### Before any public deployment

- [ ] Delete `public/_ref/` if present — research scaffolding, must not ship
- [ ] Clear test enquiries from `data/`
- [ ] Set `ADMIN_USER` / `ADMIN_PASSWORD`, or accept that `/admin` returns 503
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real URL so canonicals are right
- [ ] Resolve the areca image rights — see `IMAGE_ASSET_MANIFEST.md` §2
- [ ] Confirm phone, email and address — see `CONTENT_GAPS.md`
- [ ] Legal review of the tobacco pages for each target market

---

## 6. Project documents

| File | What it holds |
|---|---|
| `CONTENT_GAPS.md` | Every fact still unconfirmed. Nothing on the site is invented; where data is missing the design says so. |
| `IMAGE_ASSET_MANIFEST.md` | Source, photographer and licence for all 36 images |
| `REFERENCE_VIDEO_LEARNINGS.md` | Analysis of the supplied 3D reference, and how it shaped the motion architecture |
