import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Send, 
  Calendar, 
  ShieldCheck, 
  RotateCcw, 
  Share2, 
  Info,
  Gem
} from 'lucide-react';
import { CURRENCY_RATES, CurrencyCode, BRAND_INFO } from '../data/jewelleryData';

interface BespokeStudioCustomizerProps {
  currentCurrency: CurrencyCode;
  onBookWithCustomDesign: (designSummary: string) => void;
}

export const BespokeStudioCustomizer: React.FC<BespokeStudioCustomizerProps> = ({
  currentCurrency,
  onBookWithCustomDesign,
}) => {
  const [pieceType, setPieceType] = useState<'ring' | 'choker' | 'earrings' | 'bracelet'>('ring');
  const [metal, setMetal] = useState<'18k-yellow' | '18k-rose' | '18k-white' | 'platinum' | '22k-gold'>('18k-yellow');
  const [gemstone, setGemstone] = useState<'diamond-round' | 'diamond-oval' | 'emerald' | 'ruby' | 'sapphire' | 'polki'>('diamond-round');
  const [stoneSize, setStoneSize] = useState<string>('1.50 ct');
  const [accentStyle, setAccentStyle] = useState<'solitaire' | 'hidden-halo' | 'pave-band' | 'halo'>('hidden-halo');
  const [engravingText, setEngravingText] = useState<string>('V & K • FOREVER');
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  const currencyConfig = CURRENCY_RATES[currentCurrency];

  // Base pricing matrix in INR
  const basePrices: Record<string, number> = {
    ring: 120000,
    choker: 320000,
    earrings: 160000,
    bracelet: 210000,
  };

  const metalMultipliers: Record<string, number> = {
    '18k-yellow': 1.0,
    '18k-rose': 1.05,
    '18k-white': 1.08,
    'platinum': 1.25,
    '22k-gold': 1.2,
  };

  const gemstoneAddons: Record<string, number> = {
    'diamond-round': 140000,
    'diamond-oval': 165000,
    'emerald': 190000,
    'ruby': 175000,
    'sapphire': 155000,
    'polki': 130000,
  };

  const sizeMultipliers: Record<string, number> = {
    '0.75 ct': 0.75,
    '1.00 ct': 1.0,
    '1.50 ct': 1.45,
    '2.00 ct': 2.1,
    '3.00+ ct': 3.2,
  };

  const accentAddons: Record<string, number> = {
    'solitaire': 0,
    'hidden-halo': 22000,
    'pave-band': 38000,
    'halo': 45000,
  };

  const calculatedPriceINR = Math.round(
    (basePrices[pieceType] + (gemstoneAddons[gemstone] * sizeMultipliers[stoneSize])) *
    metalMultipliers[metal] +
    accentAddons[accentStyle]
  );

  const formatPrice = (priceINR: number) => {
    const converted = priceINR * currencyConfig.rate;
    if (currentCurrency === 'INR') {
      return `${currencyConfig.symbol}${priceINR.toLocaleString('en-IN')}`;
    }
    return `${currencyConfig.symbol}${Math.round(converted).toLocaleString()}`;
  };

  // Human-readable labels
  const metalLabels = {
    '18k-yellow': '18K Yellow Gold (BIS 750)',
    '18k-rose': '18K Warm Rose Gold',
    '18k-white': '18K Lustrous White Gold',
    'platinum': 'Platinum 950 (Pt950)',
    '22k-gold': '22K Royal Gold (BIS 916)',
  };

  const gemstoneLabels = {
    'diamond-round': 'DEF VVS Round Brilliant Solitaire',
    'diamond-oval': 'D-Color Oval Brilliant Diamond',
    'emerald': 'Natural Zambian Vivid Emerald',
    'ruby': 'Burmese Pigeon Blood Ruby',
    'sapphire': 'Royal Ceylon Blue Sapphire',
    'polki': 'Natural Uncut Syndicate Polki',
  };

  // Colors for dynamic visualizer
  const getMetalColor = () => {
    switch (metal) {
      case '18k-yellow': return { primary: '#d4af37', light: '#fdeb94', dark: '#8f721c', bg: '#2b2311' };
      case '18k-rose': return { primary: '#e0a38b', light: '#fad4c5', dark: '#9c5f4a', bg: '#2c1e19' };
      case '18k-white': return { primary: '#e2e4e8', light: '#ffffff', dark: '#9ba1a8', bg: '#1c1f24' };
      case 'platinum': return { primary: '#d5dae2', light: '#f4f6fa', dark: '#88909c', bg: '#1a1d22' };
      case '22k-gold': return { primary: '#e6b325', light: '#ffdf70', dark: '#a0780a', bg: '#332709' };
      default: return { primary: '#d4af37', light: '#fdeb94', dark: '#8f721c', bg: '#2b2311' };
    }
  };

  const getGemstoneColor = () => {
    switch (gemstone) {
      case 'diamond-round':
      case 'diamond-oval':
        return { fill: '#f0f8ff', stroke: '#cce5ff', glow: 'rgba(255, 255, 255, 0.9)' };
      case 'emerald':
        return { fill: '#147a46', stroke: '#36d383', glow: 'rgba(54, 211, 131, 0.6)' };
      case 'ruby':
        return { fill: '#9b111e', stroke: '#e63946', glow: 'rgba(230, 57, 70, 0.6)' };
      case 'sapphire':
        return { fill: '#0f388a', stroke: '#4a8fe7', glow: 'rgba(74, 143, 231, 0.6)' };
      case 'polki':
        return { fill: '#dcd6c8', stroke: '#ffd166', glow: 'rgba(255, 209, 102, 0.5)' };
      default:
        return { fill: '#ffffff', stroke: '#d4af37', glow: 'rgba(255, 255, 255, 0.8)' };
    }
  };

  const metalTheme = getMetalColor();
  const stoneTheme = getGemstoneColor();

  const bespokeSummary = `Velora Jewels Bespoke Commission:\n- Piece: ${pieceType.toUpperCase()}\n- Metal: ${metalLabels[metal]}\n- Center Stone: ${gemstoneLabels[gemstone]} (${stoneSize})\n- Setting Style: ${accentStyle}\n- Engraving: "${engravingText}"\n- Est. Investment: ${formatPrice(calculatedPriceINR)}`;

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(`Hello Velora Jewels Studio Jaipur,\n\nI just designed a bespoke piece on your website:\n\n${bespokeSummary}\n\nI would love to discuss this design with your artisan team.`);
    window.open(`https://wa.me/${BRAND_INFO.phoneClean}?text=${encoded}`, '_blank');
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(bespokeSummary);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  return (
    <section id="bespoke-studio" className="py-24 bg-[#09090b] relative border-t border-[#1c1813]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171512] border border-[#d4af37]/30 text-[#e5c378] text-xs uppercase tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive Custom Atelier</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f8f5ee] font-light tracking-wide">
            Design Your <span className="italic font-normal gold-gradient-text">Bespoke Heirlooms</span>
          </h2>

          <p className="text-sm sm:text-base text-[#a89d8b] font-light leading-relaxed">
            Configure your dream fine jewellery piece in real time. Choose from conflict-free certified stones, precious metal alloys, and bespoke hand-engravings crafted in our Jaipur studio.
          </p>
        </div>

        {/* The Interactive Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls (7 Columns) */}
          <div className="lg:col-span-7 bg-[#121110] border border-[#2a231a] rounded-2xl p-6 sm:p-8 space-y-7 shadow-xl">
            
            {/* Step 1: Piece Category */}
            <div>
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3 flex items-center gap-1.5">
                <span>1. Select Piece Silhouette</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'ring', label: 'Solitaire Ring' },
                  { id: 'choker', label: 'Choker / Haar' },
                  { id: 'earrings', label: 'Earrings' },
                  { id: 'bracelet', label: 'Tennis Kada' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setPieceType(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      pieceType === item.id
                        ? 'bg-[#221c14] border-[#d4af37] text-[#faedd0] shadow-md font-semibold'
                        : 'bg-[#161412] border-[#29221a] text-[#a19685] hover:border-[#3d3326]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Precious Metal */}
            <div>
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3 flex items-center justify-between">
                <span>2. Precious Metal Alloy</span>
                <span className="text-[11px] text-[#8e8371] font-normal">{metalLabels[metal]}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: '18k-yellow', label: '18K Yellow Gold', badge: 'Classic' },
                  { id: '18k-rose', label: '18K Rose Gold', badge: 'Romantic' },
                  { id: '18k-white', label: '18K White Gold', badge: 'Modern' },
                  { id: 'platinum', label: 'Platinum 950', badge: 'Ultra Durable' },
                  { id: '22k-gold', label: '22K Royal Gold', badge: 'Jaipur Heirloom' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setMetal(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      metal === item.id
                        ? 'bg-[#221c14] border-[#d4af37] text-[#faedd0] shadow'
                        : 'bg-[#161412] border-[#29221a] text-[#a19685] hover:border-[#3d3326]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#f0e9dc]">{item.label}</div>
                    <div className="text-[10px] text-[#786e5e]">{item.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Center Gemstone */}
            <div>
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3 flex items-center justify-between">
                <span>3. Center Precious Gemstone</span>
                <span className="text-[11px] text-[#8e8371] font-normal">{gemstoneLabels[gemstone]}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'diamond-round', name: 'Round Diamond', grade: 'DEF / VVS1' },
                  { id: 'diamond-oval', name: 'Oval Solitaire', grade: 'D-Color GIA' },
                  { id: 'emerald', name: 'Zambian Emerald', grade: 'Vivid Green' },
                  { id: 'ruby', name: 'Burmese Ruby', grade: 'Pigeon Blood' },
                  { id: 'sapphire', name: 'Ceylon Sapphire', grade: 'Royal Blue' },
                  { id: 'polki', name: 'Syndicate Polki', grade: 'Natural Uncut' },
                ].map(stone => (
                  <button
                    key={stone.id}
                    onClick={() => setGemstone(stone.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      gemstone === stone.id
                        ? 'bg-[#221c14] border-[#d4af37] text-[#faedd0] shadow'
                        : 'bg-[#161412] border-[#29221a] text-[#a19685] hover:border-[#3d3326]'
                    }`}
                  >
                    <div className="text-xs font-medium text-[#f2ece2]">{stone.name}</div>
                    <div className="text-[10px] text-[#8a7e6d]">{stone.grade}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Stone Weight / Carat */}
            <div>
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3">
                4. Primary Stone Carat Weight
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {['0.75 ct', '1.00 ct', '1.50 ct', '2.00 ct', '3.00+ ct'].map(sz => (
                  <button
                    key={sz}
                    onClick={() => setStoneSize(sz)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      stoneSize === sz
                        ? 'bg-[#d4af37] text-[#0c0c0e] font-bold border-[#d4af37]'
                        : 'bg-[#161412] border-[#29221a] text-[#aba08e] hover:border-[#403629]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Accent Style & Inscription */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
                  5. Setting Detailing
                </label>
                <select
                  value={accentStyle}
                  onChange={(e) => setAccentStyle(e.target.value as any)}
                  className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3 py-2.5 text-xs text-[#faedd0] outline-none"
                >
                  <option value="solitaire">Classic Clean Solitaire</option>
                  <option value="hidden-halo">Intimate Hidden Diamond Halo</option>
                  <option value="pave-band">Micro-Pavé Diamond Band</option>
                  <option value="halo">Statement Royal Outer Halo</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
                  6. Hand Engraving (Complementary)
                </label>
                <input
                  type="text"
                  maxLength={24}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="Initials or Wedding Date..."
                  className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3 py-2.5 text-xs text-[#faedd0] placeholder-[#665d50] outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

          </div>

          {/* Right Visualizer & Dynamic Summary Card (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Visualizer Frame */}
            <div className="bg-[#12110f] border border-[#312a20] rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between text-xs text-[#8c806e] mb-4">
                <span className="uppercase tracking-widest text-[10px] text-[#d4af37] font-semibold">Atelier Live Preview</span>
                <span className="text-[10px]">Scale 1:1 Render</span>
              </div>

              {/* Dynamic SVG Visual Representation of the Jewellery */}
              <div 
                className="w-64 h-64 mx-auto rounded-full flex items-center justify-center relative p-4 transition-all duration-500 shadow-inner"
                style={{
                  backgroundColor: metalTheme.bg,
                  boxShadow: `inset 0 0 50px rgba(0,0,0,0.8), 0 0 30px ${metalTheme.primary}20`,
                  border: `1.5px solid ${metalTheme.primary}40`,
                }}
              >
                {/* SVG Blueprint */}
                <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-2xl">
                  <defs>
                    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={metalTheme.light} />
                      <stop offset="50%" stopColor={metalTheme.primary} />
                      <stop offset="100%" stopColor={metalTheme.dark} />
                    </linearGradient>
                    <radialGradient id="gemGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="35%" stopColor={stoneTheme.stroke} />
                      <stop offset="100%" stopColor={stoneTheme.fill} />
                    </radialGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {pieceType === 'ring' && (
                    <>
                      {/* Ring Band */}
                      <circle cx="100" cy="115" r="54" fill="none" stroke="url(#metalGrad)" strokeWidth={accentStyle === 'pave-band' ? "9" : "7"} />
                      <circle cx="100" cy="115" r="47" fill="none" stroke="#000" strokeWidth="1" opacity="0.4" />
                      
                      {/* Prongs */}
                      <path d="M 88 56 L 93 68 L 100 64 L 107 68 L 112 56" fill="none" stroke="url(#metalGrad)" strokeWidth="3.5" />

                      {/* Hidden halo accents */}
                      {accentStyle === 'hidden-halo' && (
                        <circle cx="100" cy="67" r="14" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2,2" />
                      )}

                      {/* Center Stone */}
                      {gemstone === 'diamond-oval' ? (
                        <ellipse cx="100" cy="56" rx="20" ry="25" fill="url(#gemGrad)" stroke={stoneTheme.stroke} strokeWidth="1.5" filter="url(#glow)" />
                      ) : (
                        <circle cx="100" cy="56" r="21" fill="url(#gemGrad)" stroke={stoneTheme.stroke} strokeWidth="1.5" filter="url(#glow)" />
                      )}
                    </>
                  )}

                  {pieceType === 'choker' && (
                    <>
                      {/* Choker Curves */}
                      <path d="M 30 75 Q 100 135 170 75" fill="none" stroke="url(#metalGrad)" strokeWidth="8" />
                      <path d="M 40 92 Q 100 152 160 92" fill="none" stroke="url(#metalGrad)" strokeWidth="4" />
                      {/* Center Gem Pendant */}
                      <circle cx="100" cy="142" r="20" fill="url(#gemGrad)" stroke={stoneTheme.stroke} strokeWidth="1.5" filter="url(#glow)" />
                      <circle cx="100" cy="142" r="26" fill="none" stroke="url(#metalGrad)" strokeWidth="2" strokeDasharray="3,2" />
                    </>
                  )}

                  {pieceType === 'earrings' && (
                    <>
                      {/* Earring Tops */}
                      <circle cx="65" cy="55" r="9" fill="url(#metalGrad)" />
                      <circle cx="135" cy="55" r="9" fill="url(#metalGrad)" />
                      {/* Drops */}
                      <line x1="65" y1="64" x2="65" y2="105" stroke="url(#metalGrad)" strokeWidth="3" />
                      <line x1="135" y1="64" x2="135" y2="105" stroke="url(#metalGrad)" strokeWidth="3" />
                      {/* Lower Gemstones */}
                      <circle cx="65" cy="115" r="16" fill="url(#gemGrad)" stroke={stoneTheme.stroke} strokeWidth="1.5" filter="url(#glow)" />
                      <circle cx="135" cy="115" r="16" fill="url(#gemGrad)" stroke={stoneTheme.stroke} strokeWidth="1.5" filter="url(#glow)" />
                    </>
                  )}

                  {pieceType === 'bracelet' && (
                    <>
                      {/* Oval Tennis Kada */}
                      <ellipse cx="100" cy="100" rx="70" ry="52" fill="none" stroke="url(#metalGrad)" strokeWidth="9" />
                      {/* Repeating stones */}
                      <ellipse cx="100" cy="100" rx="70" ry="52" fill="none" stroke={stoneTheme.stroke} strokeWidth="4" strokeDasharray="5,6" />
                      {/* Center Focal Gem */}
                      <circle cx="100" cy="48" r="14" fill="url(#gemGrad)" stroke="#ffffff" strokeWidth="1.5" filter="url(#glow)" />
                    </>
                  )}
                </svg>
              </div>

              {/* Inscription preview */}
              {engravingText && (
                <div className="mt-4 py-1.5 px-3 rounded bg-[#0b0a09] border border-[#2b251d] text-[11px] text-[#d4af37] font-mono tracking-widest">
                  Engraved: &quot;{engravingText}&quot;
                </div>
              )}

              {/* Pricing Estimation & Guarantee */}
              <div className="mt-6 pt-5 border-t border-[#26211a] text-left space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#8a7e6d]">Estimated Investment</div>
                    <div className="font-serif text-3xl text-[#faedd0] font-light">
                      {formatPrice(calculatedPriceINR)}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#736857]">
                    <div>Includes 100% CAD</div>
                    <div>BIS Hallmark + Certs</div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => onBookWithCustomDesign(bespokeSummary)}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f29] text-[#0b0b0d] text-xs uppercase tracking-widest font-semibold hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Studio Appointment with this Spec</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full py-2.5 rounded-lg bg-[#191714] border border-[#25d366]/40 hover:border-[#25d366] text-[#25d366] hover:bg-[#25d366]/10 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire this Specification on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopySummary}
                    className="w-full py-2 text-[11px] text-[#9c907e] hover:text-[#d4af37] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>{copiedStatus ? '✓ Specification Copied to Clipboard' : 'Copy Design Specs'}</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Atelier Guarantee Pill */}
            <div className="p-4 rounded-xl bg-[#141210] border border-[#2b251d] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div className="text-xs text-[#a39886]">
                <strong className="text-[#eee8dc]">Velora Bespoke Promise:</strong> Unlimited CAD revisions until you fall in love. 100% buyback guarantee on gold purity.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
