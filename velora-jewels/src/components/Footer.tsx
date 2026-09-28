import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  ArrowUp, 
  Send, 
  Heart,
  Gem
} from 'lucide-react';
import { BRAND_INFO, COLLECTIONS_LIST } from '../data/jewelleryData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] border-t border-[#231e17] text-[#a89d8b] relative">
      
      {/* Top Pre-Footer Brand Assurance Bar */}
      <div className="border-b border-[#1c1813] py-8 bg-[#0b0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-[#14120f] border border-[#2b241c] text-[#d4af37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-[#faedd0]">100% BIS Hallmarked</div>
              <div className="text-[11px] text-[#7d7160]">Certified HUID Gold Purity</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-[#14120f] border border-[#2b241c] text-[#d4af37]">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-[#faedd0]">GIA & IGI Solitaires</div>
              <div className="text-[11px] text-[#7d7160]">Conflict-Free Natural Diamonds</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-[#14120f] border border-[#2b241c] text-[#d4af37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-[#faedd0]">500+ Custom Works</div>
              <div className="text-[11px] text-[#7d7160]">One-of-a-Kind Bespoke Editions</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-[#14120f] border border-[#2b241c] text-[#d4af37]">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-[#faedd0]">Jaipur Flagship</div>
              <div className="text-[11px] text-[#7d7160]">42, MI Road, Rajasthan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-[#171410]">
                <Gem className="w-5 h-5 text-[#e5c378]" />
              </div>
              <div>
                <div className="font-display tracking-[0.25em] text-xl font-bold text-[#faedd0]">
                  VELORA <span className="text-[#d4af37] font-light">JEWELS</span>
                </div>
                <div className="text-[9px] tracking-[0.28em] text-[#918676] uppercase">
                  Est. 2018 • Jaipur, Rajasthan
                </div>
              </div>
            </div>

            <p className="font-serif italic text-base text-[#d8cebe] leading-relaxed">
              &ldquo;{BRAND_INFO.tagline}&rdquo;
            </p>

            <p className="text-xs text-[#8f8272] leading-relaxed">
              {BRAND_INFO.about}
            </p>

            <div className="pt-2 text-xs text-[#b8ad9b] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{BRAND_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <a href={`tel:${BRAND_INFO.phoneClean}`} className="hover:text-[#faedd0] transition-colors">
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-[#faedd0] transition-colors">
                  {BRAND_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Signature Collections (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Signature Collections
            </div>
            <ul className="space-y-2 text-xs">
              {COLLECTIONS_LIST.filter(c => c !== 'All Pieces').map((col) => (
                <li key={col}>
                  <a 
                    href="#collections" 
                    className="hover:text-[#faedd0] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#d4af37]/40"></span>
                    <span>{col}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier Services (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Atelier Services
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-[#faedd0] transition-colors">Custom Design</a></li>
              <li><a href="#services" className="hover:text-[#faedd0] transition-colors">Bridal Styling</a></li>
              <li><a href="#services" className="hover:text-[#faedd0] transition-colors">Eternal Rings</a></li>
              <li><a href="#services" className="hover:text-[#faedd0] transition-colors">Heirloom Remodelling</a></li>
              <li><a href="#services" className="hover:text-[#faedd0] transition-colors">Private Appointments</a></li>
              <li><a href="#bespoke-studio" className="hover:text-[#faedd0] transition-colors">Bespoke 3D CAD</a></li>
            </ul>
          </div>

          {/* Private Atelier Newsletter (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Private Atelier Gazette
            </div>
            <p className="text-xs text-[#8f8373] leading-relaxed">
              Receive private salon invitations, high jewellery lookbooks, and previews of new gem releases.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#141d17] border border-[#25d366]/40 text-xs text-[#87d9a0]">
                ✓ Thank you for subscribing to Velora Jewels Gazette.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex rounded-xl overflow-hidden border border-[#2e261d] bg-[#121110]">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs text-[#faedd0] placeholder-[#665d50] bg-transparent outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3.5 bg-[#d4af37] text-[#0b0b0d] hover:brightness-110 flex items-center justify-center transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10px] text-[#6b6152]">Strict privacy. Never shared.</div>
              </form>
            )}

            {/* Social Channels */}
            <div className="pt-2">
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#faedd0] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow {BRAND_INFO.instagram}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#1a1713] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736858]">
          <div>
            © {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved. Handcrafted in Jaipur, India.
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-[#a89d8b]">BIS Hallmark Policy</a>
            <a href="#about" className="hover:text-[#a89d8b]">Conflict-Free Ethics</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#141210] border border-[#29221a] hover:border-[#d4af37] text-[#d4af37] transition-all"
              title="Return to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
