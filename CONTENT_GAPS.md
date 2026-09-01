# CONTENT GAPS — Captain Exim

Everything the site needs confirmed, invented, or corrected before it can go
public. Nothing in this list has been guessed at in the build: where a fact was
not available, the design either omits it or renders an honest empty state.

Source of record: `../raaji-impex-business-context.txt` (extracted from the
previous Raaji Impex International site).

---

## 1. BLOCKING — must be resolved before public launch

### 1.1 Image rights and provenance
**Every photograph on the site is a placeholder.** All twenty files were copied
from the previous site's asset folder, and none has confirmed ownership or a
licence.

| File | Used as | Concern |
|---|---|---|
| `curing-barn-01.jpg` | Homepage hero | 6016×4016 original; looks like genuine in-house or commissioned work, but unverified |
| `curing-barn-02/03.jpg` | Unused reserve | Same |
| `tobacco-field-01/02/03.jpg` | Product index, Sourcing | Unverified |
| `leaf-stack-01/02/03.jpg` | Tobacco curing sequence | Unverified |
| `curing-barrel-01/02.png`, `curing-firing-01.png` | Tobacco curing sequence | Unverified |
| `areca-tableware.jpg` | Product index (Areca) | **Highest risk — appears to be a manufacturer's catalogue photograph, not Captain Exim's own product** |
| `areca-plates.jpg` | Unused reserve | Same concern |
| `spices.jpg`, `coconut.jpg`, `oils.jpg`, `agro-produce.jpg` | Product index | Likely stock; provenance unknown |
| `oil-gaana.png`, `oil-traditional.png` | Oils section | Unverified |

**Action:** confirm ownership per file, or commission a shoot. Two images from
the old site were rejected outright during this build as generic stock
(a heart-shaped fruit arrangement on white, and a corporate handshake-style
composition) and are not present in this project.

### 1.2 Brand and legal identity
- Registered legal/trading name under **Captain Exim**. Is the old entity being
  renamed, or is this a new registration?
- Official logo. The site currently sets the wordmark in type; there is no
  supplied mark.
- Domain. `captainexim.com` is used as a placeholder in metadata and the email
  address and is **not verified as owned**.

### 1.3 Contact details — currently contradictory
The old site displayed **three different phone numbers**, **three different
email addresses**, **two domains** (`.in` and `.com`) and **two sets of opening
hours**. Critically, every form posted to a `.com` address while the site
displayed a `.in` one — meaning enquiries may have been silently lost.

Confirm and supply one of each:
- Phone / WhatsApp (site currently uses `+91 725 941 2411`)
- Email (site currently uses `info@captainexim.com` — **placeholder**)
- Registered address (carried over as Thilak Nagar, Mysuru 570001)
- Business hours (carried over as Mon–Fri 10:00–18:00 IST)

### 1.4 FCV tobacco — regulatory
Tobacco advertising and promotion is restricted in many destination markets and
in India. The section is written as factual B2B trade information and does not
glamorise the product, but **legal review is required** before public
deployment, covering at minimum: the jurisdictions the site will be marketed
in, whether an age or B2B gate is required, and whether specifications may be
published openly or must sit behind an enquiry.

---

## 2. NON-BLOCKING — the design ships with these absent

The Credentials section is deliberately built to render only confirmed entries.
It currently shows an honest "documentation on request" state and **will remain
empty until real values are supplied**. Populate `credentials` in
`src/lib/content.ts`.

### 2.1 Registrations and certifications
None are published anywhere on the site, because none are confirmed. Supply any
that exist, with numbers and validity dates:
- IEC (Importer Exporter Code)
- GST
- APEDA registration
- FSSAI licence
- Spices Board registration
- Tobacco Board registration
- ISO (which standard, which certifying body)
- Organic or other product certification

### 2.2 Trade record
- **Confirmed export destinations.** The old site named Italy, Japan, Hong Kong
  and Europe as *planned* tobacco markets, not shipped ones. No destination is
  claimed anywhere in this build, and the globe visualisation was deliberately
  rejected because it would have required fabricated routes.
- Shipment volumes, container counts, or tonnage to date
- Production / sourcing capacity per category
- Typical lead times per category
- Packaging capability and options
- Named references or testimonials (with permission to publish)

### 2.3 Company facts
- Establishment year. The old site said **2021** on its homepage while carrying
  a borrowed paragraph claiming **2010** for a different company entirely. The
  borrowed text has been removed; the year is currently not stated anywhere.
- Proprietor / founder name. The only name in the source material appeared
  inside that borrowed paragraph, so it is **not trusted** and is not used.
- Team size. The old site said "up to 5 people"; not published here.

### 2.4 Product catalogue
- Confirmed SKU list per category. The old database held roughly 27 products,
  but no names or specifications survive in the source files.
- **Is FCV tobacco still actively traded?**
- **Is Coconut & By-products actively traded?** The old site's page had no
  product content at all.
- **Are Spices actively traded?** Same — the old page was placeholder text only.
  Both are marked `awaitingDetail: true` in `src/lib/content.ts` and carry
  deliberately short descriptions.
- Agricultural products: the five named crops (ginger, ladyfinger, beans,
  chillies, drumstick) are carried over. Is this list current?
- Areca: confirm available shapes, sizes and MOQ.

### 2.5 Sustainability
- **Is the "a tree for every export" initiative still running?** It is currently
  the headline of the sustainability section. If it has lapsed, that section
  needs rewriting — it is the only specific commitment on the site.
- Any records of trees planted, if the claim is to be quantified.

---

## 3. CORRECTED DURING THIS BUILD — do not reintroduce

| Issue on old site | Handling here |
|---|---|
| Paragraph copied verbatim from "Glory Export & Import, established 2010", including a proprietor's name | Deleted entirely. Not rewritten, not adapted. |
| Placeholder marketing jargon ("Energistically utilize team driven niche markets…") on About, Coconut and Spices | Deleted. All copy rewritten from verified facts. |
| Tobacco page querying the Agro category (`category_id = 3`) | N/A in this build — content is static and correctly attributed |
| Spices and Coconut fetching products then never rendering them | N/A — both render, marked as awaiting detail |
| Spices reachable only from a homepage tile, absent from nav | Present in the product index |
| Two near-identical 55 KB homepages, with the live route pointing at the unexpected one | Single homepage |
| Google Maps loaded over `http://` with no API key | No third-party map. Origin is an inline SVG locator. |
| Inverted www/non-www canonical logic | `metadataBase` set; canonical handled by Next |
| All four social icons linking to `#` | No social links until real profiles exist |
| Typos: "Cocount", "competative", "platning", "former" for "farmer", "socked", "timley", "maintian" | All corrected |
| Theme demo content in the admin dashboard ("My Event One") | Out of scope — phase 1 is frontend only |
| Regional statistics presented as company performance | Labelled "Regional context — Karnataka tobacco belt" |

---

## 4. PHASE 2 (not built)

- Enquiry form backend. The form validates and confirms locally; the payload
  shape is final. It needs an endpoint, spam protection, and delivery to a
  confirmed mailbox.
- Product detail pages (`/products/[category]`) — routes designed for, not built.
- CMS or admin for the product catalogue.
- Analytics, sitemap, `robots.txt` for the real domain.
- Hosting and deployment.

---

## ADDENDUM — 2026-09-01 (image pass)

Photography was re-sourced this session. 27 of 36 images are now Unsplash-licensed
(commercial use permitted, no attribution required), replacing the previous
site's assets. Full credits in `IMAGE_ASSET_MANIFEST.md`.

Three image items remain open:

### A1. Thirteen open-web images are not rights-cleared — BLOCKING
At the client's direction, 13 images were sourced from manufacturer, retailer and
news sites to cover subjects no licence-clear pool carries (fallen areca sheath,
plate press, wooden gaana, Karnataka tobacco). Each records its source page in
`IMAGE_ASSET_MANIFEST.md` §B. **All must be cleared, licensed or replaced before
production.**

Priority: **commission the areca shoot** — 8 of the 13 are areca, and one day at
a supplier's unit clears the majority while producing imagery no competitor has.

### A2. Three tobacco images are press photography
`web-tobacco-crop` and `web-tobacco-grower` are from The Hindu and Hindustan
Times. News imagery is rarely licensable for commercial marketing at sensible
cost — budget to replace rather than clear.

### A3. Resolved
No image from the previous Raaji Impex site remains in the build. The gaana
image is now an actual Indian wooden ghani rather than a European press.

---

## ADDENDUM — 2026-09-01 (hero video & imagery revision)

### B1. One export, one tree — BLOCKING BEFORE LAUNCH
**Confirm that the one-export-one-tree initiative continues under Captain Exim
before production launch.**

The commitment is now shown on the site at the client's instruction, because it
is a genuine part of the business's environmental and community story and was
carried by the previous business. It is presented **without any number** — no
tree count, no tonnage, no offset claim — so nothing has been invented. If the
initiative is not in fact continuing, the block must be removed, not softened.

`sustainability.tree.confirmed` is still `false` in `content.ts`. Setting it to
`true` removes the pending caveat from the page.

### B2. Hero video carries a generator watermark
`public/videos/captain-exim-hero.mp4` (1280×720, 10.04s) has a "Grok" watermark
in the bottom-right corner. It is cropped out at render time by scaling the
video 1.14× and biasing it up-left (`HERO_CROP` in `Hero.tsx`), and the poster
frame was cut with the identical crop.

This works, but it costs ~14% of the frame and the source is only 720p, so it is
being upscaled on any large display. **Re-export the film without a watermark
and at 1920×1080 or higher**, then the crop constant can be reset to `none`.

### B3. No clean "areca being packed" photograph exists
Every areca packing image found is a branded retail listing. The packing story
is therefore told with a generic export carton and container-loading photograph
alongside a genuine stacked-areca shot. Client photography of their own packed
cartons would replace all three.
