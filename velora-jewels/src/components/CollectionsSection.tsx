import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  Eye, 
  Check, 
  SlidersHorizontal, 
  Search, 
  ArrowUpRight, 
  MessageCircle,
  ShieldCheck,
  Gem
} from 'lucide-react';
import { 
  JewelleryItem, 
  JEWELLERY_CATALOG, 
  COLLECTIONS_LIST, 
  CURRENCY_RATES, 
  CurrencyCode,
  BRAND_INFO 
} from '../data/jewelleryData';

interface CollectionsSectionProps {
  currentCurrency: CurrencyCode;
  wishlistIds: string[];
  onToggleWishlist: (item: JewelleryItem) => void;
  onQuickView: (item: JewelleryItem) => void;
  onInquireItem: (item: JewelleryItem) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  currentCurrency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onInquireItem,
}) => {
  const [activeCollection, setActiveCollection] = useState<string>('All Pieces');
  const [selectedMetals, setSelectedMetals] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const currencyConfig = CURRENCY_RATES[currentCurrency];

  const formatPrice = (priceINR: number) => {
    const converted = priceINR * currencyConfig.rate;
    if (currentCurrency === 'INR') {
      return `${currencyConfig.symbol}${priceINR.toLocaleString('en-IN')}`;
    }
    return `${currencyConfig.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const handleSelectMetal = (itemId: string, metal: string) => {
    setSelectedMetals(prev => ({ ...prev, [itemId]: metal }));
  };

  // Filter items
  const filteredItems = JEWELLERY_CATALOG.filter(item => {
    const matchesCollection = activeCollection === 'All Pieces' || item.collection === activeCollection;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gemstones.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
    if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Collection metadata subtitles
  const collectionDescriptions: Record<string, string> = {
    'All Pieces': 'Discover our complete curation of handcrafted contemporary luxury fine jewellery.',
    'The Bridal Edit': 'Statement bridal jewellery hand-set with uncut polki, Zambian emeralds, and pearls.',
    'Diamond Essentials': 'Elegant diamond rings, tennis bracelets, and certified solitaire earrings.',
    'Golden Classics': 'Traditional and contemporary 18k and 22k gold jewellery honoring royal Jaipur roots.',
    'Eternal Rings': 'Engagement & wedding rings crafted for everlasting devotion with conflict-free stones.',
    'Gemstone Stories': 'Rare ruby, emerald, and sapphire high jewellery celebrating vivid natural colors.',
    'Everyday Luxe': 'Minimal, understated fine jewellery designed for daily modern elegance.',
  };

  return (
    <section id="collections" className="py-24 bg-[#0c0c0e] relative border-t border-[#1f1b15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1915] border border-[#d4af37]/30 text-[#e5c378] text-xs uppercase tracking-widest">
            <Gem className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Curated Haute Joaillerie</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f8f5ee] font-light tracking-wide">
            Signature <span className="italic font-normal gold-gradient-text">Collections</span>
          </h2>

          <p className="text-sm sm:text-base text-[#a89d8b] font-light leading-relaxed">
            {collectionDescriptions[activeCollection] || 'Each piece is individually hallmarked and designed with timeless proportion in our Jaipur studio.'}
          </p>
        </div>

        {/* Filter Tabs & Search / Sort Controls */}
        <div className="space-y-6 mb-12">
          
          {/* Collection Pills (Horizontal Scrollable on Mobile) */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {COLLECTIONS_LIST.map((col) => {
              const isActive = activeCollection === col;
              return (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b38f29] text-[#0c0c0e] shadow-[0_2px_14px_rgba(212,175,55,0.3)] font-semibold'
                      : 'bg-[#151311] text-[#b8ad9c] hover:text-[#faedd0] hover:bg-[#1f1c18] border border-[#2b251d]'
                  }`}
                >
                  {col}
                </button>
              );
            })}
          </div>

          {/* Search Bar & Sorter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141210] p-3.5 rounded-xl border border-[#26211a]">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#756a59]" />
              <input
                type="text"
                placeholder="Search emeralds, solitaires, gold..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#0e0d0b] border border-[#332b21] rounded-lg text-xs text-[#ede6d8] placeholder-[#756a59] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Results count & Sort */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="text-xs text-[#9c917f]">
                Showing <span className="text-[#f5eedf] font-medium">{sortedItems.length}</span> pieces
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#0e0d0b] text-xs text-[#ede6d8] border border-[#332b21] rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Product Cards Grid */}
        {sortedItems.length === 0 ? (
          <div className="text-center py-16 bg-[#131210] rounded-2xl border border-[#26211b] space-y-3">
            <Gem className="w-10 h-10 text-[#7a6f5d] mx-auto" />
            <div className="font-serif text-xl text-[#f3ece0]">No matching jewellery pieces found</div>
            <p className="text-xs text-[#9c907e]">Try adjusting your search keywords or explore another signature collection.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCollection('All Pieces'); }}
              className="mt-3 text-xs uppercase tracking-wider text-[#d4af37] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => {
              const isWishlisted = wishlistIds.includes(item.id);
              const activeMetal = selectedMetals[item.id] || item.defaultMetal;

              return (
                <div
                  key={item.id}
                  className="group bg-[#131210] rounded-xl overflow-hidden border border-[#28221a] hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                >
                  {/* Top Image Showcase */}
                  <div className="relative aspect-[4/4.5] overflow-hidden bg-[#181614]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter saturate-[1.03]"
                      loading="lazy"
                    />

                    {/* Collection Badge */}
                    <div className="absolute top-3 left-3 bg-[#0d0c0e]/85 backdrop-blur-md border border-[#3b3225] text-[#d4af37] text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded">
                      {item.collection}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(item)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        isWishlisted
                          ? 'bg-[#d4af37] text-[#0c0c0e]'
                          : 'bg-[#0d0c0e]/70 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0c0c0e]'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Overlay Button */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => onQuickView(item)}
                        className="w-full py-2 bg-[#0e0d0b]/90 backdrop-blur-md border border-[#d4af37]/60 text-[#fbf5eb] hover:bg-[#d4af37] hover:text-[#0c0c0e] text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Specifications</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    
                    <div>
                      {/* Purity & Hallmark Info */}
                      <div className="flex items-center justify-between text-[11px] text-[#8f8574] mb-1">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                          {item.purity}
                        </span>
                        <span>{item.certification.split('&')[0]}</span>
                      </div>

                      {/* Product Title */}
                      <h3 
                        onClick={() => onQuickView(item)}
                        className="font-serif text-lg text-[#f7f3ea] font-normal leading-snug group-hover:text-[#faedd0] cursor-pointer"
                      >
                        {item.name}
                      </h3>

                      {/* Gemstone / Accent Subtitle */}
                      <p className="text-xs text-[#a39783] line-clamp-1 mt-1">
                        {item.gemstones}
                      </p>
                    </div>

                    {/* Metal Switcher Swatches */}
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#756a59] mb-1.5 flex items-center justify-between">
                        <span>Selected Metal:</span>
                        <span className="text-[#c8bfae] font-medium">{activeMetal}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.metalOptions.map((metal) => {
                          const isSelected = activeMetal === metal;
                          return (
                            <button
                              key={metal}
                              onClick={() => handleSelectMetal(item.id, metal)}
                              className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                                isSelected
                                  ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#faedd0]'
                                  : 'border-[#2e271f] text-[#8a7f6f] hover:border-[#4d4233]'
                              }`}
                            >
                              {metal.replace('18K ', '').replace('22K ', '')}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-[#211d17] flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#827766]">Investment</div>
                        <div className="text-base sm:text-lg font-serif font-medium text-[#faedd0]">
                          {formatPrice(item.priceINR)}
                        </div>
                      </div>

                      <button
                        onClick={() => onInquireItem(item)}
                        className="px-3 py-1.5 rounded bg-[#1c1916] hover:bg-[#d4af37] border border-[#3b3327] hover:border-[#d4af37] text-[#d4af37] hover:text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                        title="Inquire via WhatsApp or Studio"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquire</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Bespoke Callout Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#171512] via-[#201c16] to-[#171512] border border-[#3b3224] text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">Have a specific design in mind?</div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#faedd0]">We bring custom bridal & engagement dreams to reality.</h3>
            <p className="text-xs sm:text-sm text-[#aba08e] max-w-2xl">
              Over 500+ bespoke designs crafted with certified natural diamonds, rare emeralds, and 18K/22K gold right here in Jaipur.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.querySelector('#bespoke-studio');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="whitespace-nowrap px-6 py-3 rounded-lg bg-[#d4af37] text-[#0c0c0e] font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg transition-all"
          >
            Launch Bespoke Studio
          </button>
        </div>

      </div>
    </section>
  );
};
