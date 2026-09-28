import React from 'react';
import { 
  X, 
  Trash2, 
  Calendar, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck,
  Heart,
  Gem
} from 'lucide-react';
import { JewelleryItem, CURRENCY_RATES, CurrencyCode, BRAND_INFO } from '../data/jewelleryData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: JewelleryItem[];
  currentCurrency: CurrencyCode;
  onRemoveItem: (itemId: string) => void;
  onBookAppointment: () => void;
  onQuickView: (item: JewelleryItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currentCurrency,
  onRemoveItem,
  onBookAppointment,
  onQuickView,
}) => {
  if (!isOpen) return null;

  const currencyConfig = CURRENCY_RATES[currentCurrency];

  const totalINR = items.reduce((sum, item) => sum + item.priceINR, 0);
  const totalConverted = totalINR * currencyConfig.rate;

  const formatPrice = (priceINR: number) => {
    const val = priceINR * currencyConfig.rate;
    if (currentCurrency === 'INR') {
      return `${currencyConfig.symbol}${priceINR.toLocaleString('en-IN')}`;
    }
    return `${currencyConfig.symbol}${Math.round(val).toLocaleString()}`;
  };

  const handleInquireAllWhatsApp = () => {
    const listSummary = items.map((i, idx) => `${idx + 1}. ${i.name} (${formatPrice(i.priceINR)})`).join('\n');
    const text = encodeURIComponent(
      `Hello Velora Jewels Jaipur,\n\nI have saved these items in my wishlist on your website:\n\n${listSummary}\n\nEstimated Total: ${formatPrice(totalINR)}\n\nCan I schedule a viewing or discuss customization?`
    );
    window.open(`https://wa.me/${BRAND_INFO.phoneClean}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#11100f] border-l border-[#312a20] shadow-2xl flex flex-col justify-between text-left">
          
          {/* Header */}
          <div className="p-6 border-b border-[#241f17] flex items-center justify-between bg-[#161412]">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#d4af37] fill-current" />
              <div>
                <h3 className="font-serif text-xl text-[#faedd0]">Your Saved Pieces</h3>
                <div className="text-[11px] text-[#9c9180]">{items.length} items curated</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#9c9180] hover:text-[#faedd0] hover:bg-[#26211a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Gem className="w-12 h-12 text-[#42392c] mx-auto" />
                <div className="font-serif text-lg text-[#ece4d6]">Your wishlist is empty</div>
                <p className="text-xs text-[#8c8170] max-w-xs mx-auto">
                  Browse our Bridal Edit, Diamond Essentials, and Gemstone Stories to save your dream pieces.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2 rounded-lg bg-[#1f1c17] border border-[#3d3326] text-xs uppercase tracking-wider text-[#d4af37]"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#171513] border border-[#2b251d] rounded-xl p-3.5 flex gap-3.5 items-center justify-between group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-[#0d0c0b] shrink-0 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onQuickView(item);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase text-[#d4af37] font-semibold">{item.collection}</div>
                    <div 
                      onClick={() => {
                        onClose();
                        onQuickView(item);
                      }}
                      className="font-serif text-sm text-[#f0e9dc] truncate hover:text-[#d4af37] cursor-pointer"
                    >
                      {item.name}
                    </div>
                    <div className="text-xs font-medium text-[#faedd0] mt-0.5">
                      {formatPrice(item.priceINR)}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-[#736858] hover:text-red-400 rounded-lg hover:bg-[#231e17] transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Total & Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#241f17] bg-[#161412] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#8a7f6f]">Total Estimated Value</div>
                  <div className="font-serif text-2xl text-[#faedd0] font-light">
                    {formatPrice(totalINR)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#7d7262]">
                  <div>BIS Hallmarked</div>
                  <div>Certified Conflict-Free</div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleInquireAllWhatsApp}
                  className="w-full py-3 rounded-xl bg-[#1c2a20] border border-[#25d366]/40 hover:border-[#25d366] text-[#25d366] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Inquire All on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onBookAppointment();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f29] text-[#0b0b0d] text-xs font-semibold uppercase tracking-widest hover:brightness-110 flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Studio Viewing</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
