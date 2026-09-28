import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Heart, 
  Calendar, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Globe2, 
  Search,
  Gem
} from 'lucide-react';
import { BRAND_INFO, CURRENCY_RATES, CurrencyCode } from '../data/jewelleryData';

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onSelectCurrency,
  wishlistCount,
  onOpenWishlist,
  onOpenAppointment,
  onOpenCustomizer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '360° Showcase', href: '#masterpiece-experience' },
    { label: 'Collections', href: '#collections' },
    { label: 'Atelier Services', href: '#services' },
    { label: 'Bespoke Studio', href: '#bespoke-studio' },
    { label: 'Jaipur Heritage', href: '#about' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Studio & Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#141312] border-b border-[#2d2820]/70 text-[#c8bfaf] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            <span className="font-light tracking-wider text-[11px] uppercase text-[#e5c378]">
              Jaipur Flagship Studio: 42, MI Road • Established 2018
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-[11px] tracking-wider ml-auto">
            <a 
              href={`tel:${BRAND_INFO.phoneClean}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-[#e5c378] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>{BRAND_INFO.phone}</span>
            </a>
            
            <div className="h-3 w-[1px] bg-[#3a3429] hidden md:block"></div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-[#1b1917] px-2 py-0.5 rounded border border-[#383226]">
              <Globe2 className="w-3 h-3 text-[#d4af37]" />
              <select
                value={currentCurrency}
                onChange={(e) => onSelectCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-xs text-[#ede7dc] outline-none cursor-pointer font-medium tracking-wide pr-1"
                aria-label="Select Currency"
              >
                {Object.entries(CURRENCY_RATES).map(([code, config]) => (
                  <option key={code} value={code} className="bg-[#1b1917] text-[#ede7dc]">
                    {code} ({config.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0c0c0e]/95 backdrop-blur-md py-3.5 shadow-2xl border-b border-[#2e2920]' 
            : 'bg-[#0c0c0e]/85 backdrop-blur-sm py-5 border-b border-[#23201a]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo & Hallmark Crest */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-gradient-to-br from-[#282216] to-[#121110] shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#e5c378] transition-colors">
              <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c378]" />
            </div>
            <div>
              <div className="font-display tracking-[0.25em] text-lg sm:text-xl font-semibold text-[#f8f5ee] flex items-center gap-1.5">
                <span>VELORA</span>
                <span className="text-[#d4af37] font-light">JEWELS</span>
              </div>
              <div className="text-[9px] tracking-[0.28em] text-[#a89e8c] uppercase font-light">
                Jaipur • Studio Atelier
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-[0.16em] text-[#d6cdbd] hover:text-[#e5c378] transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action CTAs: Customizer, Wishlist, Appointment */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Interactive Bespoke Studio trigger */}
            <button
              onClick={onOpenCustomizer}
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-2 border border-[#d4af37]/40 rounded hover:border-[#d4af37] hover:bg-[#d4af37]/10 text-[#faedd0] transition-all tracking-wider uppercase font-medium"
              title="Design Custom Piece"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e5c378]" />
              <span className="hidden md:inline">Design</span> Bespoke
            </button>

            {/* Saved Wishlist Drawer Trigger */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#d6cdbd] hover:text-[#e5c378] transition-colors rounded-full hover:bg-[#1f1c17]"
              title="Saved Jewels"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#d4af37] text-[#0c0c0e] text-[10px] font-bold flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Book Private Appointment Button */}
            <button
              onClick={onOpenAppointment}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#c5a059] via-[#e5c378] to-[#d4af37] text-[#0c0c0e] font-semibold text-xs px-4 py-2 rounded tracking-widest uppercase hover:brightness-110 shadow-[0_0_16px_rgba(212,175,55,0.25)] transition-all transform active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0c0c0e]" />
              <span>Book Visit</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#d6cdbd] hover:text-[#e5c378] rounded"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e11] border-b border-[#2b2721] px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block text-sm uppercase tracking-widest text-[#d8cfbf] hover:text-[#e5c378] py-2 border-b border-[#211e18]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#d4af37]/60 rounded text-[#faedd0] text-xs uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4 text-[#e5c378]" />
              Bespoke Design Studio
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-[#0c0c0e] font-semibold text-xs uppercase tracking-widest rounded"
            >
              <Calendar className="w-4 h-4" />
              Book Private Consultation
            </button>

            <div className="pt-3 border-t border-[#23201a] text-xs text-[#a39a8a] space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>42, MI Road, Jaipur, Rajasthan 302001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{BRAND_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
