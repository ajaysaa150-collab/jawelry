import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Send, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Copy, 
  Check, 
  ExternalLink,
  MessageCircle,
  Gem
} from 'lucide-react';
import { BRAND_INFO } from '../data/jewelleryData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: 'Custom Jewellery Design',
    message: '',
    preferredDate: '',
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(BRAND_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    setFormSubmitted(true);
  };

  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      title: 'The Aarya Emerald Choker in detail',
      likes: '2.4k',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop',
      title: '2-carat oval solitaire with hidden halo',
      likes: '1.8k',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1611591475876-c4d3753303d8?q=80&w=600&auto=format&fit=crop',
      title: 'Hand-carved 22K solid gold kada',
      likes: '3.1k',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
      title: 'Burmese ruby and marquise drops',
      likes: '2.9k',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#0a0a0c] relative border-t border-[#1f1b15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181613] border border-[#d4af37]/30 text-[#e5c378] text-xs uppercase tracking-widest font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Jaipur Studio & Worldwide Inquiries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f8f5ee] font-light tracking-wide">
            Visit the Studio & <span className="italic font-normal gold-gradient-text">Connect With Us</span>
          </h2>

          <p className="text-sm sm:text-base text-[#a89d8b] font-light leading-relaxed">
            Located in the heart of Jaipur&apos;s historic MI Road jewellery quarter. We welcome you for private consultations, bridal previews, and custom design sessions.
          </p>
        </div>

        {/* Contact Cards & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Business Details & Contact Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#121110] border border-[#2b251d] space-y-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-[#1c1915] border border-[#3b3325] text-[#d4af37] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Flagship Studio</div>
                  <div className="font-serif text-lg text-[#faedd0]">{BRAND_INFO.name}</div>
                  <p className="text-xs sm:text-sm text-[#b5aa99] leading-relaxed">
                    {BRAND_INFO.address}
                  </p>
                  <div className="text-[11px] text-[#7d7262] pt-1">
                    (Landmark: Near Panch Batti, MI Road Jaipur)
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#231e17] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#c4bba9]">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{BRAND_INFO.studioHours}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e5c378] hover:underline flex items-center gap-1 font-medium text-[11px]"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone */}
              <div className="p-5 rounded-2xl bg-[#121110] border border-[#2b251d] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-[#1c1915] text-[#d4af37]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="text-[10px] text-[#8f8371] hover:text-[#d4af37] flex items-center gap-1"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#827766]">Direct Call / Atelier</div>
                <a
                  href={`tel:${BRAND_INFO.phoneClean}`}
                  className="font-medium text-sm text-[#faedd0] hover:text-[#e5c378] block transition-colors"
                >
                  {BRAND_INFO.phone}
                </a>
              </div>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-[#121110] border border-[#2b251d] space-y-2">
                <div className="p-2 rounded-lg bg-[#1c1915] text-[#d4af37] w-fit">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#827766]">Email Concierge</div>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="font-medium text-sm text-[#faedd0] hover:text-[#e5c378] block truncate transition-colors"
                >
                  {BRAND_INFO.email}
                </a>
              </div>

            </div>

            {/* WhatsApp Direct Chat Banner */}
            <a
              href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20Velora%20Jewels,%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collections%20and%20studio%20appointments.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#15231c] border border-[#25d366]/40 hover:border-[#25d366] flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#25d366] text-[#0c0c0e]">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#e8f5ec]">Chat on Official WhatsApp</div>
                  <div className="text-[11px] text-[#9fc7ab]">Instant response for bespoke design & availability</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#25d366] group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Instagram Link Banner */}
            <div className="p-5 rounded-2xl bg-[#121110] border border-[#2b251d] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#e5c378]" />
                  <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">Instagram</span>
                </div>
                <a
                  href={BRAND_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#faedd0] hover:text-[#e5c378] flex items-center gap-1 font-medium"
                >
                  <span>{BRAND_INFO.instagram}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              {/* Instagram Feed Grid */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {instagramPosts.map((post) => (
                  <a
                    key={post.id}
                    href={BRAND_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square rounded-lg overflow-hidden group border border-[#2b251e]"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-medium">
                      ♥ {post.likes}
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation & Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#12110f] border border-[#2d261d] rounded-2xl p-6 sm:p-10 shadow-2xl relative">
            
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#faedd0] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-7 h-7 text-[#e5c378]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#faedd0]">Thank You, {formData.fullName}</h3>
                <p className="text-xs sm:text-sm text-[#b8ad9c] max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong className="text-[#faedd0]">{formData.serviceInterest}</strong> has been received by our Jaipur studio. A senior client advisor will connect with you within 4 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        serviceInterest: 'Custom Jewellery Design',
                        message: '',
                        preferredDate: '',
                      });
                    }}
                    className="text-xs uppercase tracking-widest text-[#d4af37] hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Atelier Concierge</div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f3e8] mt-1">Send a Message or Request a Visit</h3>
                  <p className="text-xs text-[#9c9180] mt-1">
                    Fill out the details below. We accommodate both Jaipur studio appointments and worldwide virtual video consultations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] placeholder-[#6b6255] outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] placeholder-[#6b6255] outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                      Phone Number (WhatsApp preferred)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] placeholder-[#6b6255] outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                      Service / Collection of Interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] outline-none focus:border-[#d4af37] cursor-pointer"
                    >
                      <option value="Custom Jewellery Design">Custom Jewellery Design</option>
                      <option value="The Bridal Edit Consultation">The Bridal Edit Consultation</option>
                      <option value="Engagement & Wedding Rings">Engagement & Wedding Rings</option>
                      <option value="Diamond Essentials">Diamond Essentials</option>
                      <option value="Gemstone Stories (Emeralds & Rubies)">Gemstone Stories (Emeralds & Rubies)</option>
                      <option value="Golden Classics">Golden Classics</option>
                      <option value="Jewellery Remodelling">Jewellery Remodelling</option>
                      <option value="Everyday Luxe Gift">Everyday Luxe Gift</option>
                      <option value="Studio Appointment (42, MI Road)">Studio Appointment (42, MI Road)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                    Preferred Consultation Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                    Message or Special Design Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the occasion, budget preference, or gemstone choices..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] placeholder-[#6b6255] outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c378] to-[#c5a059] text-[#0b0b0d] font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Jaipur Studio</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#786e5e]">
                  <span>🔒 Your privacy is respected. No spam, ever.</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
