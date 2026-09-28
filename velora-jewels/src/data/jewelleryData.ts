export interface JewelleryItem {
  id: string;
  name: string;
  collection: 'The Bridal Edit' | 'Diamond Essentials' | 'Golden Classics' | 'Eternal Rings' | 'Gemstone Stories' | 'Everyday Luxe';
  tagline: string;
  priceINR: number;
  image: string;
  secondaryImage?: string;
  metalOptions: ('18K Yellow Gold' | '18K Rose Gold' | '18K White Gold' | 'Platinum 950' | '22K Gold')[];
  defaultMetal: string;
  gemstones: string;
  purity: string;
  certification: string;
  description: string;
  highlightSpecs: {
    diamondWeight?: string;
    diamondQuality?: string;
    gemstoneWeight?: string;
    grossWeightApprox?: string;
  };
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  process: string[];
  deliverable: string;
  timeline: string;
  image: string;
}

export const BRAND_INFO = {
  name: 'VELORA JEWELS',
  tagline: 'Crafted to Last. Designed to Be Remembered.',
  businessType: 'Luxury Jewellery Studio',
  established: 2018,
  yearsOfCraftsmanship: '7+',
  location: 'Jaipur, Rajasthan, India',
  address: '42, MI Road, Jaipur, Rajasthan 302001, India',
  phone: '+91 91234 56780',
  phoneClean: '+919123456780',
  email: 'hello@velorajewels.com',
  instagram: '@velorajewels',
  instagramUrl: 'https://instagram.com/velorajewels',
  about: "VELORA JEWELS is a contemporary jewellery studio creating elegant gold, diamond, and gemstone pieces for life's most meaningful occasions. From timeless everyday designs to statement bridal collections, every piece is crafted with attention to detail and a modern aesthetic.",
  highlights: [
    { number: '500+', label: 'Custom Designs', description: 'One-of-a-kind bespoke creations designed exclusively for our patrons' },
    { number: '1,200+', label: 'Happy Clients', description: 'Discerning brides, collectors, and families worldwide' },
    { number: '7+', label: 'Years of Craftsmanship', description: 'Heritage Jaipur goldsmithing blended with contemporary aesthetics' },
    { number: '100%', label: 'Personalised Service', description: 'Direct one-on-one artisan consultation for every single client' },
  ],
  studioHours: 'Mon - Sun: 10:30 AM to 8:00 PM IST',
};

export const CURRENCY_RATES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
};

export type CurrencyCode = keyof typeof CURRENCY_RATES;

export const COLLECTIONS_LIST = [
  'All Pieces',
  'The Bridal Edit',
  'Diamond Essentials',
  'Golden Classics',
  'Eternal Rings',
  'Gemstone Stories',
  'Everyday Luxe',
] as const;

export const JEWELLERY_CATALOG: JewelleryItem[] = [
  // 1. The Bridal Edit
  {
    id: 'velora-bridal-01',
    name: 'Aarya Emerald & Polki Choker Suite',
    collection: 'The Bridal Edit',
    tagline: 'Regal bridal centerpiece with uncut diamonds & Zambian emerald drops',
    priceINR: 485000,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['22K Gold', '18K Yellow Gold'],
    defaultMetal: '18K Yellow Gold',
    gemstones: 'Zambian Emeralds & Natural Uncut Polki Diamonds',
    purity: '18K Yellow Gold / 22K Accent',
    certification: 'BIS Hallmarked & SGL Diamond Certificate',
    description: 'An architectural heirloom choker featuring hand-selected cushion emerald cabochons enclosed within intricate open-set uncut diamonds and natural freshwater seed pearls. Designed for statement brides in Jaipur and beyond.',
    highlightSpecs: {
      diamondWeight: '8.40 cts Polki & Pavé',
      gemstoneWeight: '14.20 cts Zambian Emeralds',
      grossWeightApprox: '78.50 grams',
    },
    featured: true,
  },
  {
    id: 'velora-bridal-02',
    name: 'Noorani Jhumkas & Chandbali Set',
    collection: 'The Bridal Edit',
    tagline: 'Artisanal cascading bridal earrings with filigree jali work',
    priceINR: 235000,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['18K Yellow Gold', '22K Gold'],
    defaultMetal: '18K Yellow Gold',
    gemstones: 'VVS-VS Diamonds & Natural South Sea Pearls',
    purity: '18K BIS Hallmarked',
    certification: 'IGI Certified Natural Diamonds',
    description: 'Masterfully sculpted jhumkas honoring Rajasthan royal court silhouettes. Featuring crescent motifs, micro-pavé brilliant diamonds, and dancing pearl drops.',
    highlightSpecs: {
      diamondWeight: '3.65 cts',
      gemstoneWeight: '6.80 cts Pearls',
      grossWeightApprox: '34.20 grams',
    },
    featured: true,
  },

  // 2. Diamond Essentials
  {
    id: 'velora-dia-01',
    name: 'Aura Solitaire Diamond Studs',
    collection: 'Diamond Essentials',
    tagline: 'Timeless round brilliant solitaires in four-prong platinum basket',
    priceINR: 195000,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['Platinum 950', '18K White Gold', '18K Yellow Gold'],
    defaultMetal: 'Platinum 950',
    gemstones: 'Natural Diamonds (DEF Colour, VVS1 Clarity)',
    purity: 'Platinum 950 / 18K Gold',
    certification: 'GIA Certified Solitaires',
    description: 'The definitive daily luxury. Hand-matched round brilliant diamond solitaires set in ultra-low profile platinum crowns to maximize light return and endless sparkle.',
    highlightSpecs: {
      diamondWeight: '1.50 cts Total Pair',
      diamondQuality: 'E Color / VVS1 / Triple Excellent Cut',
      grossWeightApprox: '4.10 grams',
    },
    featured: true,
  },
  {
    id: 'velora-dia-02',
    name: 'Celestial Diamond Tennis Bracelet',
    collection: 'Diamond Essentials',
    tagline: 'Continuous line of brilliant diamonds in fluid articulated links',
    priceINR: 360000,
    image: 'https://images.unsplash.com/photo-1611591475806-53890c29f27d?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['18K White Gold', '18K Yellow Gold', '18K Rose Gold'],
    defaultMetal: '18K White Gold',
    gemstones: 'Natural Round Brilliant Diamonds',
    purity: '18K BIS Hallmarked',
    certification: 'IGI Worldwide Certified',
    description: 'Precision-set 4-prong diamond tennis bracelet featuring double safety clasp and butter-soft articulacy that glides along the wrist seamlessly.',
    highlightSpecs: {
      diamondWeight: '4.20 cts Total',
      diamondQuality: 'F-G Color, VVS-VS Clarity',
      grossWeightApprox: '14.80 grams',
    },
    featured: false,
  },

  // 3. Golden Classics
  {
    id: 'velora-gold-01',
    name: 'Heritage MI Road Golden Bangle',
    collection: 'Golden Classics',
    tagline: 'Hand-carved solid gold statement kada with subtle brushed satin finish',
    priceINR: 285000,
    image: 'https://images.unsplash.com/photo-1611591475876-c4d3753303d8?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['18K Yellow Gold', '22K Gold'],
    defaultMetal: '22K Gold',
    gemstones: 'Pure Gold with Invisible Hinge Clasp',
    purity: '22K BIS 916 Hallmarked',
    certification: 'BIS Hallmark Certificate with HUID',
    description: 'Paying homage to Jaipur’s legendary MI Road goldsmithing quarter. Crafted in solid 22K yellow gold with hand-engraved fluted patterns and a hidden micro-click safety lock.',
    highlightSpecs: {
      grossWeightApprox: '42.60 grams',
    },
    featured: true,
  },
  {
    id: 'velora-gold-02',
    name: 'Sol Golden Link Collar Necklace',
    collection: 'Golden Classics',
    tagline: 'Modern sculpted gold links designed for contemporary layered wear',
    priceINR: 198000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['18K Yellow Gold', '18K Rose Gold'],
    defaultMetal: '18K Yellow Gold',
    gemstones: 'Accented with flush-set pavé diamond clasp',
    purity: '18K BIS Hallmarked',
    certification: 'BIS Hallmarked with Velora Studio Seal',
    description: 'A striking blend of Italian hollow-form goldsmithing and Indian artisanal warmth. Bold oval links that drape with fluid comfort against the collarbone.',
    highlightSpecs: {
      diamondWeight: '0.24 cts (Clasp Detail)',
      grossWeightApprox: '28.40 grams',
    },
    featured: false,
  },

  // 4. Eternal Rings
  {
    id: 'velora-ring-01',
    name: 'The Jaipur Solitaire Oval Ring',
    collection: 'Eternal Rings',
    tagline: 'Elongated 2.0-carat oval diamond in our signature hidden-halo setting',
    priceINR: 420000,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['Platinum 950', '18K Yellow Gold', '18K Rose Gold', '18K White Gold'],
    defaultMetal: '18K Yellow Gold',
    gemstones: 'Center Oval Solitaire + Micro Hidden Halo Diamonds',
    purity: '18K Gold / Platinum 950',
    certification: 'GIA Certified 2.01 ct (D Color / VVS2)',
    description: 'An elongated oval cut diamond chosen for exceptional fire and ratio, floating gracefully atop a razor-thin tapered gold band with an intimate hidden pavé halo underneath.',
    highlightSpecs: {
      diamondWeight: '2.01 ct Center + 0.18 ct Halo',
      diamondQuality: 'D / VVS2 / Excellent Polish & Symmetry',
      grossWeightApprox: '5.20 grams',
    },
    featured: true,
  },
  {
    id: 'velora-ring-02',
    name: 'Eternity Pavé Emerald-Cut Wedding Band',
    collection: 'Eternal Rings',
    tagline: 'Continuous circle of step-cut emerald diamonds in shared prongs',
    priceINR: 275000,
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['Platinum 950', '18K White Gold', '18K Yellow Gold'],
    defaultMetal: 'Platinum 950',
    gemstones: 'Match-calibrated Emerald Cut Diamonds',
    purity: 'Platinum 950 Hallmarked',
    certification: 'IGI Certified Diamond Band',
    description: 'Architectural clarity and quiet luxury. Step-cut diamonds selected for uniform dimensions create an endless river of crystal-clear brilliance around your finger.',
    highlightSpecs: {
      diamondWeight: '3.10 cts Total',
      diamondQuality: 'E-F Color, VVS Clarity',
      grossWeightApprox: '6.40 grams',
    },
    featured: false,
  },

  // 5. Gemstone Stories
  {
    id: 'velora-gem-01',
    name: 'The Rajasthan Emerald Royal Ring',
    collection: 'Gemstone Stories',
    tagline: 'Untreated vivid green Zambian emerald hugged by shield-cut diamonds',
    priceINR: 520000,
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['18K Yellow Gold', '18K White Gold', 'Platinum 950'],
    defaultMetal: '18K Yellow Gold',
    gemstones: 'Natural Zambian Emerald (3.80 ct) & Diamond Side Shields',
    purity: '18K BIS Hallmarked',
    certification: 'GRS Certified Natural Emerald (Minor Oil)',
    description: 'Jaipur is the emerald capital of the world. This one-of-one cocktail ring centers an electric verdant 3.8-carat emerald framed by bespoke geometric shield-cut diamonds.',
    highlightSpecs: {
      gemstoneWeight: '3.80 ct Vivid Green Emerald',
      diamondWeight: '0.85 ct Shield Diamonds',
      grossWeightApprox: '8.90 grams',
    },
    featured: true,
  },
  {
    id: 'velora-gem-02',
    name: 'Pigeon Blood Ruby & Diamond Drop Earrings',
    collection: 'Gemstone Stories',
    tagline: 'Cushion rubies set in warm gold with cascading diamond leaves',
    priceINR: 340000,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['18K Yellow Gold', '18K Rose Gold'],
    defaultMetal: '18K Yellow Gold',
    gemstones: 'Unheated Burmese Rubies & Marquise Diamonds',
    purity: '18K BIS Hallmarked',
    certification: 'Gubelin / IGI Gemstone Certificate',
    description: 'Capturing passionate crimson fire, these drop earrings feature saturated natural rubies accented with brilliant marquise diamonds reminiscent of royal Rajasthani flora.',
    highlightSpecs: {
      gemstoneWeight: '4.40 cts Total Rubies',
      diamondWeight: '1.20 cts Marquise Diamonds',
      grossWeightApprox: '12.40 grams',
    },
    featured: false,
  },

  // 6. Everyday Luxe
  {
    id: 'velora-luxe-01',
    name: 'Petite Lumière Bezel Diamond Pendant',
    collection: 'Everyday Luxe',
    tagline: 'Minimalist floating diamond on a shimmering diamond-cut cable chain',
    priceINR: 68000,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['18K Yellow Gold', '18K Rose Gold', '18K White Gold'],
    defaultMetal: '18K Yellow Gold',
    gemstones: 'Round Brilliant Diamond (0.35 ct)',
    purity: '18K BIS Hallmarked',
    certification: 'IGI Certified Diamond',
    description: 'A smooth bezel rim encloses a glittering round diamond that catches light with every breath. Effortless, comfortable, and designed to never be taken off.',
    highlightSpecs: {
      diamondWeight: '0.35 ct',
      diamondQuality: 'E Color / VS1 Clarity',
      grossWeightApprox: '3.20 grams',
    },
    featured: true,
  },
  {
    id: 'velora-luxe-02',
    name: 'Aethel Stackable Huggie Hoops',
    collection: 'Everyday Luxe',
    tagline: 'Micro pavé huggies in solid gold with seamless snap-lock closure',
    priceINR: 52000,
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1000&auto=format&fit=crop',
    metalOptions: ['18K Yellow Gold', '18K Rose Gold', '18K White Gold'],
    defaultMetal: '18K Yellow Gold',
    gemstones: 'Micro Pavé Natural Diamonds',
    purity: '18K BIS Hallmarked',
    certification: 'Velora Studio Hallmark with IGI Certificate',
    description: 'The holy grail of everyday ear wear. Designed with zero snag points, gentle curves, and pavé diamonds that sparkle from day to night.',
    highlightSpecs: {
      diamondWeight: '0.28 cts',
      grossWeightApprox: '2.90 grams',
    },
    featured: false,
  },
];

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'custom-jewellery-design',
    title: 'Custom Jewellery Design',
    shortDesc: 'Collaborative bespoke creations from your vision to finished fine jewelry.',
    fullDesc: 'Work directly with our creative director and senior gemologists in Jaipur. Whether inspired by a personal sketch, family symbol, or a distinctive aesthetic, we transform concepts into 3D CAD renders, source certified gemstones, and hand-craft in 18K/22K gold or Platinum.',
    iconName: 'Sparkles',
    process: [
      'Discovery Consultation & Moodboard',
      'Artisanal Gouache Sketch & 3D CAD Model',
      'Hand-Selection of Diamonds & Gemstones',
      'Handcrafted by Jaipur Master Karigars',
      'BIS Hallmarking, Certification & Presentation Box',
    ],
    deliverable: 'One-of-one custom fine jewellery piece with full design certificates.',
    timeline: '3 to 5 weeks from approved design',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'engagement-wedding-rings',
    title: 'Engagement & Wedding Rings',
    shortDesc: 'Signature engagement rings and timeless bespoke wedding bands.',
    fullDesc: 'We specialize in ethically certified diamonds (GIA, IGI) and rare precious gemstones mounted in bespoke settings. Every ring is engineered for comfort, maximum light performance, and a lifetime of daily wear.',
    iconName: 'HeartHandshake',
    process: [
      'Stone Education & Diamond Sourcing (DEF / VVS)',
      'Profile & Setting Selection (Hidden Halo, Solitaire, Pavé)',
      'Precise Finger Sizing & Ring Balance Fitting',
      'Hand-Setting & Micro-Polishing',
    ],
    deliverable: 'Lifetime warranty, free annual re-polishing, and official GIA certificate.',
    timeline: '2 to 3 weeks',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'bridal-jewellery-consultation',
    title: 'Bridal Jewellery Consultation',
    shortDesc: 'Dedicated trousseau styling paired with your wedding lehenga & decor.',
    fullDesc: 'Our bridal styling atelier works with you and your bridal couturier. We balance neckline geometries, embroidery metallics, and heirloom pieces so your wedding look is harmonious, royal, and uniquely yours.',
    iconName: 'Crown',
    process: [
      'Bridal Couture & Color Palette Review',
      'Choker, Haar & Matha Patti Geometry Matching',
      'Custom Trousseau Layering Plan',
      'Final Trial & High Jewellery Delivery',
    ],
    deliverable: 'Complete Bridal Trousseau Suite with protective travel vault case.',
    timeline: '4 to 8 weeks for complete trousseau',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'jewellery-personalisation',
    title: 'Jewellery Personalisation',
    shortDesc: 'Bespoke hand-engraving, secret birthstones, initials, and coordinates.',
    fullDesc: 'Infuse private significance into every piece. From hand-chiseled calligraphy inside ring bands to flush-set secret birthstones hidden on the inside culet, your jewellery becomes a private talisman.',
    iconName: 'Fingerprint',
    process: [
      'Inscription Selection (Calligraphy, Roman, Devanagari)',
      'Micro-Stone Placement (Birthstones or Sapphires)',
      'Artisan Hand-Engraving under microscope',
    ],
    deliverable: 'Personalized heirloom with provenance card.',
    timeline: '3 to 5 business days',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'jewellery-remodelling',
    title: 'Jewellery Remodelling',
    shortDesc: 'Reimagine ancestral gold and gemstones into modern wearable heirlooms.',
    fullDesc: 'Do you have ancestral jewellery sitting unused in a bank locker? We respectfully unmount your family heirloom stones, melt and purify your gold into fresh 18K/22K alloy, and craft modern, lightweight pieces you will wear with joy every day.',
    iconName: 'RefreshCw',
    process: [
      'Detailed Assessment & Stone Mapping of Heirloom Piece',
      'Safe Extraction & Ultrasonic Cleaning of Vintage Gems',
      'Modern Contemporary Redesign Concepts',
      'Creation of Modern Setting Preserving Heritage Sentiment',
    ],
    deliverable: 'Modernized wearable heirloom with complete metal valuation report.',
    timeline: '3 to 4 weeks',
    image: 'https://images.unsplash.com/photo-1611591475876-c4d3753303d8?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'gift-jewellery',
    title: 'Gift Jewellery',
    shortDesc: 'Curated luxury gift concierge with handmade wooden velvet gift packaging.',
    fullDesc: 'Celebrate milestone anniversaries, push presents, birthdays, and celebrations. Includes hand-tied silk ribbons, wax-sealed certificates, and bespoke calligraphy message cards.',
    iconName: 'Gift',
    process: [
      'Consultation on Milestone & Budget',
      'Immediate Ready-to-Ship Luxury Curation',
      'Bespoke Velvet Packaging & Wax-Sealed Note',
      'White-Glove Insured Delivery',
    ],
    deliverable: 'Velora signature keepsake box and certificate of authenticity.',
    timeline: 'Same-day dispatch or 48-hour delivery across India / Express global shipping',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'private-appointments',
    title: 'Private Appointments',
    shortDesc: 'VIP private viewing at our MI Road Jaipur Studio or worldwide virtual suite.',
    fullDesc: 'Experience luxury without rush. Enjoy champagne, Rajasthani royal kahwa, and unobstructed access to our entire high jewellery vault. For overseas and outstation clients, we offer high-definition 4K virtual consultations.',
    iconName: 'CalendarCheck',
    process: [
      'Schedule Preferred Date & Time',
      'Curated Selection Prepared Prior to Your Arrival',
      'Dedicated One-on-One Gemologist Host',
      'Private Lounge Hospitality',
    ],
    deliverable: 'Dedicated VIP consultation with zero pressure and bespoke styling advice.',
    timeline: 'Flexible booking slots 7 days a week',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
  },
];

export const TESTIMONIALS = [
  {
    quote: "Our bespoke bridal choker and wedding bands were crafted by Velora Jewels for our Jaipur palace wedding. The attention to the Zambian emerald hue and comfort during long ceremonies was exceptional.",
    author: "Ananya & Rohan Singhania",
    location: "Jaipur & London",
    collection: "The Bridal Edit & Eternal Rings",
    rating: 5,
  },
  {
    quote: "I wanted to remodel my grandmother's 50-year-old Burmese rubies into contemporary ear drops and a daily ring. Velora preserved the soul of the stones while giving them an undeniably chic modern feel.",
    author: "Meera Deshmukh",
    location: "Mumbai",
    collection: "Jewellery Remodelling",
    rating: 5,
  },
  {
    quote: "Ordered my fiancée's oval solitaire engagement ring virtually from New York. The 4K video consultations and GIA stone guidance felt as intimate and transparent as being inside their Jaipur studio.",
    author: "Karan Varma",
    location: "Manhattan, New York",
    collection: "Custom Engagement Ring",
    rating: 5,
  },
];

export const FAQS = [
  {
    question: "Where is the Velora Jewels studio located, and can I visit without an appointment?",
    answer: "Our flagship luxury studio is located at 42, MI Road, Jaipur, Rajasthan 302001. While walk-ins are warmly welcomed during studio hours (10:30 AM to 8:00 PM), we strongly recommend booking a private appointment so our senior gemologist and private lounge can be exclusively reserved for you.",
  },
  {
    question: "Are your gold and diamonds certified and hallmarked?",
    answer: "Yes, without exception. 100% of our gold jewellery is BIS Hallmarked with individual HUID authentication. All solitaire diamonds above 0.30 ct are certified by GIA or IGI. Our gemstones carry certified origin reports from renowned gemological laboratories like GRS and Gubelin.",
  },
  {
    question: "How does the custom jewellery design process work?",
    answer: "You share your reference idea, gemstone preference, and budget. Our designers create hand-drawn gouache sketches followed by photorealistic 3D CAD models. Once you approve every dimension, our master karigars handcraft your piece in 3 to 5 weeks.",
  },
  {
    question: "Do you offer insured international shipping?",
    answer: "Yes. We offer complimentary insured domestic delivery across India and door-to-door worldwide insured shipping to the United States, UK, UAE, Canada, Australia, and Europe via specialized high-value couriers.",
  },
  {
    question: "What is your jewellery remodelling service?",
    answer: "We assess your ancestral gold and gemstones, safely unmount the stones, test and purify the gold alloy, and create a brand-new contemporary design that matches your lifestyle while preserving family sentiment.",
  },
];
