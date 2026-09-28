import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Compass, 
  CheckCircle2,
  Gem
} from 'lucide-react';
import { BRAND_INFO } from '../data/jewelleryData';

interface HeroProps {
  onExploreCollections: () => void;
  onBookAppointment: () => void;
  onOpenCustomizer: () => void;
  onExploreMasterpiece?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollections,
  onBookAppointment,
  onOpenCustomizer,
  onExploreMasterpiece,
}) => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0c] via-[#111013] to-[#0c0c0e]">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#d4af37]/10 via-[#c5a059]/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-[#2a2216]/40 blur-3xl pointer-events-none rounded-full" />

      {/* Subtle background lattice/Jaipur geometric motif */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Heritage Hallmark Pill with 360 showcase trigger */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b1916]/80 border border-[#d4af37]/30 text-[#e5c378] text-xs font-medium tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
              <span>Jaipur, Rajasthan • Established 2018</span>
              <span className="text-[#6d6455]">•</span>
              <span className="text-[#c8bfae]">BIS 916 / 750 Hallmarked</span>
              {onExploreMasterpiece && (
                <>
                  <span className="text-[#6d6455]">•</span>
                  <button 
                    onClick={onExploreMasterpiece} 
                    className="text-[#7dd3fc] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <span>360° View</span>
                  </button>
                </>
              )}
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-3">
              <div className="font-display tracking-[0.2em] text-xs uppercase text-[#a89d88]">
                {BRAND_INFO.businessType}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#f7f4ee] leading-[1.12]">
                Crafted to Last.{' '}
                <span className="italic block font-normal gold-gradient-text mt-1">
                  Designed to Be Remembered.
                </span>
              </h1>
            </div>

            {/* Brand Narrative */}
            <p className="text-base sm:text-lg text-[#bfb5a3] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {BRAND_INFO.about}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onExploreCollections}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#c5a059] via-[#e5c378] to-[#d4af37] text-[#0b0b0d] font-semibold text-xs tracking-[0.2em] uppercase rounded shadow-[0_4px_24px_rgba(212,175,55,0.28)] hover:brightness-110 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {onExploreMasterpiece && (
                <button
                  onClick={onExploreMasterpiece}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#171512] border border-[#d4af37]/60 hover:border-[#d4af37] text-[#faedd0] hover:text-white font-medium text-xs tracking-[0.16em] uppercase rounded transition-all flex items-center justify-center gap-2 hover:bg-[#241f17] shadow-lg cursor-pointer"
                >
                  <Gem className="w-4 h-4 text-[#7dd3fc]" />
                  <span>360° Showcase</span>
                </button>
              )}

              <button
                onClick={onBookAppointment}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#d4af37]/50 hover:border-[#d4af37] bg-[#141312]/60 text-[#ede6d8] hover:text-[#faedd0] font-medium text-xs tracking-[0.18em] uppercase rounded transition-all flex items-center justify-center gap-2 hover:bg-[#1f1c17] cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#e5c378]" />
                <span>Book Consultation</span>
              </button>

              <button
                onClick={onOpenCustomizer}
                className="w-full sm:w-auto px-5 py-3.5 text-[#d8cebe] hover:text-[#e5c378] text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Bespoke 3D Studio</span>
              </button>
            </div>

            {/* Trust Credentials Bar */}
            <div className="pt-6 border-t border-[#23201a] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1b1916] border border-[#3b3427] flex items-center justify-center text-[#d4af37] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] leading-tight">
                  <div className="font-semibold text-[#f0ebe0]">100% Certified</div>
                  <div className="text-[#8c8270]">GIA • IGI • BIS Hallmarked</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1b1916] border border-[#3b3427] flex items-center justify-center text-[#d4af37] shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] leading-tight">
                  <div className="font-semibold text-[#f0ebe0]">Jaipur Atelier</div>
                  <div className="text-[#8c8270]">42, MI Road Flagship</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1b1916] border border-[#3b3427] flex items-center justify-center text-[#d4af37] shrink-0">
                  <Gem className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] leading-tight">
                  <div className="font-semibold text-[#f0ebe0]">Master Karigars</div>
                  <div className="text-[#8c8270]">Heirloom Craftsmanship</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Showcase & Hero Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Luxury Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#362f23] shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#121110] group">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop"
                  alt="Velora Jewels Statement Bridal Choker & Emerald Suite"
                  className="w-full h-[460px] sm:h-[500px] object-cover object-center filter saturate-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-transparent to-black/20" />

                {/* Floating Tag Top Right */}
                <div className="absolute top-4 right-4 bg-[#0e0e11]/85 backdrop-blur-md border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#f7e8c3]">
                  The Bridal Edit • 2026
                </div>

                {/* Caption Card Overlaid */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0f0e11]/90 backdrop-blur-md border border-[#362f23] flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">Featured Masterpiece</div>
                    <div className="font-serif text-base text-[#f5f0e6]">Aarya Emerald & Polki Suite</div>
                    <div className="text-[11px] text-[#a69c8a]">Zambian Emeralds in 18K Yellow Gold</div>
                  </div>
                  <button
                    onClick={onExploreCollections}
                    className="p-2.5 rounded-full bg-[#201d18] border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-[#0b0b0d] transition-all text-[#e5c378]"
                    title="View Piece"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Accent Badge: 7+ Years & 100% Personalised */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#181613]/95 backdrop-blur-md border border-[#d4af37]/50 rounded-xl p-3.5 shadow-2xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#8f6e1e] flex items-center justify-center text-[#0b0b0d] font-bold">
                  <Award className="w-5 h-5 text-[#0b0b0d]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#f8f5ee]">7+ Years of Heritage</div>
                  <div className="text-[10px] text-[#b8ad9a]">500+ Custom Commissions</div>
                </div>
              </div>

              {/* Floating Hallmark Seal Top Left */}
              <div className="absolute -top-5 -right-3 sm:-right-6 bg-[#161412]/95 backdrop-blur-md border border-[#4d4230] rounded-xl px-3 py-2 shadow-2xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e5c378]" />
                <span className="text-[10px] tracking-wider uppercase text-[#e8dfcf] font-medium">100% Personalised</span>
              </div>

            </div>
          </div>

        </div>

        {/* Highlights Banner Ribbon */}
        <div className="mt-16 pt-8 border-t border-[#26221b] grid grid-cols-2 md:grid-cols-4 gap-6">
          {BRAND_INFO.highlights.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-[#121110]/60 border border-[#26211a] hover:border-[#d4af37]/40 transition-colors"
            >
              <div className="font-serif text-3xl sm:text-4xl text-[#faedd0] font-light tracking-tight flex items-baseline gap-1">
                <span>{item.number}</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                {item.label}
              </div>
              <p className="text-[11px] text-[#9c917f] mt-1 leading-normal line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
