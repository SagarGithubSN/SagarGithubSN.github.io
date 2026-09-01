# Deployment

The live preview is at **<https://sagargithubsn.github.io/>**, published from
the `main` branch by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
Push to `main` and it redeploys; there is nothing to run by hand.

---

## What the preview does not include

GitHub Pages is a file server. It serves what is uploaded and executes nothing.
Three parts of this site need a server, so they are **not on the preview**:

| Not on the preview | What it is | Where it still lives |
|---|---|---|
| `POST /api/enquiry` | Validation, spam checks, rate limiting, storage, acknowledgement email | `src/app/api/enquiry/` |
| `/admin` | The received-enquiries list | `src/app/admin/` |
| Basic auth | What keeps `/admin` closed | `src/middleware.ts` |

**All three are still in the repository.** The deploy workflow deletes them from
its own disposable checkout before building, and never touches the branch. Move
the site to any host that runs Node and the whole application works with no code
change.

### The enquiry form on the preview

It is replaced — not left to fail. `NEXT_PUBLIC_STATIC_EXPORT=1` makes
`EnquiryForm` render direct contact routes (email, telephone, WhatsApp) under a
"Preview build" label instead of the form.

This is deliberate. A trade buyer who fills in product, quantity, destination
port and lead time, presses send, and hears nothing does not come back and do it
again — the enquiry is simply lost, and nobody knows it happened. Showing the
real contact details costs a click and loses nothing.

---

## Getting the working enquiry form online

The preview is for showing the design. When the form itself needs to work,
deploy the full application instead. Any Node host will do; Vercel is the least
work because it reads this repository directly:

1. Sign in at <https://vercel.com> with GitHub.
2. **Add New → Project**, import this repository, and deploy. The defaults are
   correct — do not set `STATIC_EXPORT`, or you will get the preview build again.
3. Set the environment variables from [`.env.example`](.env.example): the SMTP
   credentials, `ENQUIRY_TO`, `ADMIN_USER`, `ADMIN_PASSWORD`, and
   `NEXT_PUBLIC_SITE_URL`.

Two things to know before relying on it:

- **`/admin` stays shut until you set `ADMIN_USER` and `ADMIN_PASSWORD`.** It
  returns 503 rather than opening with a default password. That is intentional.
- **Serverless storage does not persist.** The SQLite/JSONL log in `src/server/db.ts`
  writes to a filesystem that is discarded between invocations, so on Vercel the
  acknowledgement email is what actually delivers the enquiry, and `/admin` will
  look empty. For a durable record, either point `db.ts` at a hosted database
  (Postgres, Turso) or run the app on a host with a real disk — a small VPS, or
  Railway/Render/Fly with a volume attached.

---

## Why the site sits at the domain root

The repository is named `SagarGithubSN.github.io`, which GitHub serves at
`https://sagargithubsn.github.io/`.

A project repository would have been served from `https://sagargithubsn.github.io/<repo>/`,
which needs `basePath`. Next.js applies `basePath` to routing and to its own
`_next/` bundles, but **not** to files referenced out of `public/` — so every
photograph and the hero film would have 404'd. That was confirmed in a test
build, not assumed. Serving from the root removes the problem rather than
papering over ~70 hand-written asset paths.

`BASE_PATH` support is still in [`next.config.mjs`](next.config.mjs) for a host
that needs a subpath, but using it means auditing every `/img/` and `/videos/`
reference first.

### Moving to the real domain

When `captainexim.com` is bought, the site should move to a Node host anyway so
the enquiry form works. If you want to keep it on Pages in the meantime:

1. Add a `CNAME` file containing `captainexim.com` to `public/`.
2. Point the domain's DNS at GitHub Pages.
3. Change `NEXT_PUBLIC_SITE_URL` in the workflow to the new domain, so
   `sitemap.xml`, `robots.txt` and the JSON-LD stop advertising the github.io
   address.

---

## Running it locally

Unchanged, and still the full application including the form and `/admin`:

```bash
start.cmd
```

To reproduce exactly what Pages will serve:

```bash
STATIC_EXPORT=1 NEXT_PUBLIC_STATIC_EXPORT=1 npm run build
```

The result lands in `out/`. Serve that directory with any static file server —
opening `out/index.html` from the filesystem will not work, because the absolute
asset paths need a web root.

---

## What is not published

`public/images/research/` — 206MB of image research originals — is excluded by
`.gitignore`, so it is neither committed nor deployed. It stays on the local
machine for re-cropping and art-direction changes; provenance for everything
drawn from it is recorded in [`IMAGE_ASSET_MANIFEST.md`](IMAGE_ASSET_MANIFEST.md).

**The repository is public**, because GitHub Pages on a free account requires it.
That matters here: the imagery in `public/img/` is still logged as
`UNKNOWN — prototype only, replace or verify before production`. It is now
publicly downloadable and attributable to this account. That is acceptable for a
preview and is not acceptable at launch — the licensing has to be settled, or
the images replaced, before this site goes live on a real domain.
