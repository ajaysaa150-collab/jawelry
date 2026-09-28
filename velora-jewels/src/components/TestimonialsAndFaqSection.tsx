import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  CheckCircle2,
  MapPin,
  Sparkles
} from 'lucide-react';
import { TESTIMONIALS, FAQS, BRAND_INFO } from '../data/jewelleryData';

export const TestimonialsAndFaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0c0c0e] relative border-t border-[#1f1b15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181613] border border-[#d4af37]/30 text-[#e5c378] text-xs uppercase tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Patron Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f8f5ee] font-light tracking-wide">
            Cherished by <span className="italic font-normal gold-gradient-text">Over 1,200 Patrons</span>
          </h2>

          <p className="text-sm sm:text-base text-[#a89d8b] font-light leading-relaxed">
            Read stories from brides, collectors, and bespoke clients across Jaipur, Mumbai, New York, and London who entrusted us with their most cherished milestones.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#12110f] border border-[#2b241c] hover:border-[#d4af37]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl relative group"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#d4af37]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-base sm:text-lg text-[#ded6c9] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-6 mt-6 border-t border-[#231e17]">
                <div className="font-medium text-sm text-[#f5f0e6]">{t.author}</div>
                <div className="text-xs text-[#d4af37] mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{t.location}</span>
                </div>
                <div className="text-[11px] text-[#827666] mt-1">
                  Commission: {t.collection}
                </div>
              </div>

              {/* Decorative Subtle Quote Mark */}
              <div className="absolute top-4 right-4 text-[#262017] group-hover:text-[#d4af37]/15 transition-colors">
                <Quote className="w-10 h-10" />
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto pt-6">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181613] border border-[#d4af37]/30 text-[#e5c378] text-xs uppercase tracking-widest font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Questions & Atelier Transparency</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#f7f3e8]">Frequently Asked Questions</h3>
            <p className="text-xs sm:text-sm text-[#a39886]">
              Everything you need to know about visiting our MI Road studio, purity hallmarks, and ordering bespoke fine jewelry.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#121110] border border-[#2b251c] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-[#181613] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg text-[#f0e9dc] font-normal leading-snug">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-[#1e1b17] border border-[#3b3226] text-[#d4af37] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#beb29f] leading-relaxed border-t border-[#231e17] bg-[#0e0d0c]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
