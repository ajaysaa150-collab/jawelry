import React from 'react';
import { 
  Award, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Clock, 
  Heart,
  Gem,
  CheckCircle2
} from 'lucide-react';
import { BRAND_INFO } from '../data/jewelleryData';

interface AboutStudioSectionProps {
  onBookAppointment: () => void;
}

export const AboutStudioSection: React.FC<AboutStudioSectionProps> = ({
  onBookAppointment,
}) => {
  return (
    <section id="about" className="py-24 bg-[#0a0a0c] relative border-t border-[#1f1b15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heritage Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Composition with Multiple Editorial Frames */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              
              {/* Primary Image: Master Jeweller Handcrafting / Studio */}
              <div className="rounded-2xl overflow-hidden border border-[#3b3225] shadow-2xl bg-[#141210]">
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
                  alt="Jaipur Jewellery Craftsmanship Velora Jewels"
                  className="w-full h-[460px] object-cover object-center filter saturate-[1.05]"
                />
              </div>

              {/* Secondary Overlapping Image: Jaipur Heritage Gemstones */}
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-60 h-64 rounded-xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.8)] bg-[#121110]">
                <img
                  src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=600&auto=format&fit=crop"
                  alt="Natural Emeralds & Diamonds Velora Jewels"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <div className="text-[10px] tracking-widest uppercase text-[#f7e9c6] font-medium">
                    Hand-Selected Natural Emeralds
                  </div>
                </div>
              </div>

              {/* Floating Est. 2018 Heritage Seal */}
              <div className="absolute -top-5 -left-5 bg-[#171512]/95 backdrop-blur-md border border-[#d4af37]/60 rounded-2xl p-4 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#87661b] flex items-center justify-center text-[#0b0b0d] font-bold">
                  <Gem className="w-5 h-5 text-[#0b0b0d]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Established 2018</div>
                  <div className="text-[11px] text-[#cfc5b4]">Jaipur, Rajasthan</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181613] border border-[#d4af37]/30 text-[#e5c378] text-xs uppercase tracking-widest font-medium">
              <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>The Jaipur Atelier Legacy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f8f5ee] font-light tracking-wide leading-tight">
              Rooted in Royal Craftsmanship.{' '}
              <span className="italic font-normal gold-gradient-text block mt-1">
                Refined for Today.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#c2b7a4] font-light leading-relaxed">
              Founded in 2018 in the historic jewellery district of MI Road, Jaipur, <strong className="text-[#f5f0e6] font-medium">VELORA JEWELS</strong> bridges centuries of royal Rajasthani lapidary heritage with the sleek restraint of modern international design.
            </p>

            <p className="text-sm sm:text-base text-[#a89d8b] font-light leading-relaxed">
              Every curve, prong, and bezel is sculpted by generational karigars whose families have honed the art of gem cutting, polki setting, and precious gold casting for generations in the Pink City.
            </p>

            {/* Core Atelier Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#131210] border border-[#2b251d] space-y-1.5">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#faedd0]">100% BIS Hallmarked</span>
                </div>
                <p className="text-[11px] text-[#9c9180] leading-normal">
                  All gold carries certified HUID hallmarking and rigorous metallurgical purity standards.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#131210] border border-[#2b251d] space-y-1.5">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#faedd0]">Conflict-Free Diamonds</span>
                </div>
                <p className="text-[11px] text-[#9c9180] leading-normal">
                  Ethically sourced natural diamonds adhering strictly to the Kimberley Process.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#131210] border border-[#2b251d] space-y-1.5">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#faedd0]">Rare Gemstones</span>
                </div>
                <p className="text-[11px] text-[#9c9180] leading-normal">
                  Zambian emeralds, Burmese rubies, and Ceylon sapphires hand-picked for vivid saturation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#131210] border border-[#2b251d] space-y-1.5">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#faedd0]">Lifetime Atelier Care</span>
                </div>
                <p className="text-[11px] text-[#9c9180] leading-normal">
                  Free annual ultrasonic cleaning, prong tightening, and polish for every patron.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onBookAppointment}
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#ba932e] text-[#0b0b0d] text-xs uppercase tracking-widest font-semibold hover:brightness-110 shadow-lg transition-all"
              >
                Experience the Jaipur Studio in Person
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
