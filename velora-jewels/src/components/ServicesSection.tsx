import React, { useState } from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Crown, 
  Fingerprint, 
  RefreshCw, 
  Gift, 
  CalendarCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  Gem,
  Award
} from 'lucide-react';
import { SERVICES_CATALOG, ServiceItem, BRAND_INFO } from '../data/jewelleryData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
  onOpenCustomizer: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenCustomizer,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_CATALOG[0].id);

  const activeService = SERVICES_CATALOG.find(s => s.id === selectedServiceId) || SERVICES_CATALOG[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#d4af37]" />;
      case 'Crown': return <Crown className="w-5 h-5 text-[#d4af37]" />;
      case 'Fingerprint': return <Fingerprint className="w-5 h-5 text-[#d4af37]" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-[#d4af37]" />;
      case 'Gift': return <Gift className="w-5 h-5 text-[#d4af37]" />;
      case 'CalendarCheck': return <CalendarCheck className="w-5 h-5 text-[#d4af37]" />;
      default: return <Gem className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0a0a0c] relative border-t border-[#1f1b15]">
      {/* Glow background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#d4af37]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181613] border border-[#d4af37]/30 text-[#e5c378] text-xs uppercase tracking-widest font-medium">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Master Atelier Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f8f5ee] font-light tracking-wide">
            Our Signature <span className="italic font-normal gold-gradient-text">Atelier Services</span>
          </h2>

          <p className="text-sm sm:text-base text-[#a89d8b] font-light leading-relaxed">
            From one-on-one bridal styling to reviving ancestral treasures, our Jaipur studio offers seven specialized jewellery services handled with personal precision.
          </p>
        </div>

        {/* 7 Services Pill Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 mb-10">
          {SERVICES_CATALOG.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 group ${
                  isSelected
                    ? 'bg-[#1e1a14] border-[#d4af37] shadow-[0_4px_20px_rgba(212,175,55,0.2)]'
                    : 'bg-[#121110] border-[#26211a] hover:border-[#3d3425] hover:bg-[#161412]'
                }`}
              >
                <div className="mb-2 p-2 rounded-lg bg-[#0e0d0c] border border-[#2b251d] w-fit group-hover:border-[#d4af37]/50">
                  {getServiceIcon(service.iconName)}
                </div>
                <div className={`text-xs font-medium leading-snug ${
                  isSelected ? 'text-[#faedd0] font-semibold' : 'text-[#b0a594]'
                }`}>
                  {service.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div className="bg-[#12110f] border border-[#312a20] rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Detail & Step-by-Step Flow */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#1d1913] border border-[#d4af37]/40">
                  {getServiceIcon(activeService.iconName)}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">Bespoke Service</div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f3e8]">{activeService.title}</h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#c2b7a4] font-light leading-relaxed">
                {activeService.fullDesc}
              </p>

              {/* The Process Steps */}
              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase tracking-widest text-[#a89d8a] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>The Atelier Process</span>
                </div>

                <div className="space-y-2.5">
                  {activeService.process.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#171512] p-2.5 rounded-lg border border-[#26211a]">
                      <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#faedd0] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-[#ded6c8]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverable & Timeline Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-[#191613] border border-[#2d261c] flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-[#8c8170]">Turnaround</div>
                    <div className="text-xs font-semibold text-[#f0e8d9]">{activeService.timeline}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#191613] border border-[#2d261c] flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-[#8c8170]">Guarantee</div>
                    <div className="text-xs font-semibold text-[#f0e8d9]">100% BIS Hallmarked & Certified</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onSelectServiceForBooking(activeService.title)}
                  className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#ba932e] text-[#0b0b0d] text-xs uppercase tracking-widest font-semibold rounded-lg hover:brightness-110 shadow-lg flex items-center gap-2 transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Consultation for {activeService.title}</span>
                </button>

                {activeService.id === 'custom-jewellery-design' && (
                  <button
                    onClick={onOpenCustomizer}
                    className="px-5 py-3 border border-[#d4af37]/60 hover:bg-[#d4af37]/10 text-[#faedd0] text-xs uppercase tracking-widest font-medium rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#e5c378]" />
                    <span>Try 3D Customizer</span>
                  </button>
                )}
              </div>

            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-[#362e22] shadow-2xl bg-[#141210]">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center filter saturate-[1.05]"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0c0c0e]/90 backdrop-blur-md border border-[#3b3224] text-xs text-[#d8cebe] leading-relaxed">
                  <div className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold mb-1">
                    Atelier Standard
                  </div>
                  {activeService.deliverable}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
