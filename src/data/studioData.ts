export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  client: string;
  year: string;
  image: string;
  quote?: string;
  shape: 'rect-left' | 'circle-center' | 'rect-right';
  exif: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
    lighting: string;
  };
  deliverables: string;
  summary: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  maskClass: string;
  offsetClass?: string;
  turnaround: string;
  startingRate: string;
  includes: string[];
}

export interface HighlightShot {
  id: string;
  number: string;
  label: string;
  title: string;
  image: string;
  exif: string;
  lightingNote: string;
}

export type StudioCityKey = 'Lagos (VI)' | 'Abuja' | 'London Desk';

export interface StudioLocation {
  city: StudioCityKey;
  neighborhood: string;
  address: string;
  stageSize: string;
  flagshipGear: string;
  availability: string;
}

export interface JournalEntry {
  id: string;
  issue: string;
  title: string;
  readTime: string;
  date: string;
  excerpt: string;
  paragraphs: string[];
}

export const IMAGES = {
  heroFlacon: '/src/assets/images/hero_perfume_flacon_1794317736701.jpg',
  aboutStudioRig: '/src/assets/images/about_studio_rig_1794317738309.jpg',
  portfolioSkincare: '/src/assets/images/portfolio_skincare_ori_1794317738483.jpg',
  portfolioHorology: '/src/assets/images/portfolio_coral_horology_1794317742575.jpg',
  portfolioZobo: '/src/assets/images/portfolio_zobo_elixir_1794317742311.jpg',
  portraitTunde: '/src/assets/images/portrait_tunde_bakare_1794317743051.jpg',
};

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'oro-nigeria',
    category: 'Botanical Skincare',
    title: 'Oro Nigeria',
    client: 'Oro Nigeria · Shea, Baobab & Marula Face Oil',
    year: '2025',
    image: IMAGES.portfolioSkincare,
    shape: 'rect-left',
    exif: {
      camera: 'Phase One XF IQ4 150MP',
      lens: 'Schneider Kreuznach 120mm Macro',
      aperture: 'f/11',
      shutter: '1/160s',
      iso: 'ISO 50',
      lighting: 'Dual Broncolor stripboxes + warm unbleached travertine bounce',
    },
    deliverables: '24 Hero Stills · 8 Macro Ori Texture Plates',
    summary:
      'Sculpted warm Harmattan sunlight across raw Nigerian shea butter swirls and amber apothecary glass to position indigenous botanicals for Victoria Island & Harrods shelves.',
  },
  {
    id: 'ayo-horology',
    category: 'Horology & Heritage',
    title: 'Ayo & Co. Bespoke',
    client: 'Ayo & Co. · 18k Gold & Edo Coral Edition',
    year: '2025',
    image: IMAGES.portfolioHorology,
    quote: '"Translating Nigerian craftsmanship into global desire"',
    shape: 'circle-center',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC Macro 120mm II (28-Frame Stack)',
      aperture: 'f/11',
      shutter: '1/250s',
      iso: 'ISO 64',
      lighting: 'Optical snoot specular control + negative fill flags',
    },
    deliverables: '18 Global Launch Key Visuals · Ikoyi Billboard Masters',
    summary:
      'Brushed 18k gold open-heart tourbillon photographed over hand-loomed indigo Aso-Oke and royal Benin coral beads using a 28-frame motorized focus stack.',
  },
  {
    id: 'zobo-royale',
    category: 'Craft Beverage',
    title: 'Spiked Hibiscus Zobo',
    client: 'Zobo Royale · Small-Batch Botanical Aperitif',
    year: '2025',
    image: IMAGES.portfolioZobo,
    shape: 'rect-right',
    exif: {
      camera: 'Sony Alpha 1 + Pneumatic Splash Rig',
      lens: 'FE 90mm f/2.8 Macro G OSS',
      aperture: 'f/16',
      shutter: '1/8000s (Flash Duration t0.1)',
      iso: 'ISO 100',
      lighting: '3x Profoto Pro-11 at 1/12,800s freeze mode + amber backlight',
    },
    deliverables: '16 High-Speed Splash Keyframes · Detty December OOH',
    summary:
      'Synchronized crimson hibiscus splash and tropical condensation pearls frozen at 1/12,800s against deep emerald and warm gold.',
  },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'ecommerce',
    title: 'D2C & E-Commerce',
    subtitle: 'Paystack, Shopify & Global Retail Assets',
    tag: 'D2C / Export',
    image: IMAGES.portfolioSkincare,
    maskClass: 'rounded-t-full',
    turnaround: '48–72 Hour Delivery',
    startingRate: '₦650,000 / Day Batch',
    includes: [
      'Color-calibrated sRGB & AdobeRGB masters for international export',
      'Crisp plinth & pure background knockouts with natural contact shadows',
      'Macro ingredient swatches (raw shea, black soap, hibiscus, botanical oils)',
      'Ready-to-convert crops for Paystack Storefront, Shopify, Jumia & Amazon UK/US',
    ],
  },
  {
    id: 'creative-styling',
    title: 'Afro-Luxury Campaigns',
    subtitle: 'Editorial Set Design & Billboard Key Visuals',
    tag: 'Campaigns & OOH',
    image: IMAGES.heroFlacon,
    maskClass: 'arch-mask shadow-xl',
    offsetClass: 'mt-12 md:mt-0',
    turnaround: '5–7 Business Days',
    startingRate: '₦1,850,000 / Campaign',
    includes: [
      'Bespoke prop fabrication with Nigerian terracotta, charred ebony & brass',
      'Art-directed key visuals for Lekki-Ikoyi Link Bridge & Victoria Island OOH',
      '9:16 vertical motion loops & stop-motion reels for Instagram launches',
      '16-bit frequency-separation retouching preserving authentic material grain',
    ],
  },
  {
    id: 'watch-jewelry',
    title: 'Fine Jewelry & Leather',
    subtitle: 'Coral, Gold, Horology & Handcrafted Accessories',
    tag: 'High-Craft',
    image: IMAGES.portfolioHorology,
    maskClass: 'rounded-b-full',
    turnaround: '7–10 Business Days',
    startingRate: '₦2,400,000 / Collection',
    includes: [
      '20-to-40 frame Helicon focus stacking for edge-to-edge gemstone & stitch clarity',
      'Controlled specular gradient mapping on 18k gold, brass & exotic leather',
      'Textural pairing with authentic Aso-Oke, Adire indigo, and bronze artifacts',
      'Large-format print masters for lookbooks, flagship boutiques & private trunk shows',
    ],
  },
];

export const INITIAL_HIGHLIGHTS: HighlightShot[] = [
  {
    id: 'oshuns-gold',
    number: '01',
    label: '01. Apothecary',
    title: 'Oshun’s Gold — Extrait de Parfum',
    image: IMAGES.heroFlacon,
    exif: '120mm Macro · f/11 · ISO 50',
    lightingNote: 'Warm golden rim light across carved ebony, terracotta, and raw shea.',
  },
  {
    id: 'osengwa-leather',
    number: '02',
    label: '02. Bespoke Craft',
    title: 'Osengwa — Lagos Maroquinerie & Horology',
    image: IMAGES.aboutStudioRig,
    exif: '90mm Tilt-Shift · f/14 · ISO 64',
    lightingNote: 'Optical snoot & gold reflector sculpting full-grain pebbled leather.',
  },
];

export const EXTRA_HIGHLIGHTS: HighlightShot[] = [
  {
    id: 'oro-botanicals',
    number: '03',
    label: '03. Ori & Travertine',
    title: 'Oro Nigeria Harmattan Serum',
    image: IMAGES.portfolioSkincare,
    exif: '120mm Macro · f/13 · ISO 50',
    lightingNote: 'Soft diffused side window simulation over porous stone.',
  },
  {
    id: 'ayo-coral',
    number: '04',
    label: '04. Royal Coral',
    title: 'Ayo & Co. Chronograph on Indigo Aso-Oke',
    image: IMAGES.portfolioHorology,
    exif: '120mm Macro · 28-Frame Stack · f/11',
    lightingNote: 'Micro-flags isolating sapphire crystal & brushed gold chamfers.',
  },
  {
    id: 'zobo-splash',
    number: '05',
    label: '05. High-Speed',
    title: 'Spiked Hibiscus Zobo Botanical Splash',
    image: IMAGES.portfolioZobo,
    exif: '90mm Macro · 1/12,800s Flash · f/16',
    lightingNote: 'Triple Profoto freeze heads with warm amber spot.',
  },
  {
    id: 'studio-director',
    number: '06',
    label: '06. Victoria Island Stage',
    title: 'Tunde Bakare — Medium Format Portrait',
    image: IMAGES.portraitTunde,
    exif: '80mm f/2.8 · Hasselblad 500C/M',
    lightingNote: 'Warm tungsten studio ambiance with golden key light.',
  },
];

export const STUDIO_LOCATIONS: Record<StudioCityKey, StudioLocation> = {
  'Lagos (VI)': {
    city: 'Lagos (VI)',
    neighborhood: 'Adeola Odeku & Saka Tinubu, Victoria Island',
    address: 'Plot 14, Sinari Daranijo Street, Victoria Island, Lagos',
    stageSize: '3,600 sq.ft. Cyclorama, Wet Splash Stage & Prop Vault',
    flagshipGear: 'Phase One IQ4 150MP · Broncolor Scoro 3200S · Motion Control Bolt Jr+',
    availability: 'Accepting commissions for Harmattan & Detty December Campaigns',
  },
  Abuja: {
    city: 'Abuja',
    neighborhood: 'Gana Street, Maitama District',
    address: 'No. 22 Gana Street, Maitama, Abuja FCT',
    stageSize: '2,400 sq.ft. Luxury Editorial, Jewelry & Couture Stage',
    flagshipGear: 'Hasselblad H6D-100c · Profoto Pro-11 · Motorized Focus-Stack Rail',
    availability: 'Next available slot: 10 days out',
  },
  'London Desk': {
    city: 'London Desk',
    neighborhood: 'Redchurch Street, Shoreditch (Diaspora & Export Drop-Off)',
    address: 'Unit 8, Rochelle Studio, Arnold Circus, London E2 7JS',
    stageSize: 'Dedicated courier intake for Nigerian brands exporting to UK / EU retail',
    flagshipGear: 'Remote live-tethered Capture One sessions with Lagos & London art buyers',
    availability: 'Monthly consolidated shoot weeks open',
  },
};

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'lighting-nigerian-craft',
    issue: 'Monograph 018',
    title: 'Sculpting Ori, Terracotta & Gold: Why Nigerian Luxury Demands a New Lighting Grammar',
    readTime: '4 min read',
    date: 'November 2025',
    excerpt:
      'Clinical European white-box lighting flattens the warmth of raw shea, hand-woven Aso-Oke, and beaten brass. Here is how we light West African materiality for global prestige.',
    paragraphs: [
      'When a Nigerian beauty or fragrance founder ships flacons to London, Paris, or New York, the imagery must do more than prove the bottle exists—it must transmit the heat, richness, and provenance of its ingredients.',
      'In our Victoria Island studio, we replace sterile cool-white LED banks with layered warm tungsten-balanced strobes and hand-carved ebony, Nok terracotta, and unpolished travertine plinths. By raking light at a low 15-degree angle across embossed gold foil and raw ivory shea butter, the viewer feels the weight of the object immediately.',
      'That tactile authority is what allows homegrown Nigerian labels to command luxury price points both on Paystack storefronts at home and on concept-store shelves abroad.',
    ],
  },
  {
    id: 'focus-stacking-coral-gold',
    issue: 'Monograph 017',
    title: 'From Benin Coral to Swiss Calibres: 28-Frame Focus Stacking in the Tropics',
    readTime: '3 min read',
    date: 'October 2025',
    excerpt:
      'How we pair 150-megapixel medium format optics with indigenous Nigerian textiles without losing a single thread of sharpness.',
    paragraphs: [
      'Shooting fine jewelry and horology against hand-loomed indigo Aso-Oke presents an optical challenge: the deep weave of the cloth and the specular facets of coral and 18k gold sit on vastly different focal planes.',
      'Using a motorized Cognisys rail in our climate-controlled Victoria Island vault, we capture 28 sequential frames at f/11 and blend them seamlessly—preserving both the microscopic metallic grain of the dial and the hand-spun cotton texture beneath it.',
    ],
  },
];
