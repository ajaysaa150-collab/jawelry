/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MasterpieceScrollExperience } from './components/MasterpieceScrollExperience';
import { CollectionsSection } from './components/CollectionsSection';
import { ServicesSection } from './components/ServicesSection';
import { BespokeStudioCustomizer } from './components/BespokeStudioCustomizer';
import { AboutStudioSection } from './components/AboutStudioSection';
import { TestimonialsAndFaqSection } from './components/TestimonialsAndFaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { AppointmentModal } from './components/AppointmentModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { JewelleryItem, CurrencyCode } from './data/jewelleryData';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('INR');
  const [wishlist, setWishlist] = useState<JewelleryItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [quickViewItem, setQuickViewItem] = useState<JewelleryItem | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);
  const [appointmentService, setAppointmentService] = useState<string>('Bridal Jewellery Consultation');
  const [appointmentNote, setAppointmentNote] = useState<string>('');

  // Persist Wishlist in LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('velora_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  const handleToggleWishlist = (item: JewelleryItem) => {
    setWishlist(prev => {
      const exists = prev.some(i => i.id === item.id);
      const updated = exists ? prev.filter(i => i.id !== item.id) : [...prev, item];
      try {
        localStorage.setItem('velora_wishlist', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleRemoveWishlistItem = (itemId: string) => {
    setWishlist(prev => {
      const updated = prev.filter(i => i.id !== itemId);
      try {
        localStorage.setItem('velora_wishlist', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleOpenAppointment = (serviceTitle = 'Bridal Jewellery Consultation', note = '') => {
    setAppointmentService(serviceTitle);
    setAppointmentNote(note);
    setIsAppointmentOpen(true);
  };

  const handleExploreCollections = () => {
    const el = document.querySelector('#collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreMasterpiece = () => {
    const el = document.querySelector('#masterpiece-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCustomizer = () => {
    const el = document.querySelector('#bespoke-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistIds = wishlist.map(item => item.id);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-[#ede7dc] selection:bg-[#d4af37]/30 selection:text-[#faedd0]">
      {/* Top Global Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Luxury Header */}
      <Navbar
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAppointment={() => handleOpenAppointment('Private Appointments')}
        onOpenCustomizer={handleOpenCustomizer}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onExploreCollections={handleExploreCollections}
          onBookAppointment={() => handleOpenAppointment('Bridal Jewellery Consultation')}
          onOpenCustomizer={handleOpenCustomizer}
          onExploreMasterpiece={handleExploreMasterpiece}
        />

        {/* 360° Scroll-Driven Showcase (Diamond Spark & Gold Flow Dual Chapters) */}
        <MasterpieceScrollExperience
          onInquirePiece={(pieceName) => handleOpenAppointment('Private Appointments', `Inquiring about ${pieceName}`)}
          onExploreCollections={handleExploreCollections}
        />

        {/* Collections Catalog (The 6 Signature Collections) */}
        <CollectionsSection
          currentCurrency={currentCurrency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewItem}
          onInquireItem={(item) => handleOpenAppointment(item.collection, `Inquiring about ${item.name}`)}
        />

        {/* Atelier Services (The 7 Bespoke Services) */}
        <ServicesSection
          onSelectServiceForBooking={(serviceTitle) => handleOpenAppointment(serviceTitle)}
          onOpenCustomizer={handleOpenCustomizer}
        />

        {/* Bespoke Design Studio (Interactive 3D / Spec Customizer) */}
        <BespokeStudioCustomizer
          currentCurrency={currentCurrency}
          onBookWithCustomDesign={(designSummary) => handleOpenAppointment('Custom Jewellery Design', designSummary)}
        />

        {/* Jaipur Heritage & Craftsmanship (Est. 2018, 42 MI Road) */}
        <AboutStudioSection
          onBookAppointment={() => handleOpenAppointment('Private Appointments')}
        />

        {/* Real Patrons & FAQs */}
        <TestimonialsAndFaqSection />

        {/* Contact, Location & Map Section */}
        <ContactSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Back to Top with Scroll Progress Indicator */}
      <BackToTopButton />

      {/* Modals & Slide-out Drawers */}
      <ProductQuickViewModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        currentCurrency={currentCurrency}
        isWishlisted={quickViewItem ? wishlistIds.includes(quickViewItem.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onBookAppointmentForItem={(itemName) => handleOpenAppointment('Private Appointments', `Viewing request for ${itemName}`)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        prefilledService={appointmentService}
        prefilledNote={appointmentNote}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        currentCurrency={currentCurrency}
        onRemoveItem={handleRemoveWishlistItem}
        onBookAppointment={() => handleOpenAppointment('Private Appointments', 'Reviewing saved wishlist pieces')}
        onQuickView={setQuickViewItem}
      />
    </div>
  );
}
