/**
 * Single source of truth for site copy.
 *
 * RULES
 * 1. Brand is Captain Exim. The former name never appears in customer-facing
 *    output.
 * 2. Nothing is invented — no certifications, registrations, destinations,
 *    volumes, capacities, clients, awards, MOQs or lead times.
 *    See CONTENT_GAPS.md.
 * 3. Content the old site copied from another company, its placeholder jargon,
 *    and its unverified proprietor attribution are omitted, not rewritten.
 * 4. Regional figures are attributed as regional context, never as Captain
 *    Exim's own performance.
 * 5. Where a category has no confirmed product list (spices, coconut), the
 *    page says so honestly rather than inventing a catalogue.
 */

export const brand = {
  name: 'Captain Exim',
  wordmark: 'CAPTAIN EXIM',
  city: 'Mysuru',
  region: 'Karnataka',
  country: 'India',
  tagline: 'Agricultural and natural product sourcing from Mysuru, India.',
  /** The line set beneath the wordmark in the client's own logo lockup. */
  promise: 'Together, we export excellence.',
} as const;

/**
 * FLAGGED: the previous site displayed a .in address while every form posted to
 * .com, and listed three different phone numbers. Confirm before launch.
 * See CONTENT_GAPS.md §1.3.
 */
export const contact = {
  addressLines: [
    'No 3747/1, New No M-3',
    '11th Cross, Thilak Nagar',
    'Mysuru, Karnataka 570001',
    'India',
  ],
  addressInline: 'No 3747/1, New No M-3, 11th Cross, Thilak Nagar, Mysuru, Karnataka 570001, India',
  phone: '+91 725 941 2411',
  phoneHref: 'tel:+917259412411',
  whatsappNumber: '917259412411',
  email: 'info@captainexim.com',
  hours: 'Monday – Friday, 10:00 – 18:00 IST',
  coords: { lat: 12.32355, lon: 76.64767 },
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=12.32355,76.64767',
} as const;

/** Builds a context-aware WhatsApp deep link with a prefilled message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/* ---------------------------------------------------------------------------
   NAVIGATION
   ------------------------------------------------------------------------- */

export const nav = [
  { label: 'Products', href: '/products' },
  { label: 'Sourcing', href: '/sourcing' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Trade Credentials', href: '/trade-credentials' },
  { label: 'Contact', href: '/contact' },
] as const;

/* ---------------------------------------------------------------------------
   01 — HERO
   ------------------------------------------------------------------------- */

export const hero = {
  eyebrow: 'Mysuru, Karnataka — India',
  headline: ['From India.', 'To the world.'],
  lede: 'Captain Exim connects international buyers with carefully sourced agricultural and natural products from Mysuru, Karnataka.',
  primary: { label: 'Request a quote', href: '/request-a-quote' },
  secondary: { label: 'Explore products', href: '/products' },
  /* The film runs plantation -> container ship -> cargo aircraft, which is the
     headline stated in pictures. The rotating six-frame product cluster it
     replaced is gone; the product range is introduced by the index below. */
  video: '/videos/captain-exim-hero-2.mp4',
  poster: '/img/hero-poster-2.webp',
} as const;

/* ---------------------------------------------------------------------------
   02 — WHO WE ARE
   ------------------------------------------------------------------------- */

export const intro = {
  eyebrow: 'Captain Exim',
  headline: ['Good trade starts', 'at the source.'],
  body: [
    'Captain Exim is a sourcing and export house based in Mysuru, Karnataka. We work directly with growers and sourcing networks across the region, so that what a product is — its grade, its origin, its process — is understood here, before it is offered to anyone abroad.',
    'That is a deliberately small way to operate. It is also the only way we know to answer a buyer’s question with a fact rather than an assurance.',
  ],
  marquee: [
    'Areca leaf',
    'Ginger',
    'Sesame',
    'Coconut',
    'Ladyfinger',
    'Mustard',
    'Chillies',
    'Copra',
    'Drumstick',
    'Beans',
    'Flue-cured Virginia',
  ],
} as const;

/* ---------------------------------------------------------------------------
   03 — PHILOSOPHY
   The motto the previous business displayed on its About page. Preserved as a
   human business philosophy, not a religious claim.
   ------------------------------------------------------------------------- */

export const philosophy = {
  kannada: 'ಸರ್ವೇ ಜನ ಸುಖಿನೋ ಭವಂತು',
  transliteration: 'Sarve Jana Sukhino Bhavantu',
  meaning: 'May all people be happy.',
  body: 'It is an old line, and we use it plainly: a trade is only worth doing if it leaves the grower, the buyer and the people in between better off than it found them. It is the reason we would rather turn down an order than misdescribe one.',
} as const;

/* ---------------------------------------------------------------------------
   04 — PRODUCT UNIVERSE
   ------------------------------------------------------------------------- */

export interface Material {
  id: string;
  number: string;
  name: string;
  short: string;
  /** One-line summary used in the index and in cards. */
  lede: string;
  image: string;
  alt: string;
  gallery?: readonly { src: string; alt: string }[];
  units: readonly string[];
  notes?: readonly string[];
  /** True when the product list itself is unconfirmed by the client. */
  awaitingDetail?: boolean;
  /** Product-page content. */
  page: {
    headline: readonly string[];
    overview: readonly string[];
    /** Confirmed items only. Empty means "not yet confirmed". */
    items: readonly string[];
    itemsNote?: string;
    processing?: readonly { n: string; title: string; body: string }[];
    originNote: string;
    packagingNote: string;
    specs?: readonly { k: string; v: string }[];
    /** One photograph per named item, for categories with a real range. */
    itemImages?: readonly { label: string; src: string; alt: string; note?: string }[];
  };
  whatsapp: string;
}

export const materials: readonly Material[] = [
  {
    id: 'areca',
    number: '01',
    name: 'Areca Leaf Products',
    short: 'Areca',
    lede: 'Plates, bowls, trays and cutlery pressed from naturally fallen areca palm sheaths. A direct replacement for plastic and coated-paper tableware.',
    image: '/img/areca-range.webp',
    alt: 'The finished range of pressed areca leaf plates, bowls and trays',
    gallery: [
      { src: '/img/areca-plantation.webp', alt: 'A grower with a fallen areca sheath in the plantation' },
      { src: '/img/areca-sheath-pile.webp', alt: 'Collected areca sheaths dried and stacked before processing' },
      { src: '/img/areca-served.webp', alt: 'A meal served on a pressed areca leaf compartment plate' },
    ],
    units: ['Pieces', 'Cartons', 'Bags', "20' Container", "40' Container"],
    notes: ['Naturally fallen material', 'No chemicals at any stage', 'Made to buyer dimensions'],
    whatsapp:
      'Hello Captain Exim, I am interested in sourcing Areca Leaf Products. Please share product specifications and quotation details.',
    page: {
      headline: ['Designed', 'by nature.'],
      overview: [
        'Nothing is grown for this. The areca palm sheds its leaf sheath on its own schedule, and what has already fallen becomes tableware — with water, heat and pressure, and nothing else.',
        'The result is a direct alternative to plastic, polymer and coated-paper disposables: rigid, leak-resistant, microwave safe and fully biodegradable, with the grain of the original leaf still visible in the finished piece.',
      ],
      items: ['Plates', 'Bowls', 'Trays', 'Cutlery'],
      itemsNote:
        'Shapes and dimensions are pressed to the buyer’s die specification. Confirmed size and depth ranges are shared on enquiry.',
      processing: [
        {
          n: '01',
          title: 'Collection',
          body: 'Sheaths are gathered from the floor of the farm after they fall. Nothing is cut from a living palm.',
        },
        {
          n: '02',
          title: 'Sorting',
          body: 'Graded for size and soundness on the spot. What is too brittle to hold a shape goes back to the soil.',
        },
        {
          n: '03',
          title: 'Cleaning',
          body: 'Washed to remove soil and grit from the surface of the sheath.',
        },
        {
          n: '04',
          title: 'Soaking',
          body: 'Immersed in water until the fibre softens enough to take a form without cracking.',
        },
        {
          n: '05',
          title: 'Pressing',
          body: 'Pressed between shaped heated dies. No bleach, no resin, no binder and no coating at any stage.',
        },
        {
          n: '06',
          title: 'Packing',
          body: 'Counted, stacked and packed to the buyer’s specification for export.',
        },
      ],
      originNote:
        'Areca growing districts of Karnataka, worked through sourcing relationships around Mysuru.',
      packagingNote:
        'Packed to buyer specification. Carton counts and pallet configuration are agreed per order.',
      specs: [
        { k: 'Material', v: 'Naturally fallen areca palm leaf sheath' },
        { k: 'Additives', v: 'None — no bleach, resin, binder or coating' },
        { k: 'Biodegradable', v: 'Yes' },
        { k: 'Microwave safe', v: 'Yes' },
        { k: 'Suitable for', v: 'Hot, cold, dry and liquid food' },
      ],
    },
  },
  {
    id: 'agro',
    number: '02',
    name: 'Agricultural Products',
    short: 'Agro',
    lede: 'Fresh produce sourced directly from farms we know by name — ginger, ladyfinger, beans, chillies and drumstick.',
    image: '/img/agro-beans.webp',
    alt: 'Freshly picked green beans',
    gallery: [
      { src: '/img/agro-harvest.webp', alt: 'A harvest basket of tomatoes, okra and shallots' },
      { src: '/img/agro-okra.webp', alt: 'Freshly picked okra, or ladyfinger' },
      { src: '/img/agro-drumstick.webp', alt: 'A bunch of fresh drumstick, or moringa, pods' },
      { src: '/img/agro-chilli.webp', alt: 'Red chillies spread to dry in the sun' },
      { src: '/img/agro-ginger.webp', alt: 'Freshly lifted ginger from a Karnataka farm' },
    ],
    units: ['Kg', 'Metric Tons', 'Bags', 'Cartons', "20' Container", "40' Container"],
    notes: ['Direct grower relationships', 'Batch checked before dispatch'],
    whatsapp:
      'Hello Captain Exim, I am interested in sourcing Agricultural Products. Please share available produce and quotation details.',
    page: {
      headline: ['Grown by people', 'we can telephone.'],
      overview: [
        'Fresh vegetables sourced from farms around Mysuru and the surrounding districts of Karnataka. Rather than buy through an agent, we go to the farm — which means the person who grew a consignment is someone we can call when a buyer asks a question about it.',
        'It also means we can encourage traditional fertiliser over chemical inputs, and see the crop before it is committed to anyone.',
      ],
      items: ['Ginger', 'Ladyfinger (okra)', 'Beans', 'Chillies', 'Drumstick'],
      itemsNote:
        'Seasonal availability varies. Tell us the product, volume and destination and we will confirm what can actually be sourced against your window.',
      itemImages: [
        { label: 'Ginger', src: '/img/agro-ginger.webp', alt: 'Freshly lifted ginger rhizomes' },
        { label: 'Ladyfinger (okra)', src: '/img/agro-okra.webp', alt: 'Fresh okra pods' },
        { label: 'Beans', src: '/img/agro-beans.webp', alt: 'Fresh green beans' },
        { label: 'Chillies', src: '/img/agro-chilli-green.webp', alt: 'Fresh green chillies' },
        { label: 'Drumstick', src: '/img/agro-drumstick.webp', alt: 'Fresh drumstick, or moringa, pods' },
      ],
      originNote: 'Farms around Mysuru and neighbouring districts of Karnataka, India.',
      packagingNote:
        'Cartons, bags or bulk to buyer specification. Export packing agreed per consignment.',
    },
  },
  {
    id: 'spices',
    number: '03',
    name: 'Spices',
    short: 'Spices',
    lede: 'Cinnamon, cardamom, clove, chilli, pepper, star anise and mace — whole spice sourced through the Mysuru trade and graded to buyer specification.',
    /* One frame carrying four of the named spices — clove, cardamom, star
       anise and black pepper — so the homepage index shows the actual range
       rather than a single generic spice shot. */
    image: '/img/spice-selection.webp',
    alt: 'Cardamom pods, whole cloves, black peppercorns and star anise',
    gallery: [
      { src: '/img/spice-chilli.webp', alt: 'Whole dried red chillies' },
      { src: '/img/spice-mace.webp', alt: 'Mace — the red aril surrounding the nutmeg seed' },
    ],
    units: ['Kg', 'Metric Tons', 'Bags', 'Cartons'],
    notes: ['Whole spice', 'Graded to buyer specification'],
    whatsapp:
      'Hello Captain Exim, I am interested in sourcing Spices. Please share the available product list and quotation details.',
    page: {
      headline: ['Sorted', 'to specification.'],
      overview: [
        'Karnataka sits alongside the spice-growing belt of the Western Ghats, and Mysuru has long been a trading point for it. Captain Exim sources whole spice against a buyer’s grade, cleanliness and packing requirement.',
        'These are trade products rather than retail lines: the questions that matter are grade, moisture, cleanliness and packing, and those are answered per consignment.',
      ],
      /* Range supplied by the client, 1 September 2026. Grades and seasonal
         availability remain to be confirmed — see CONTENT_GAPS.md. */
      items: [
        'Cinnamon',
        'Cardamom (elaichi)',
        'Clove',
        'Dried red chilli',
        'Black pepper',
        'Star anise',
        'Mace (japatre)',
      ],
      itemsNote:
        'Grade, origin and seasonal availability are confirmed per enquiry. Tell us the spice, the grade and the volume and we will come back with what can actually be sourced against your window.',
      itemImages: [
        { label: 'Cinnamon', src: '/img/spice-cinnamon.webp', alt: 'Cinnamon quills' },
        { label: 'Cardamom', src: '/img/spice-cardamom.webp', alt: 'Green cardamom pods' },
        { label: 'Clove', src: '/img/spice-clove.webp', alt: 'Whole dried cloves' },
        { label: 'Dried red chilli', src: '/img/spice-chilli.webp', alt: 'Whole dried red chillies' },
        { label: 'Black pepper', src: '/img/spice-pepper.webp', alt: 'Black peppercorns' },
        { label: 'Star anise', src: '/img/spice-star-anise.webp', alt: 'Whole star anise' },
        {
          label: 'Mace (japatre)',
          src: '/img/spice-mace.webp',
          alt: 'Mace — the red aril surrounding the nutmeg seed',
          note: 'The aril around the nutmeg seed, not the nutmeg itself',
        },
      ],
      originNote: 'Sourced through the Mysuru and wider Karnataka trade.',
      packagingNote: 'Bags, cartons or bulk to buyer specification.',
    },
  },
  {
    id: 'coconut',
    number: '04',
    name: 'Coconut & By-products',
    short: 'Coconut',
    lede: 'Whole nut, copra and shell by-products out of coastal and southern Karnataka.',
    image: '/img/coconut-dehusked.webp',
    alt: 'Split coconuts showing the white kernel inside the brown shell',
    gallery: [
      { src: '/img/coconut-whole.webp', alt: 'Whole mature coconuts ready for grading' },
      { src: '/img/coconut-copra.webp', alt: 'Copra — dried coconut kernel' },
      { src: '/img/coconut-palm.webp', alt: 'Coconut palms over green fields in southern Karnataka' },
    ],
    units: ['Pieces', 'Kg', 'Metric Tons', 'Bags', "20' Container", "40' Container"],
    awaitingDetail: true,
    whatsapp:
      'Hello Captain Exim, I am interested in sourcing Coconut & By-products. Please share the available product list and quotation details.',
    page: {
      headline: ['Whole nut', 'and by-product.'],
      overview: [
        'Coconut is one of Karnataka’s defining crops, grown across the coastal belt and the southern districts around Mysuru. Captain Exim sources whole nut and its by-products against buyer requirement.',
      ],
      items: [],
      itemsNote:
        'The confirmed coconut product list is being finalised. Send us the form you need — whole nut, copra, or a specific by-product — with volume and destination, and we will confirm what can be sourced.',
      originNote: 'Coastal and southern Karnataka, India.',
      packagingNote: 'Bags, bulk or containerised to buyer specification.',
    },
  },
  {
    id: 'oils',
    number: '05',
    name: 'Cooking Oils & Oil Seeds',
    short: 'Oils',
    lede: 'Groundnut, sunflower, sesame and mustard, drawn on a wooden gaana — the cold-press method used on this subcontinent for millennia. Castor is offered for industrial use.',
    image: '/img/oil-ghani.webp',
    alt: 'A traditional wooden ghani — the cold-press mill used for sesame, mustard and copra',
    gallery: [
      { src: '/img/oil-bottle.webp', alt: 'A bottle of unrefined cold-pressed oil' },
      { src: '/img/oil-mustard.webp', alt: 'A poured heap of mustard seed beside a spoon' },
    ],
    units: ['Litres', 'Kg', 'Barrel', 'Metric Tons', 'Cartons'],
    notes: ['Wooden gaana / ghani', 'Unrefined'],
    whatsapp:
      'Hello Captain Exim, I am interested in Cooking Oils / Oil Seeds. Please share available products and commercial details.',
    page: {
      headline: ['Tradition has', 'a reason.'],
      overview: [
        'Oils have been drawn from groundnut, sesame, mustard and coconut on this subcontinent since long before refining existed. The wooden gaana — also called ghani, or marachekku — turns slowly and cold, and that is the entire point: nothing is heated, and nothing is stripped out and added back.',
        'The commercial position here is purity rather than nutrition. We are not making health claims; we are telling you exactly how the oil was extracted and what is and is not in it.',
      ],
      /* Range supplied by the client, 1 September 2026. Castor is listed
         separately and deliberately: it is not an edible oil, and no cooking
         or food claim is made for it anywhere on this site. */
      items: [
        'Groundnut oil',
        'Sunflower oil',
        'Sesame oil',
        'Mustard oil',
        'Coconut oil',
        'Castor oil — industrial use',
        'Oil seeds (groundnut, sunflower, sesame, mustard, castor)',
      ],
      itemsNote:
        'Pack sizes and presentation are agreed per order; bulk and retail-pack requirements are both quotable. Castor oil and castor seed are supplied for industrial and technical applications only — they are not food products.',
      processing: [
        {
          n: '01',
          title: 'Seed',
          body: 'Groundnut, sunflower, sesame, mustard or copra, sourced whole and cleaned before pressing.',
        },
        {
          n: '02',
          title: 'Gaana',
          body: 'A wooden mortar and pestle turned slowly — the method known as gaana, ghani or marachekku.',
        },
        {
          n: '03',
          title: 'Extraction',
          body: 'Cold pressure only. No heat is applied and no solvent is used.',
        },
        {
          n: '04',
          title: 'Filtering',
          body: 'Settled and filtered, then packed to the buyer’s unit — unrefined.',
        },
      ],
      itemImages: [
        { label: 'Groundnut', src: '/img/oil-groundnut.webp', alt: 'Raw groundnuts in the shell' },
        { label: 'Sunflower', src: '/img/oil-sunflower.webp', alt: 'Hulled sunflower seeds' },
        { label: 'Sesame', src: '/img/oil-sesame.webp', alt: 'White sesame seeds' },
        { label: 'Mustard', src: '/img/oil-mustard.webp', alt: 'Mustard seeds' },
        { label: 'Coconut (copra)', src: '/img/coconut-copra.webp', alt: 'Copra — dried coconut kernel' },
        {
          label: 'Castor',
          src: '/img/oil-castor.webp',
          alt: 'Castor seeds, supplied for industrial use only',
          note: 'Industrial and technical use only — not a food product',
        },
      ],
      originNote: 'Pressed in and around Mysuru, Karnataka.',
      packagingNote: 'Bottles, cartons, barrels or bulk to buyer specification.',
      specs: [
        { k: 'Extraction', v: 'Cold pressed, wooden gaana / ghani' },
        { k: 'Heat applied', v: 'None' },
        { k: 'Solvent used', v: 'None' },
        { k: 'Refining', v: 'Unrefined' },
        { k: 'Edible seeds', v: 'Groundnut, sunflower, sesame, mustard, coconut (copra)' },
        { k: 'Industrial', v: 'Castor — non-edible, technical applications only' },
      ],
    },
  },
  {
    id: 'fcv-tobacco',
    number: '06',
    name: 'FCV Tobacco',
    short: 'FCV Tobacco',
    lede: 'Flue-cured Virginia leaf from the Mysuru belt — the low-nicotine, neutral filler the international trade knows by region.',
    image: '/img/tobacco-crop.webp',
    alt: 'Bullocks working a tobacco field in the Karnataka belt',
    gallery: [
      { src: '/img/tobacco-barn.webp', alt: 'Flue-cured leaf hanging in rows inside a curing barn' },
      { src: '/img/tobacco-stack.webp', alt: 'Cut leaf tied to sticks and stacked for curing' },
    ],
    units: ['Kg', 'Metric Tons', 'Bags', "20' Container", "40' Container"],
    notes: ['Graded to buyer specification'],
    whatsapp:
      'Hello Captain Exim, I am interested in your FCV Tobacco. Please share specifications and commercial details.',
    page: {
      headline: ['Graded to', 'the number.'],
      overview: [
        'Flue-cured Virginia tobacco grown in the Mysuru belt of Karnataka. The regional style has its own identity in the international trade, sought for low nicotine and a neutral filler character that blends readily with other leaf.',
        'This is trade information for commercial buyers. The specification ranges below are what we offer against; lot sizes and grading follow the buyer’s requirement.',
      ],
      items: ['Flue-cured Virginia leaf'],
      itemsNote: 'Grades and lot sizes are agreed against the buyer’s specification.',
      originNote: 'Mysuru belt, Karnataka, India.',
      packagingNote: 'Bales, bags or containerised to buyer specification.',
    },
  },
] as const;

export function materialById(id: string): Material | undefined {
  return materials.find((m) => m.id === id);
}

/* ---------------------------------------------------------------------------
   05 — CLOSER TO THE SOURCE
   ------------------------------------------------------------------------- */

export const source = {
  eyebrow: 'Sourcing',
  headline: ['Closer to', 'the source.'],
  body: [
    'Rather than buy through an agent, we go to the farm. It means we can encourage traditional fertiliser over chemical, and it means the person who grew a consignment is someone we can telephone when a buyer asks a question about it.',
    'It is not a scalable way to trade. It is a precise one.',
  ],
  /** Preserved from the original business. A statement of respect, not politics. */
  slogan: {
    text: 'Jai Jawan, Jai Kisan',
    gloss: 'Hail the soldier, hail the farmer.',
    note: 'An old Indian slogan. We keep it here because the second half of it is the half our business depends on.',
  },
  chain: ['Farm', 'Product', 'Quality', 'Captain Exim', 'Buyer'],
  images: [
    { src: '/img/agro-ginger.webp', alt: 'Freshly lifted ginger from a Karnataka farm' },
    { src: '/img/source-farmer.webp', alt: 'A farmer holding produce in the field' },
  ],
} as const;

/* ---------------------------------------------------------------------------
   06 — ARECA PROCESS (homepage sequence)
   Scroll-scrubbed photography, per REFERENCE_VIDEO_LEARNINGS.md §H.
   ------------------------------------------------------------------------- */

export const arecaProcess = {
  eyebrow: 'Areca leaf products',
  headline: ['Fallen, not felled.'],
  intro:
    'Nothing is grown for this. The palm sheds its leaf sheath on its own schedule, and what has already fallen becomes tableware — with water, heat and pressure, and nothing else.',
  beats: [
    {
      n: '01',
      label: 'Fallen',
      heading: 'It falls on its own.',
      body: 'The areca palm drops its leaf sheath naturally. Nothing is cut from a living tree to make any of this.',
      image: '/img/areca-sheath.webp',
      alt: 'An areca leaf sheath lying where it fell on the floor of the plantation',
    },
    {
      n: '02',
      label: 'Collected',
      heading: 'Gathered, and graded by hand.',
      body: 'Sheaths are picked up from the floor of the farm and graded for size and soundness on the spot. What is too brittle to hold a shape goes back to the soil.',
      image: '/img/areca-collected.webp',
      alt: 'A grower carrying gathered areca leaf sheaths out of the plantation',
    },
    {
      n: '03',
      label: 'Washed',
      heading: 'Water, until the fibre gives.',
      body: 'Each sheath is washed free of soil and grit and soaked until it is pliable enough to take a form without cracking. That is the whole preparation — there is no chemical stage.',
      image: '/img/areca-washing.webp',
      alt: 'Areca sheaths being washed by hand under running water',
    },
    {
      n: '04',
      label: 'Pressed',
      heading: 'Heat and pressure. No binder.',
      body: 'The softened sheath is pressed between shaped heated dies. No bleach, no resin and no coating at any stage — the grain in a finished plate is the grain the leaf already had.',
      image: '/img/areca-press.webp',
      alt: 'A line of heated presses forming washed areca sheaths into plates',
    },
    {
      n: '05',
      label: 'Finished',
      heading: 'Rigid, leak-resistant, compostable.',
      body: 'Plates, bowls, trays and cutlery, made to your dimensions, microwave safe and fully biodegradable.',
      image: '/img/areca-finished.webp',
      alt: 'Finished pressed areca leaf plates and bowls laid out on a leaf sheath',
    },
    {
      n: '06',
      label: 'Packed',
      heading: 'Counted, stacked, shipped.',
      body: 'Counted into your carton quantity and packed to your specification, then shipped by the carton, pallet or container.',
      image: '/img/areca-packed.webp',
      alt: 'Bundled stacks of finished areca plates tied and stacked ready for dispatch',
    },
  ],
  /* The PACKED beat can only carry one photograph, and it must be the one
     where the finished product is visible. The rest of the journey — carton,
     pallet, container — runs as a short strip beneath the sequence so
     "counted, stacked, shipped" is demonstrated rather than asserted. */
  packing: {
    eyebrow: 'Counted, stacked, shipped',
    steps: [
      {
        n: '01',
        title: 'Stacked',
        body: 'Finished plates, bowls and trays counted and stacked to your carton quantity.',
        image: '/img/areca-stack.webp',
        alt: 'Finished areca leaf plates counted and stacked',
      },
      {
        n: '02',
        title: 'Cartoned & palletised',
        body: 'Packed into export cartons and consolidated onto pallets for handling.',
        image: '/img/pack-cartons.webp',
        alt: 'Export cartons stacked and palletised in a warehouse',
      },
      {
        n: '03',
        title: 'Containerised',
        body: 'Loaded to a 20′ or 40′ container against the agreed commercial terms.',
        image: '/img/pack-loading.webp',
        alt: 'Goods being loaded into an export container',
      },
    ],
  },
  features: [
    '100% natural',
    'Fully biodegradable',
    'No chemicals at any stage',
    'Rigid and leak-resistant',
    'Microwave safe',
    'Made to buyer dimensions',
  ],
} as const;

/* ---------------------------------------------------------------------------
   07 — OILS (homepage)
   ------------------------------------------------------------------------- */

export const oils = {
  eyebrow: 'Cooking oils & oil seeds',
  headline: ['Tradition has', 'a reason.'],
  body: 'Oils have been drawn from sesame, mustard and coconut on this subcontinent since long before refining existed. The wooden gaana turns slowly and cold, which is the entire point: nothing is heated, and nothing is stripped out and added back.',
  steps: [
    { n: '01', title: 'Seed', body: 'Sesame, mustard or copra, sourced whole and cleaned.' },
    {
      n: '02',
      title: 'Gaana',
      body: 'A wooden mortar and pestle turned slowly — also called ghani, or marachekku.',
    },
    { n: '03', title: 'Extraction', body: 'Cold pressure only. No heat is applied and no solvent is used.' },
    { n: '04', title: 'Oil', body: 'Unrefined, filtered, and packed to the buyer’s unit.' },
  ],
  images: [
    { src: '/img/oil-groundnut.webp', alt: 'Shelled groundnuts before cold pressing' },
    { src: '/img/oil-bottle.webp', alt: 'A bottle of unrefined cold-pressed oil' },
  ],
} as const;

/* ---------------------------------------------------------------------------
   08 — ORIGIN
   ------------------------------------------------------------------------- */

export const origin = {
  eyebrow: 'Origin',
  headline: ['Our story begins', 'in Mysuru.'],
  body: [
    'Mysuru sits inland in southern Karnataka, at the edge of one of India’s more productive agricultural regions. It is the tobacco and areca belt, it is close to the coconut and spice country of the Western Ghats, and it is where this business is registered and run.',
    'We treat that as provenance rather than decoration. Being here is what makes direct sourcing possible at all.',
  ],
  levels: [
    { label: 'India', note: 'South Asia' },
    { label: 'Karnataka', note: 'Southern state' },
    { label: 'Mysuru', note: '12.32° N, 76.65° E' },
  ],
  images: [
    {
      src: '/img/karnataka-land.webp',
      alt: 'Green paddy fields with palms and hills beyond, Karnataka',
    },
    { src: '/img/mysuru-palace.webp', alt: 'Columns and arches of a heritage building in Mysuru' },
  ],
} as const;

/* ---------------------------------------------------------------------------
   09 — SOURCE TO SHIPMENT
   The one immersive block. Scene states are deliberately few and change fast.
   ------------------------------------------------------------------------- */

export const shipment = {
  eyebrow: 'From source to shipment',
  headline: ['How it leaves.'],
  intro:
    'What happens between a confirmed order and a container on the water. Only the steps we actually carry out are shown here.',
  scenes: [
    {
      n: '01',
      title: 'At source',
      body: 'Product is prepared and checked where it was grown or made.',
      image: '/img/agro-grading.webp',
      alt: 'Produce being sorted and graded before packing',
    },
    {
      n: '02',
      title: 'Packed',
      body: 'Into the commercial packing agreed for your market and product.',
      image: '/img/pack-sacks.webp',
      alt: 'Food-grade sacks stacked in a warehouse',
    },
    {
      n: '03',
      title: 'Palletised',
      body: 'Consolidated for handling, with counts confirmed against the order.',
      image: '/img/pack-cartons.webp',
      alt: 'Export cartons palletised for dispatch',
    },
    {
      n: '04',
      title: 'Containerised',
      body: 'Loaded to a 20′ or 40′ container against the agreed commercial terms.',
      image: '/img/pack-loading.webp',
      alt: 'Goods being loaded into an export container',
    },
    {
      n: '05',
      title: 'On the water',
      body: 'Dispatched with the applicable trade documentation prepared.',
      image: '/img/trade-ship.webp',
      alt: 'A container ship under way on open water',
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
   10 — FCV TOBACCO
   ------------------------------------------------------------------------- */

export const tobacco = {
  eyebrow: 'Mysore FCV Tobacco',
  headline: ['Graded to', 'the number.'],
  intro:
    'The Mysuru belt is known for a low-nicotine, neutral filler that blends with almost anything. The ranges below are what we offer against; lot sizes and grading follow the buyer’s requirement.',
  physical: [
    { k: 'Colour', v: 'Lemon-orange to orange' },
    { k: 'Leaf size', v: 'Medium – Large' },
    { k: 'Pore volume', v: '0.13 – 0.17', unit: 'ml/g', min: 0.13, max: 0.17, floor: 0, ceil: 0.3 },
    { k: 'Filling value', v: '2.9 – 3.3', unit: 'cc/g', min: 2.9, max: 3.3, floor: 0, ceil: 5 },
  ],
  chemical: [
    { k: 'Nicotine', v: '1.5 – 1.8', unit: '%', min: 1.5, max: 1.8, floor: 0, ceil: 4 },
    { k: 'Reducing sugars', v: '18 – 27', unit: '%', min: 18, max: 27, floor: 0, ceil: 40 },
    { k: 'Chloride', v: '0.1 – 0.2', unit: '%', min: 0.1, max: 0.2, floor: 0, ceil: 1 },
  ],
  /**
   * Ordered field -> stacking -> barn, which is both the real sequence and the
   * order the available photography actually supports. The previous ordering
   * ended on a "Firing" step illustrated by a photograph of a field, which is
   * the kind of mismatch a trade buyer notices immediately.
   */
  curing: [
    {
      n: '01',
      title: 'In the field',
      body: 'The crop occupies a farming family for six to eight months. Leaf is plucked as it matures rather than all at once.',
      image: '/img/tobacco-grower.webp',
      alt: 'A registered grower tending a tobacco crop in Karnataka',
    },
    {
      n: '02',
      title: 'Stacking',
      body: 'Plucked leaf is tied to sticks and stacked through the barn at set spacing by a grower who knows the arrangement. Improper stacking is a fire risk.',
      image: '/img/tobacco-stack.webp',
      alt: 'Cut tobacco leaf tied to sticks and stacked for curing',
    },
    {
      n: '03',
      title: 'The barn',
      body: 'The barrel house holds the leaf at temperature, and the chamber is fired and held constant. Holding it steady is what determines the grade that comes out.',
      image: '/img/tobacco-barn.webp',
      alt: 'Flue-cured leaf hanging in rows inside a curing barn',
    },
  ],
  /** Regional context — explicitly not Captain Exim's own figures. */
  regional: {
    caption: 'Regional context — Karnataka tobacco belt, not Captain Exim figures',
    stats: [
      { v: '70,000+', k: 'Hectares under Virginia tobacco across Mysuru and Hassan' },
      { v: '56,000', k: 'Registered growers in the belt' },
      { v: 'No. 2', k: 'Karnataka’s rank among Indian tobacco-producing states' },
    ],
  },
  notice:
    'Tobacco is sold business-to-business only. This information is trade specification for commercial buyers and is not a consumer advertisement.',
} as const;

/* ---------------------------------------------------------------------------
   11 — WHAT WE STAND FOR
   ------------------------------------------------------------------------- */

export const values = {
  eyebrow: 'What we stand for',
  headline: ['Four things we', 'will not trade away.'],
  items: [
    {
      k: 'Trust',
      v: 'Strong commercial relationships begin with keeping commitments. If we have said it, we will do it, and if we cannot, we will say so early.',
    },
    {
      k: 'Humility',
      v: 'Good sourcing begins by listening — to what a buyer actually needs, and to the people who grow and make the product.',
    },
    {
      k: 'Integrity',
      v: 'Be clear about the product, its specification and what can genuinely be delivered. We would rather lose an order than misdescribe one.',
    },
    {
      k: 'Responsibility',
      v: 'Quality, buyer requirements, sourcing relationships and the communities behind them are all treated as the same obligation.',
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
   12 — SUSTAINABILITY
   ------------------------------------------------------------------------- */

export const sustainability = {
  eyebrow: 'Sustainability',
  headline: ['Trade should leave', 'something behind.'],
  body: 'Three of our six lines have a genuine environmental story, and we would rather state those plainly than dress the business up in language it has not earned. There are no carbon claims on this site, because we have not measured any.',
  pillars: [
    {
      title: 'Fallen material',
      body: 'Areca tableware is made from sheaths the palm drops by itself. Nothing is harvested for it, and the finished product is fully biodegradable.',
    },
    {
      title: 'Traditional extraction',
      body: 'Cold-pressed oils are drawn on a wooden gaana. No heat, no solvent, and no refining stage to strip and re-add.',
    },
    {
      title: 'Grower relationships',
      body: 'Buying direct lets us encourage traditional fertiliser over chemical inputs, rather than simply specifying it from a distance.',
    },
  ],
  /* Stated as what it is: a standing commitment, in the present tense. It
     carries no count, because a number nobody can check is worth less than
     the commitment itself — but the absence of a number is not something the
     page needs to talk about. Verification before launch is tracked in
     CONTENT_GAPS.md, which is where that belongs. */
  tree: {
    headline: 'One export, one tree.',
    body: 'A tree goes into the ground for every export that leaves — planted in the districts we buy from, not somewhere convenient. It does not offset a shipment and we will not claim it does. It is simply the part we can do every time, and it compounds.',
    image: '/img/tree-sapling.webp',
    imageAlt: 'A young sapling being planted by hand in open soil',
  },
} as const;

/* ---------------------------------------------------------------------------
   13 — HOW WE WORK
   ------------------------------------------------------------------------- */

export const howWeWork = {
  eyebrow: 'How we work',
  headline: ['Six steps,', 'no surprises.'],
  intro:
    'The commercial process from first enquiry to dispatch. Steps we do not control — freight booking, destination clearance — are named as such rather than claimed.',
  steps: [
    {
      n: '01',
      title: 'Your requirement',
      body: 'Product, specification, quantity, packing and destination. The more precise this is, the faster everything after it moves.',
    },
    {
      n: '02',
      title: 'Sourcing',
      body: 'We identify suitable sources against your requirement and confirm what is genuinely available in your window.',
    },
    {
      n: '03',
      title: 'Product alignment',
      body: 'Available product detail is matched to the specification, and anything that cannot be met is flagged before quotation.',
    },
    {
      n: '04',
      title: 'Packaging',
      body: 'Commercial packing, counts and marking are agreed for your market.',
    },
    {
      n: '05',
      title: 'Documentation',
      body: 'Applicable trade documentation is prepared for the product and destination.',
    },
    {
      n: '06',
      title: 'Shipment',
      body: 'Product is dispatched under the agreed commercial terms.',
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
   14 — TRADE CREDENTIALS
   Intentionally empty. Populate only from client-verified documents.
   ------------------------------------------------------------------------- */

export interface Credential {
  label: string;
  value: string;
  note?: string;
}

export const credentials: readonly Credential[] = [];

export const credentialsCopy = {
  eyebrow: 'Trade credentials',
  headline: ['Documentation,', 'on request.'],
  body: [
    'Registration and certification details are shared directly with buyers during enquiry, against the destination market and the product in question.',
    'We publish nothing on this page that we cannot evidence. There are no certification badges here, because a badge without a number behind it is worth nothing to a buyer doing due diligence.',
  ],
  /** The registrations a buyer would expect. Shown as a checklist of what we
      will provide on request — never as claimed holdings. */
  onRequest: [
    'Importer Exporter Code (IEC)',
    'GST registration',
    'FSSAI registration, where applicable to the product',
    'APEDA registration, where applicable',
    'Spices Board registration, where applicable',
    'Tobacco Board registration, where applicable',
    'Phytosanitary and certificate of origin documentation, per consignment',
  ],
} as const;

/* ---------------------------------------------------------------------------
   15 — ENQUIRY
   ------------------------------------------------------------------------- */

export const allUnits = [
  'Kg',
  'Metric Tons',
  'Litres',
  'Bags',
  'Cartons',
  'Pieces',
  'Barrel',
  "20' Container",
  "40' Container",
] as const;

export const purposes = ['Reselling', 'End use', 'Raw material'] as const;

export const enquiry = {
  eyebrow: 'Request a quote',
  headline: ['Tell us what', 'you’re sourcing.'],
  body: 'Give us the product, the volume and the destination. You will get a quotation and a realistic lead time from a named person — not a ticket number.',
  privacyNote:
    'We use these details only to answer your enquiry. They are not sold or shared with third parties.',
} as const;

/* ---------------------------------------------------------------------------
   FOOTER / LEGAL
   ------------------------------------------------------------------------- */

export const footer = {
  positioning:
    'Captain Exim sources agricultural and natural products from Mysuru, Karnataka, for international buyers.',
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ],
} as const;
