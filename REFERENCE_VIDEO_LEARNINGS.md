# REFERENCE VIDEO LEARNINGS

Analysis of the supplied reference, completed before any Captain Exim design
decisions were finalised. Written from the video file itself and from the live
site it records — not from the filename, and not from assumptions.

---

## 0. WHAT WAS ANALYSED, AND HOW

**Source file**
`~/Downloads/POV- You finally mastered 3D websites.Great 3D doesn't need to be everywhere.It just needs to ap.mp4`

The file was not in the project workspace; it was located in Downloads, dated the
same day as the brief. Its filename is the origin of the brief's own line
*"Great 3D does not need to be everywhere."*

| Property | Value |
|---|---|
| Duration | **10.82 s** |
| Native resolution | **720 x 1280** (portrait 9:16 social clip) |
| Nature | A **handheld phone recording of a laptop screen**, with a burned-in caption *"POV: you finally mastered 3D websites"* |
| Site recorded | **unitedcarriers.com** — legible in the browser tab and address bar |

**Method.** No ffmpeg exists on this machine, so frames were extracted in the
browser: the clip was loaded into a `<video>`, seeked to fixed timestamps, and
each frame drawn into a `<canvas>` contact sheet (`public/_ref/sheet.html`),
cropped to the laptop-screen region.

Because the clip is a handheld recording of a screen, the *effective* resolution
of the website inside it is only about **410 x 235 px**. That is enough to read
scene changes and pacing, but not craft. So the analysis was extended to **the
live site**, driven directly in a browser — which is where the quantitative
findings below come from, and which produced a materially different conclusion
than the video alone would have supported.

> **This mattered.** The video looks like a WebGL showcase. It largely is not.
> See section B.

---

## A. WHAT HAPPENS IN THE VIDEO

Frame by frame, the 10.82 s records a single continuous scroll:

| Time | On screen |
|---|---|
| 0.00–0.9 s | Camera settling; laptop dark, page at hero |
| 1.0–2.0 s | **White** ground. A blue **reach stacker** (container handler) with its boom raised, and a stack of orange/blue **shipping containers** at right |
| 2.0–3.1 s | Boom sweeps; scene empties toward near-white |
| 3.1–4.1 s | Almost empty white — a single small dark object at the lower edge |
| 4.1–5.2 s | A white **semi-trailer truck**, side elevation, centred on white; oversized ghost typography (`OUR SERVIC…`) sits *behind* it |
| 5.2–6.3 s | Truck tracks left and exits; page returns to near-white |
| **6.60 s** | **A dark curved mass sweeps in from the right** — a shaped wipe, not a cut |
| 7.0–7.6 s | **Dark** section: *"RELIABILITY AT EVERY MILESTONE"* set in white, black container columns flanking |
| 7.8 s | Back to **light** — vertical dark columns plus body copy (a services layout) |
| 8.2–9.7 s | **Aerial ocean**, deep blue water, a container stack in colour blocks |
| 10.80 s | **Light** editorial: *"TRUSTED BY BUSINESSES ACROSS APAC"* with small image cards |

The narrative arc is unmistakably **yard → road → sea → global reach**, which is
independent confirmation that a source-to-shipment journey suits this treatment.

---

## B. WHY THE INTERACTION WORKS — THE CENTRAL FINDING

**The premium "3D" in the reference is mostly not runtime WebGL. It is
pre-rendered image sequences scrubbed on scroll.**

Evidence gathered from the live site:

- The crane and truck render into `<canvas class="home-service-crane-sq">`
  (1190x670) and `<canvas class="home-service-truck-sq">` (929x261). Both
  **refuse a WebGL context** — they are plain **2D canvases**.
- The page requests files named `frame_000.avif`, `frame_002.avif` …
  `frame_042.avif`, plus `frame_000-top.avif` / `frame_000-bot.avif` variants and
  a `frame_df.avif` default poster. These are **offline-rendered animation
  frames**, served as AVIF from a CDN.
- 190 stacked `<img class="img-df">` elements act as the decode/preload layer.
- WebGL appears in only **three** places, all ambient: the hero starfield
  (full-viewport canvas), the hero **globe** (720x720), and the footer logo mark.

So the real architecture is:

| Technique | Used for |
|---|---|
| **Pre-rendered AVIF frame sequence -> 2D canvas, scrubbed by scroll** | The crane scene, the truck scene — i.e. every "wow" moment |
| **Live WebGL** | Ambient only: starfield, globe, footer mark |
| **Ordinary DOM + images** | Everything else |

This is why it looks expensive: the lighting, materials, shadows and motion blur
were rendered offline with no real-time budget, then played back at a cost close
to that of showing a photograph. It also explains the flawless performance.

Smooth scrolling is **Lenis** (`<html class="lenis">`). There is no GSAP and no
ScrollTrigger on the page.

---

## C. HOW SCROLL FEEDBACK WORKS — THE MOST IMPORTANT MEASUREMENT

Measured on the live site at 1280x720:

- One wheel click ≈ **100 px** of scroll.
- The frame sequence spans roughly **40–60 frames** across a scene of about
  2,500 px.
- Therefore **a new frame lands roughly every 50 px** — about **two frames per
  wheel click**.

**There is no scroll gesture anywhere in this experience that produces no visible
change.** That is the whole trick, and it is measurable rather than a matter of
taste.

Section heights, in viewport units:

| Section | Height | Character |
|---|---|---|
| `home-hero` | 2.5 screens | Dark, space, WebGL globe — *"EVERY LEG OF THE JOURNEY"* |
| `home-intro` | 1.8 | Light editorial + stats (2,500+ / 98.2% / 8+) |
| **`home-service`** | **13.6** | **The immersive block** — crane, truck, dark beat, ocean |
| `home-why` | 7.6 | Light editorial |
| `home-testi` | 3.5 | Social proof |
| `home-partners` | 1.9 | Logos |
| `home-ins` | 1.0 | Insights |
| `home-faq` | 0.9 | FAQ |
| **Total** | **≈ 33 screens** | |

**The nuance that corrects the brief.** The brief caps a complex pinned sequence
at 160–220vh. The reference's immersive block is **1,360vh** — six times that —
and still never feels stuck. The governing rule is therefore **not section
length**. It is **feedback density**:

> A long section is fine if every 50 px changes something.
> A 200vh section is unbearable if 800 px change nothing.

The old Raaji areca section failed on the second clause, not the first. Captain
Exim is therefore governed by the feedback-density rule — while still keeping its
sequences far shorter than the reference's, because the audience is a buyer
trying to reach an enquiry form, not a design juror.

---

## D. HOW THE CAMERA IS USED

- **Locked side elevation** for the truck — orthographic-feeling, product-shot
  framing, the object translating horizontally across a still frame.
- **Three-quarter view** for the reach stacker, so the boom articulates in depth
  and the container stack reads as volume.
- **Aerial top-down** for the ocean beat — a hard perspective break that signals
  "now we are at global scale".
- **The camera mostly holds still and the object moves.** Camera moves are rare
  and therefore land when they happen. There is no continuous orbiting.
- Scale changes carry transitions: an object exits by shrinking and leaving
  frame, rather than by cutting.

---

## E. HOW 3D AND NORMAL CONTENT TRANSITION

This is the reference's strongest craft, and the thing most worth taking.

1. **The ground colour is shared.** The crane and truck sit on the same white the
   editorial sections use. Rendered content and DOM content occupy one continuous
   surface, so there is no visible "now entering the 3D section" boundary.
2. **Typography and object share the frame.** At 4.1–5.2 s, oversized ghost type
   sits *behind* the truck — type and render are composited, not stacked in
   separate bands.
3. **Shaped wipes, not cuts.** At 6.60 s a dark curved mass sweeps in from the
   right to carry white -> dark. The transition is itself a designed object.
4. **Objects enter before their section and leave after it**, so scenes overlap
   at the seams and the eye is always mid-movement.
5. **Colour is the section signal.** White (yard/road) -> black (reliability) ->
   ocean blue (sea) -> white (proof). The palette changes announce chapters, so
   the typography does not have to.

---

## F. WHICH CONCEPTS ARE USEFUL FOR CAPTAIN EXIM

1. **Pre-rendered / photographic sequences over runtime 3D.** For Captain Exim
   this resolves the areca problem outright: *real photography, scrubbed on
   scroll at frame density*, beats a synthetic leaf. It is also the honest
   choice — these are real agricultural products.
2. **Feedback density as the governing rule**: something visibly changes at least
   every ~50–80 px of scroll, everywhere on the site.
3. **One immersive block, not scattered 3D.** Concentrate the heaviest treatment
   in *From source to shipment*, where the subject (cartons, pallets, containers)
   is genuinely hard-surfaced and therefore suits 3D.
4. **Shared ground colour** across editorial and immersive content, so the site
   reads as one surface. For Captain Exim that ground is **warm ivory, not
   white**.
5. **Shaped wipes** to carry a change of ground colour.
6. **Type composited with the subject**, not sitting in a separate band.
7. **Held camera, moving object** — calmer, more premium, and far cheaper.
8. **Colour as the chapter signal.**
9. **Objects overlapping section seams** for continuity.

## G. WHICH CONCEPTS MUST NOT BE COPIED

- **The subject matter.** No trucks, cranes, reach stackers, freight yards or
  logistics iconography as brand identity. Captain Exim sources agricultural
  goods; it is not a carrier. Containers appear **only** in the source-to-shipment
  beat, as the last step of a story, never as the brand image.
- **The dark space/starfield hero.** Captain Exim stays predominantly light.
- **A 33-screen homepage.** Far too long for a B2B sourcing buyer.
- **A 13.6-screen immersive block.** Even with good feedback density this is
  self-indulgent for this business. Captain Exim's equivalent is roughly
  **2.5–3 screens**.
- **The condensed uppercase display type** and the industrial tone.
- **Invented proof.** The reference leans on "2,500+ shipments", "98.2%",
  "TRUSTED BY BUSINESSES ACROSS APAC". Captain Exim has **no verified figures**,
  so it shows none — see `CONTENT_GAPS.md`.
- **The globe.** The brief rules it out, and it is the least distinctive thing
  about the reference.

---

## H. HOW THIS CHANGES THE CAPTAIN EXIM DESIGN

| Decision | Before analysis | After analysis |
|---|---|---|
| **Areca process** | Candidate for WebGL | **Photographic sequence, scroll-scrubbed** at frame density. Real images, honest, and faster. |
| **Source to shipment** | Assumed full R3F scene | **Hybrid**: light R3F for hard-surface objects (carton -> pallet -> container), authored so it can be swapped for a pre-rendered sequence. Kept to ~2.5–3 screens. |
| **Governing motion rule** | "Keep pinned sections under 220vh" | **"Something changes every <= 80 px."** Length is a consequence, not the target. |
| **Section seams** | Discrete bands | **Shared ivory ground plus shaped wipes**; subjects cross the seams. |
| **Camera** | Moving camera | **Held camera, moving subject**, with two deliberate perspective breaks. |
| **3D quantity** | More is better | **One immersive block plus minimal ambient touches.** Nothing else. |
| **Ground colour** | White (as reference) | **Warm ivory `#F8F5EE`** — the reference's white is right in principle, wrong in temperature for an Indian agricultural brand. |

**Net effect on the homepage.** The immersive treatment is concentrated in one
place (source-to-shipment). The areca and oils stories are told with real
photography scrubbed at the same feedback density, so they feel like part of the
same experience rather than lesser sections. Every section shares one warm ivory
ground, so the site reads as a single continuous surface instead of a sequence of
set pieces.

---

### Housekeeping

`public/_ref/` holds the reference video and the frame-extraction harness used
above. It is **analysis-only scaffolding and must be deleted before
deployment** — the video is third-party content and must not ship.
