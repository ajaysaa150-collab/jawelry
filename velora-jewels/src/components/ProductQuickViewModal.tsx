import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  Award, 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  Scale, 
  Gem,
  Check
} from 'lucide-react';
import { JewelleryItem, CURRENCY_RATES, CurrencyCode, BRAND_INFO } from '../data/jewelleryData';

interface ProductQuickViewModalProps {
  item: JewelleryItem | null;
  onClose: () => void;
  currentCurrency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (item: JewelleryItem) => void;
  onBookAppointmentForItem: (itemName: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  item,
  onClose,
  currentCurrency,
  isWishlisted,
  onToggleWishlist,
  onBookAppointmentForItem,
}) => {
  if (!item) return null;

  const [selectedMetal, setSelectedMetal] = useState<string>(item.defaultMetal);
  const [selectedImage, setSelectedImage] = useState<string>(item.image);

  const currencyConfig = CURRENCY_RATES[currentCurrency];
  const converted = item.priceINR * currencyConfig.rate;
  const formattedPrice = currentCurrency === 'INR'
    ? `${currencyConfig.symbol}${item.priceINR.toLocaleString('en-IN')}`
    : `${currencyConfig.symbol}${Math.round(converted).toLocaleString()}`;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Velora Jewels Jaipur,\n\nI am interested in:\nPiece: ${item.name}\nCollection: ${item.collection}\nSelected Metal: ${selectedMetal}\nPrice: ${formattedPrice}\n\nPlease share details and availability.`
    );
    window.open(`https://wa.me/${BRAND_INFO.phoneClean}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#121110] border border-[#3b3225] rounded-2xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#1c1915]/80 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0c0c0e] transition-colors border border-[#3d3426]"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Visual Gallery (5 Cols) */}
          <div className="md:col-span-6 bg-[#171513] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#26211a]">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#100f0e] border border-[#2b251d]">
              <img
                src={selectedImage}
                alt={item.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#0d0c0e]/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] uppercase tracking-wider text-[#d4af37] border border-[#3d3326]">
                {item.collection}
              </div>
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {item.secondaryImage && (
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setSelectedImage(item.image)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === item.image ? 'border-[#d4af37]' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={item.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setSelectedImage(item.secondaryImage!)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === item.secondaryImage ? 'border-[#d4af37]' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={item.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                </button>
              </div>
            )}

            {/* Certification Badge */}
            <div className="mt-4 p-3 rounded-xl bg-[#121110] border border-[#2b251d] flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
              <div className="text-[11px] text-[#baaea0] leading-snug">
                <span className="text-[#f5f0e6] font-semibold">{item.certification}</span>. Guaranteed buyback and lifetime atelier servicing.
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Actions (7 Cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                  {item.collection}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#faedd0] font-normal leading-tight mt-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#a19685] mt-1">{item.tagline}</p>
              </div>

              {/* Price & Purity */}
              <div className="flex items-baseline justify-between py-2 border-y border-[#26211a]">
                <div>
                  <div className="text-[10px] uppercase text-[#7a6f5e]">Investment</div>
                  <div className="font-serif text-2xl text-[#faedd0]">{formattedPrice}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-[#7a6f5e]">Purity Standard</div>
                  <div className="text-xs font-semibold text-[#f0e9dc]">{item.purity}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#c4b9a9] font-light leading-relaxed">
                {item.description}
              </p>

              {/* Metal Selection */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#9e9280] block mb-2 font-medium">
                  Select Precious Metal
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.metalOptions.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        selectedMetal === metal
                          ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#faedd0] font-semibold'
                          : 'border-[#2d261e] text-[#918676] hover:border-[#42392d]'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlight Specs Table */}
              <div className="bg-[#171513] rounded-xl p-3.5 border border-[#2b251d] space-y-2 text-xs">
                <div className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
                  Atelier Specifications
                </div>
                
                {item.gemstones && (
                  <div className="flex justify-between text-[#d6cdbe]">
                    <span className="text-[#877c6c]">Stones:</span>
                    <span className="font-medium text-right">{item.gemstones}</span>
                  </div>
                )}
                {item.highlightSpecs.diamondWeight && (
                  <div className="flex justify-between text-[#d6cdbe]">
                    <span className="text-[#877c6c]">Diamond Weight:</span>
                    <span className="font-medium">{item.highlightSpecs.diamondWeight}</span>
                  </div>
                )}
                {item.highlightSpecs.diamondQuality && (
                  <div className="flex justify-between text-[#d6cdbe]">
                    <span className="text-[#877c6c]">Diamond Quality:</span>
                    <span className="font-medium">{item.highlightSpecs.diamondQuality}</span>
                  </div>
                )}
                {item.highlightSpecs.gemstoneWeight && (
                  <div className="flex justify-between text-[#d6cdbe]">
                    <span className="text-[#877c6c]">Gemstone Weight:</span>
                    <span className="font-medium">{item.highlightSpecs.gemstoneWeight}</span>
                  </div>
                )}
                {item.highlightSpecs.grossWeightApprox && (
                  <div className="flex justify-between text-[#d6cdbe]">
                    <span className="text-[#877c6c]">Approx Gross Weight:</span>
                    <span className="font-medium">{item.highlightSpecs.grossWeightApprox}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="py-3 px-4 rounded-xl bg-[#1d2a21] border border-[#25d366]/40 hover:border-[#25d366] text-[#25d366] hover:bg-[#25d366]/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Inquire on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onBookAppointmentForItem(item.name);
                  }}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba932e] text-[#0b0b0d] text-xs font-semibold uppercase tracking-widest hover:brightness-110 flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Studio Trial</span>
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(item)}
                className={`w-full py-2.5 rounded-xl border text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  isWishlisted
                    ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#faedd0]'
                    : 'border-[#2d261e] text-[#a39785] hover:text-[#faedd0] hover:border-[#4d4233]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-[#d4af37]' : ''}`} />
                <span>{isWishlisted ? 'Saved to Your Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
