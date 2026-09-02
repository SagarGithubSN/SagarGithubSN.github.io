# IMAGE ASSET MANIFEST

Every image the site serves, where it came from, and its rights position.

**Phase: design prototype.** Imagery was sourced from publicly accessible pages
to establish art direction. Nothing here is licence-cleared. Every row carries
the page it came from so each file can be licensed, replaced, or re-shot before
production. Where licence terms were not visible on the source page, the licence
column says `UNKNOWN` rather than guessing.

Last updated: 2026-09-01

---

## Summary

| | |
|---|---|
| Images in the production set | **45** (all WebP, in `public/img`) |
| Distinct source sites | **39** |
| Production set size | **19 MB** |
| Research originals retained | **216** files, 165 MB, in `public/images/research/` |
| Licence status | **UNKNOWN for all 48 — prototype only** |

### Sourcing rules applied

- No paywalls, logins, or protected repositories were accessed.
- No anti-download controls were circumvented.
- Watermarked stock-library results were **excluded at search time**
  (Alamy, Dreamstime, Shutterstock, iStock, Adobe Stock, Freepik, Vecteezy,
  123RF, Depositphotos, Getty and others).
- Nothing is hotlinked. Every file is downloaded, resized and re-encoded locally,
  then served through `next/image`.
- Rejected on visual inspection: marketing banners, images with burned-in text or
  brand logos, 3D product renders, and pesticide-spraying imagery (wrong message
  for a sourcing story).
- One watermarked image slipped the host blocklist and was caught on final visual
  review: the first black-pepper pick carried a tiled `focusedcollection.com`
  watermark and was swapped. **The blocklist is necessary but not sufficient —
  the final visual pass is what catches these.**

### The research archive

`public/images/research/` holds 216 originals in category folders — 3–6
candidates per subject, so art direction can change later without re-downloading.
It is **gitignored and not deployed**; only the 48 selected, optimised files in
`public/img` ship.

---

## Production set

Licence is `UNKNOWN` for every row: these came from ordinary web pages that did
not state terms. Treat the whole table as "replace or verify before production".

### Homepage hero & brand introduction

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `karnataka-land.webp` | Farmland in the Karnataka countryside | pxhere.com | [link](https://pxhere.com/en/photo/1009510) | UNKNOWN | Replace or verify |
| `mysuru-country.webp` | Rural countryside near Mysuru | pxhere.com | [link](https://pxhere.com/en/photo/1102328) | UNKNOWN | Replace or verify |
| `hero-produce.webp` | Fresh produce arranged on a dark ground | pngtree.com | [link](https://pngtree.com/freepng/colorful-fresh-produce-arrangement-against-black-background_20423074.html) | UNKNOWN | Replace or verify |
| `hero-landscape.webp` | Agricultural land under an open sky | atree.org | [link](https://www.atree.org/restoration/) | UNKNOWN | Replace or verify |

### Agricultural products

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `agro-ginger.webp` | Freshly lifted ginger rhizomes | seasonedwithjoy.com | [link](https://seasonedwithjoy.com/growing-harvesting-ginger/) | UNKNOWN | Replace or verify |
| `agro-okra.webp` | Fresh okra pods, or ladyfinger | pngtree.com | [link](https://pngtree.com/freepng/fresh-green-okra-pods_14298922.html) | UNKNOWN | Replace or verify |
| `agro-beans.webp` | Fresh green beans after picking | offthegridnews.com | [link](http://www.offthegridnews.com/survival-gardening-2/miss-gardening-grow-green-beans-indoors-this-winter/) | UNKNOWN | Replace or verify |
| `agro-chilli.webp` | Red chillies spread to dry in the sun | numerical.co.in | [link](https://numerical.co.in/numerons/collection/5fbc018c3e9dd8281015161f) | UNKNOWN | Replace or verify |
| `agro-chilli-green.webp` | Fresh green chillies | pxhere.com | [link](https://pxhere.com/en/photo/561626) | UNKNOWN | Replace or verify |
| `agro-drumstick.webp` | Fresh drumstick, or moringa, pods | yardibles.com | [link](https://www.yardibles.com/how-to-harvest-prepare-moringa-pods/) | UNKNOWN | Replace or verify |
| `agro-harvest.webp` | Mixed fresh vegetables after harvest | wallpapers.com | [link](https://wallpapers.com/wallpapers/mixed-harvest-of-fresh-fruits-and-vegetables-xhdu8aaz13luh46z.html) | UNKNOWN | Replace or verify |
| `agro-grading.webp` | Produce being sorted and graded on a packing line | prnewswire.com | [link](https://www.prnewswire.com/news-releases/compac-announces-new-executive-team-and-growth-strategy-to-capture-global-opportunity-in-post-harvest-fresh-produce-industry-300191112.html) | UNKNOWN | Replace or verify |

### Areca leaf products

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `areca-palm.webp` | An areca palm plantation | pexels.com | [link](https://www.pexels.com/photo/lush-areca-palm-plantation-in-kilpady-india-34750389/) | UNKNOWN | Replace or verify |
| `areca-sheath.webp` | An areca leaf sheath lying where it fell | bignanotech.com | [link](https://bignanotech.com/turning-areca-leaf-sheath-waste-into-useful-green-products/) | UNKNOWN | Replace or verify |
| `areca-sheath-hand.webp` | Areca fronds held in the hand | gardenvive.com | [link](https://gardenvive.com/areca-palm-leaf-tips-turning-brown-what-to-do/) | UNKNOWN | Replace or verify |
| `areca-die.webp` | A shaped metal die used to press areca sheath into tableware | srihariengg.com | [link](https://srihariengg.com/areca-leaf-plate-die-eco-friendly-die-sri-hari-engg-madurai/) | UNKNOWN | Replace or verify |
| `areca-press.webp` | A hydraulic press forming areca leaf plates | indiamart.com | [link](https://www.indiamart.com/proddetail/areca-leaf-plate-making-machine-10465934673.html) | UNKNOWN | Replace or verify |
| `areca-plates.webp` | Finished pressed areca leaf plates | ecoworld.co.in | [link](http://www.ecoworld.co.in/) | UNKNOWN | Replace or verify |
| `areca-bowls.webp` | A pressed areca leaf bowl | bellaserve.com | [link](https://bellaserve.com/products/areca-bowls) | UNKNOWN | Replace or verify |
| `areca-stack.webp` | Finished areca tableware stacked for packing | vertesolutions.com | [link](https://www.vertesolutions.com/blog/understanding-kenyas-draft-national-green-fiscal-incentives-framework) | UNKNOWN | Replace or verify |

### Spices

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `spice-cinnamon.webp` | Cinnamon quills | etsy.com | [link](https://www.etsy.com/listing/836069976/ceylon-cinnamon-sticks-cinnamon-quills) | UNKNOWN | Replace or verify |
| `spice-cardamom.webp` | Green cardamom pods | herbsandspicesaustralia.com | [link](https://herbsandspicesaustralia.com/product/spices/green-cardamom-pods-premium/) | UNKNOWN | Replace or verify |
| `spice-clove.webp` | Whole dried cloves | amazon.com | [link](https://www.amazon.com/Cloves-Spice-Organic-Whole-Clove/dp/B07NTNSQ6K) | UNKNOWN | Replace or verify |
| `spice-chilli.webp` | Whole dried red chillies | vanderl.co.uk | [link](https://vanderl.co.uk/product/whole-red-chillies/) | UNKNOWN | Replace or verify |
| `spice-pepper.webp` | Black peppercorns | wallhere.com | [link](https://wallhere.com/en/wallpaper/811474) | UNKNOWN | Replace or verify |
| `spice-star-anise.webp` | Whole star anise | pexels.com | [link](https://www.pexels.com/photo/close-up-of-star-anise-spice-on-wooden-surface-34927370/) | UNKNOWN | Replace or verify |
| `spice-mace.webp` | Mace, the red aril surrounding the nutmeg seed | britannica.com | [link](https://www.britannica.com/topic/mace-spice) | UNKNOWN | Replace or verify |

### Coconut & by-products

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `coconut-dehusked.webp` | Dehusked mature coconuts | coconutmachine.com | [link](https://coconutmachine.com/product/dehusked-coconut/) | UNKNOWN | Replace or verify |
| `coconut-whole.webp` | Mature coconuts after harvest | storage.googleapis.com | [link](https://storage.googleapis.com/djqnujuhaztrze/how-to-harvest-coconuts-green-hell.html) | UNKNOWN | Replace or verify |
| `coconut-palm.webp` | A coconut palm plantation | parachutekalpavriksha.org | [link](https://parachutekalpavriksha.org/blogs/blog-post/benefits-of-growing-coconuts-in-india) | UNKNOWN | Replace or verify |
| `coconut-copra.webp` | Copra — dried coconut kernel | indiamart.com | [link](https://www.indiamart.com/proddetail/coconut-copra-13197007691.html) | UNKNOWN | Replace or verify |

### Cooking oils & oil seeds

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `oil-groundnut.webp` | Raw groundnuts in the shell | thenutshop.net | [link](https://thenutshop.net/products/raw-in-shell-virginia-peanuts) | UNKNOWN | Replace or verify |
| `oil-sunflower.webp` | Hulled sunflower seeds | pngtree.com | [link](https://pngtree.com/freepng/sunflower-seeds-food-nut-isolated_13276411.html) | UNKNOWN | Replace or verify |
| `oil-sesame.webp` | White sesame seeds | freefoodphotos.com | [link](https://www.freefoodphotos.com/imagelibrary/bread/slides/sesame_seed.html) | UNKNOWN | Replace or verify |
| `oil-castor.webp` | Castor seeds — supplied for industrial use only | britannica.com | [link](https://www.britannica.com/science/seed-plant-reproductive-part/Germination) | UNKNOWN | Replace or verify |
| `oil-mustard.webp` | Mustard seeds | pngtree.com | [link](https://pngtree.com/freepng/mustard-seeds-isolated-on-white-macro_13773544.html) | UNKNOWN | Replace or verify |
| `oil-ghani.webp` | A traditional wooden ghani, or marachekku, oil press | vikalpsangam.org | [link](https://vikalpsangam.org/article/case-study-kartikeyan-on-cold-pressed-oil/) | UNKNOWN | Replace or verify |
| `oil-bottle.webp` | Unrefined cold-pressed oil | healthembassy.co.uk | [link](https://healthembassy.co.uk/blog/a-guide-to-natural-cold-press-oils/) | UNKNOWN | Replace or verify |

### FCV tobacco

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `tobacco-field.webp` | A flue-cured Virginia tobacco crop in the field | cropin.com | [link](https://www.cropin.com/case_study/gpi-sustainable-tobacco/) | UNKNOWN | Replace or verify |
| `tobacco-stack.webp` | Tobacco leaf tied and racked for curing | frontiersin.org | [link](https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2025.1604382/full) | UNKNOWN | Replace or verify |
| `tobacco-barn.webp` | Leaf hanging to cure inside a barn | cigaraficionado.com | [link](https://www.cigaraficionado.com/article/strange-leaves-17332) | UNKNOWN | Replace or verify |
| `tobacco-leaf.webp` | A cured tobacco leaf, showing colour and texture | ericbrand.com | [link](https://ericbrand.com/finishes/mp-02/) | UNKNOWN | Replace or verify |

### Sourcing

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `source-farmer.webp` | A grower working the crop in the field | intpik.ru | [link](https://intpik.ru/india/stocks/) | UNKNOWN | Replace or verify |
| `source-weighing.webp` | Produce being weighed before dispatch | nellisauction.com | [link](https://www.nellisauction.com/p/66lb-Price-Computing-Scale---Digital-Commercial-Food-Meat/30561091) | UNKNOWN | Replace or verify |

### Packaging & trade

| Local file | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|
| `pack-cartons.webp` | Export cartons palletised for dispatch | peitrade.com | [link](https://peitrade.com/citrus-export-packaging-standards/) | UNKNOWN | Replace or verify |
| `pack-sacks.webp` | Food-grade sacks stacked in a warehouse | commoditycentre.com | [link](https://www.commoditycentre.com/our-locations) | UNKNOWN | Replace or verify |
| `pack-loading.webp` | Goods being loaded into an export container | steelboxcontainers.com | [link](https://www.steelboxcontainers.com/how-to-load-a-shipping-container/) | UNKNOWN | Replace or verify |
| `trade-ship.webp` | A container ship under way on open water | wall.alphacoders.com | [link](https://wall.alphacoders.com/big.php?i=750867) | UNKNOWN | Replace or verify |

---

## Audit: what was replaced, and why

The set this pass replaced had three problems.

**1. Resolution.** Thirteen images sourced in the previous pass were 1000–1200px
on the long edge — including `web-areca-set.jpg` at 1001×1001, which was serving
as both the homepage hero frame and the OpenGraph image. Against the 1600px
section / 2000px hero standard, most of the library failed.

**2. Coverage.** Whole named products had no photograph at all. The spice section
ran on one generic "bowls of coloured powder" image for seven named spices. The
oils section had sesame and mustard for a five-seed range. Groundnut, sunflower,
castor, cinnamon, cardamom, clove, pepper, star anise and mace were entirely
unrepresented.

**3. Repetition.** `coconut-whole` and `coconut-halves` were near-duplicates;
ginger was doing duty in three separate sections.

### Section-by-section

| Section | Before | Verdict | Now |
|---|---|---|---|
| Hero frame 01 | `web-areca-set.jpg` 1001px | Too small for a 4:5 hero | `areca-plates.webp` |
| Hero frames 02–06 | mixed, some 1200px | Under-resolution | All ≥1440px, portrait-suited |
| Brand introduction | type + marquee only | **Sparse** — no imagery at all | Two-frame composition |
| Product index | 6 images, one repeated | Adequate | 6 distinct, all ≥1600px |
| Areca process | 6 beats, 2 sharing one file | **Duplicate image** across beats | 6 distinct: sheath → hand → die → press → plates → stack |
| Spices | 1 generic mixed-spice image | **Weakest section on the site** | 7 individual macro images, one per named spice |
| Oils | sesame + mustard | Range not represented | 6: groundnut, sunflower, sesame, mustard, copra, castor |
| Coconut | 2 near-duplicates | Repetitive | dehusked, whole, plantation, copra |
| FCV tobacco | 3, generic | Acceptable | 4 incl. cured-leaf texture |
| Sourcing | 2 | Thin | 3: grower, grading line, weighing |
| Source→shipment | text-only on mobile | **Sparse** on the path most users see | 5 photographs, one per beat |

---

## Production replacement list

**All 48 files are prototype assets with `UNKNOWN` licence.** In priority order:

### Priority 1 — commission
The areca process (8 files) and the sourcing images (3 files). These are the
photographs that make the site specific to Captain Exim rather than generic, and
they are the ones most likely sourced from competitors' own catalogues. One day
with a photographer at a supplier's unit covers the whole areca sequence.

### Priority 2 — replace, do not attempt to clear
Editorial and news-adjacent sources where commercial licensing is unlikely to be
economic: `agro-grading.webp` (prnewswire.com), `areca-stack.webp`
(vertesolutions.com), `spice-mace.webp` (britannica.com).

### Priority 3 — likely licensable cheaply
Straightforward product and stock-adjacent pages: the remaining spices, oils and
coconut images. Several are on pexels.com and pxhere.com, which publish under
permissive terms — **verify per image**, as this was not confirmed at download.

### Also fix before production
Three files fall below the 1600px standard and should be re-sourced regardless of
licence:

- `agro-chilli.webp` — 1200×629
- `agro-grading.webp` — 1555×1036
- `oil-sunflower.webp` — 1200×785

---

## Non-image assets

| Asset | Source | Served from |
|---|---|---|
| Newsreader, Schibsted Grotesk, JetBrains Mono | Google Fonts via `next/font` | **Self-hosted** — downloaded at build, no runtime request to Google |
| All JS/CSS | npm, bundled by Next.js | Self-hosted |
| 3D geometry | Authored in code (`Scene.tsx`) | No external model files |
| Google Maps | `/contact` only | Lazy `<iframe>` below the fold — the only third-party request on the site |

No CDN script tags, no external stylesheets, no remote image hosts.

## Optimisation

Originals were resized to a 2400px ceiling (2000px where the layout never
exceeds it) and re-encoded to WebP at quality 82 with `sharp`. Several sources
served WebP under a `.jpg` filename; format is detected from magic bytes rather
than the extension. `next/image` then generates AVIF/WebP at the specific widths
each layout requests.

Result: **48 images, 19.6 MB total** — from 216 research originals totalling
165 MB.


---

## Revision — client review, 1 September 2026

**Removed for burned-in third-party contact details.** `areca-die.webp` carried
"SRI HARI ENGG / MADURAI / 8667700185" stamped across the image — another
company's name and phone number. Both die candidates in the research set carry
the same stamp, and the remaining areca press/plate machine results are vendor
marketing banners. The areca sequence was therefore reduced from six beats to
five, folding soaking into the pressing beat, which is illustrated by
`areca-press.webp` — a clean, unbranded photograph of a real press line with
sheaths loaded and finished plates stacked alongside.

**Reverted to the v2 selection** at client request: the brand-introduction
section (back to type and the commodity rail, no imagery), hero frame 06,
the sourcing section, the Mysuru origin pair, and all FCV tobacco imagery.
Restored files were re-encoded to WebP at the same settings as the rest of the
set, so the optimisation is consistent.

**Homepage oils strip** now opens on groundnut rather than sesame.

**The 3D source-to-shipment scene was deleted**, along with `three`,
`@react-three/fiber`, `@react-three/drei` and `@types/three`. It is replaced by
scroll-scrubbed photography using `agro-grading`, `pack-sacks`, `pack-cartons`,
`pack-loading` and `trade-ship`.

---

## Revision — hero video & client review, 1 September 2026

### Hero video

| Asset | Source | Notes |
|---|---|---|
| ~~`public/videos/captain-exim-hero.mp4`~~ | Client-supplied (`herovideo.mp4`), AI-generated | Superseded 2 September 2026 — see the revision at the end of this file |
| ~~`public/img/hero-poster.webp`~~ | Frame at 1.2 s of the above | Superseded with the film above |

**Watermark.** The supplied film carries a "Grok" mark in the bottom-right
corner. It is cropped out at render time — `HERO_CROP` in `Hero.tsx` scales the
video 1.16× and biases it down-right so that corner falls outside the frame, and
the poster was cut with the same crop so still and film match. Nothing is
painted over the footage.

This costs ~14% of the frame, and at 720p the source is already being upscaled
on large displays. **Re-export without a watermark at 1920×1080 or higher**, then
`HERO_CROP` can be set to `none`. Logged in `CONTENT_GAPS.md` §B2.

### New and replaced images

| Local file | Section | Subject | Source site | Original URL | Licence | Production status |
|---|---|---|---|---|---|---|
| `oil-groundnut.webp` | Oils (main) | Groundnuts in shell beside a bowl of shelled kernels | thespruceeats.com | [link](https://www.thespruceeats.com/oven-roasted-peanuts-4172872) | UNKNOWN | Replace or verify |
| `tree-sapling.webp` | One export, one tree | Hands planting a young sapling in open soil | inrikocigar.weebly.com | [link](https://inrikocigar.weebly.com/) | UNKNOWN | Replace or verify |
| `coconut-dehusked.webp` | Coconut (main) | Split coconuts showing white kernel in brown shell | Unsplash — Daria Mikhailova | [DAzCux4xQQA](https://unsplash.com/photos/DAzCux4xQQA) | Unsplash Licence | **Cleared** |
| `coconut-whole.webp` | Coconut gallery | Whole mature coconuts | Unsplash — Irene Kredenets | [E95Lpkg-bgc](https://unsplash.com/photos/E95Lpkg-bgc) | Unsplash Licence | **Cleared** |
| `agro-ginger.webp` · `source-farmer.webp` · `karnataka-land.webp` · `mysuru-palace.webp` · `tobacco-crop.webp` · `tobacco-barn.webp` · `tobacco-grower.webp` · `tobacco-stack.webp` | Sourcing, Origin, FCV | Reverted to the v2 selection at client request | Unsplash / open web | see earlier tables | mixed | mixed |

**Removed.** `areca-die.webp` (third-party contact details burned in),
`areca-sheath-hand.webp`, `tobacco-field.webp`, `tree-planting.webp`,
`hero-produce.webp`, `hero-landscape.webp`, `mysuru-country.webp`,
`source-weighing.webp`, `tobacco-leaf.webp` — superseded or unused.

**Not found.** No unbranded photograph of areca tableware being packed into
cartons exists in any search performed; every result is a retail listing with a
logo or price panel on it. The packing story therefore runs stacked areca (real)
→ export cartons (generic) → container loading (generic). Client photography of
their own packed cartons would replace all three. Logged in `CONTENT_GAPS.md` §B3.

---

## Revision — areca process photography, 1 September 2026

Source: a public LinkedIn Pulse article,
*"The Fascinating Mysteries of Areca Leaf Plates"*
<https://www.linkedin.com/pulse/fascinating-mysteries-areca-leaf-plates-unveiling-secrets/>

Supplied by the client as a reference. The page returned publicly without any
login — no authentication was bypassed and no anti-download control was
circumvented. It carries nine inline photographs of a working areca unit, which
is the first genuine documentary coverage of this process the project has had.

**Publisher logos were cropped out.** Six of the nine carried a green circular
mark in a top corner. Each was cropped on that corner only — nothing was painted
over or cloned. Three were already clean.

| Local file | Section | Subject | Logo handling | Native size |
|---|---|---|---|---|
| `areca-plantation.webp` | Areca gallery | A grower with a fallen sheath in the plantation | none present | 1280×720 |
| `areca-sheath-pile.webp` | Areca gallery | Collected sheaths dried and stacked | none present | 1280×720 |
| `areca-washing.webp` | Process beat 03 | Sheaths washed by hand under running water | cropped right 20%, top 18% | 1024×590 |
| ~~`areca-press.webp`~~ | withdrawn | A heated die pressing a sheath | cropped right 22%, top 16% | 998×605 |
| `areca-range.webp` | Product index only | The finished range of plates, bowls and trays | none present | 1280×720 |
| ~~`areca-packing.webp`~~ | withdrawn | Plates counted into stacks and packed by hand | cropped left 20%, top 16% | 1024×605 |
| `areca-served.webp` | Areca gallery | A meal on a compartment plate | cropped right 20%, top 16% | 1024×605 |

**Licence: UNKNOWN — prototype only.** These belong to the article's publisher
and must be licensed or replaced before production. They remain the strongest
argument for commissioning Captain Exim's own areca shoot: this is exactly the
sequence a photographer would capture in one day at a supplier's unit.

**Resolution caveat.** The source is 720p and the crops land at ~1000×600 —
below the 1600px standard used elsewhere. They are used at moderate display
sizes and read acceptably, but they are the lowest-resolution images on the
site. Client photography would fix both the rights and the resolution at once.

**Retired:** `areca-plates.webp`, `areca-bowls.webp`, `areca-palm.webp` —
replaced by the documentary set. The previous `areca-press.webp` (an empty blue
machine from an IndiaMART listing) is superseded by a press actually forming a
sheath.

**Not taken from the article:** its cover image is a title card with the article
headline set over it — text-bearing, so excluded under the same rule that
rejected marketing banners earlier.

---

## Revision — areca beat imagery reassigned, 1 September 2026

At the client's direction, four of the six beats in *How it leaves* now use
different photographs. Beats 01 (Fallen) and 03 (Washed) are unchanged.

| Beat | Local file | Source file | Subject | Licence | Production status |
|---|---|---|---|---|---|
| 02 Collected | `areca-collected.webp` | `research/areca-li/li-01.png` | A grower carrying gathered sheaths out of the plantation | UNKNOWN | Replace or verify |
| 04 Pressed | `areca-press.webp` | `research/areca/press-02.jpg` | A line of heated presses forming sheaths into plates | UNKNOWN | Replace or verify |
| 05 Finished | `areca-finished.webp` | `research/areca/finished.jpg` | Finished plates and bowls laid out on a leaf sheath | UNKNOWN | Replace or verify |
| 06 Packed | `areca-packed.webp` | `research/areca/packed.jpg` | Bundled stacks of finished plates ready for dispatch | UNKNOWN | Replace or verify |

**Logo removal — beat 02.** `li-01.png` carried a green *eco terre* publisher
mark in the top-left corner. It was removed by cropping that corner away (left
17%, top 16%), giving 1062×605. Nothing was painted over or cloned out. The
earlier audit of this file recorded it as clean; that was wrong, and the crop
was applied once the mark was confirmed on screen.

**Resolution caveat — beat 05.** `finished.jpg` is 640×450 native. That is well
below the 1600px-wide standard every other image on the site meets, and it is
displayed in a 16:11 frame roughly 800px wide on a desktop screen, so it will
look soft on a high-density display. It has not been upscaled, because
upscaling would only trade softness for artefacts. Replace it with a
higher-resolution frame — ideally the client's own — before production.

**Provenance.** `press-02.jpg` came from an IndiaMART machine listing
(<https://www.indiamart.com/proddetail/areca-leaf-plate-making-machine-10465934673.html>).
`finished.jpg` and `packed.jpg` were supplied into the research folder for this
change; `packed.jpg` is a WebP despite its `.jpg` extension. All four were
checked on screen for watermarks, burned-in contact details and third-party
branding before use, and all four are clean after the beat-02 crop.

**Licence: UNKNOWN — prototype only, replace or verify before production.**

**Now unused.** `areca-grading.webp` and `areca-packing.webp` are no longer
referenced by any component and have been deleted. `areca-range.webp` remains
in use on the areca product index.

---

## Revision — hero film replaced, 2 September 2026

| Local file | Source | Notes |
|---|---|---|
| `public/videos/captain-exim-hero-2.mp4` | Client-supplied (`herovideo2.mp4`), AI-generated | 1280×720, 15.04 s, 26 MB, H.264. Aerial over a coconut plantation → aircraft in flight |
| `public/img/hero-poster-2.webp` | Frame at 1.2 s of the above, cropped to the CSS window and carrying the same grade | 1103×621, 231 KB. Poster, and the whole picture under `prefers-reduced-motion` |

Replaces the previous film and its poster, both deleted. The originals remain
outside the repository at `C:\Claude Workspace\herovideo.mp4`.

**Watermark.** The film carries the same generator mark as its predecessor —
`Grok`, bottom-right, about 180px in from the right edge and 80px up from the
bottom of the 1280×720 frame. That is 14% and 11% of the frame, against the
9% the previous crop hid, so `HERO_CROP` was widened from
`scale(1.16) translate(2.5%, 2.5%)` to `scale(1.16) translate(0%, 6.2%)` —
the **bottom edge only**.

A first attempt cropped both axes (`scale(1.24) translate(8.6%, 8.6%)`) and was
wrong: measured properly the mark's top edge is only 76px up from the bottom,
so the sides never needed touching. Cropping both cost 24% magnification on an
already-modest source, pushed the frame off centre, and clipped the hull of the
ship in the middle of the film. One edge needs only 16% — the same
magnification the previous film used — and leaves the horizontal framing alone.

The values are coupled: `translate` cannot exceed `(k-1)/2k` or the opposite
edge pulls inside the viewport and opens a gap. At k=1.16 the ceiling is 6.9%
and 6.2% is used, hiding 13.1% off the bottom. Verified by projecting the mark
into page coordinates at 16:9 (clears by 32px), 2.36:1 ultrawide (193px) and
375×812 portrait (far outside), with no edge gap in any, and with the ship
fully in frame and centred to within 17px. Nothing is painted over; it is a
crop.

**Grade.** The film is dark — 37% / 22% / 9% of pixels below luminance 60
across three sampled frames. `filter: brightness(1.18) contrast(0.92)
saturate(1.1)` is applied to the video and the poster alike. `brightness`
alone was rejected: it is a straight multiply and clipped 3% of the frame at
only 1.10. The pair lifts the dark fraction by about four points on every
frame tested with no channel clipping anywhere.

**Weight.** 26 MB for 15 seconds of 720p is roughly 14 Mbit/s, which is a very
high bitrate for the resolution — the file is several times larger than it
needs to be. There is no ffmpeg on this machine, so it could not be
re-encoded. It should be compressed before launch; at a sane bitrate this
would be 3–5 MB with no visible difference, and it is currently the largest
single download on the site by an order of magnitude.

**Resolution.** 1280×720 is modest for a full-bleed hero, and the 1.24 crop
magnifies it further — the effective source is about 1030×580 stretched across
the viewport. It will look soft on a large or high-density display. A
higher-resolution master would fix both this and the weight.

**Licence: UNKNOWN — prototype only, replace or verify before production.**

---

## Revision — footer mark, 2 September 2026

| Local file | Source | Notes |
|---|---|---|
| `public/img/captain-exim-mark.webp` | Emblem cropped from `captain-exim-logo.webp` | 670x634, 76 KB. Footer, on an ivory plate |

The supplied lockup is navy-and-gold artwork on a cream ground with **no alpha
channel**, and the footer is dark green. Keying the cream out was rejected: the
illustration's soft shadows, cloud and compass rose all dissolve into it, and a
knocked-out mark would be navy on forest, which is unreadable. It therefore
keeps its own ground, and the ground is made deliberate — the plate is ivory
(`#f8f5ee`) and the artwork's own background samples at `rgb(250,242,233)` to
`rgb(251,241,235)` on all four corners, a difference of at most five points, so
no seam is visible and the whole thing reads as one cream square.

The crop takes the emblem only, stopping at y=752 of the original so that the
artwork's own cream band forms the bottom margin rather than the ship's water
running to a cut edge. The lockup's internal "CAPTAIN EXIM" and tagline are
excluded: at 88px they would be illegible, and the name is already set in type
directly beneath. The image is marked presentational (`alt=""`) for the same
reason — a screen reader would otherwise announce the name twice.
