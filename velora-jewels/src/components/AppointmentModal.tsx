import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  Users, 
  Send, 
  Sparkles,
  Phone,
  Gem
} from 'lucide-react';
import { BRAND_INFO, SERVICES_CATALOG } from '../data/jewelleryData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledNote?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  prefilledService = 'Bridal Jewellery Consultation',
  prefilledNote = '',
}) => {
  if (!isOpen) return null;

  const [appointmentType, setAppointmentType] = useState<'studio' | 'virtual'>('studio');
  const [selectedService, setSelectedService] = useState<string>(prefilledService);
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('11:30 AM – 1:00 PM');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>(prefilledNote);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const timeSlots = [
    '11:00 AM – 12:30 PM',
    '1:00 PM – 2:30 PM',
    '3:30 PM – 5:00 PM',
    '5:30 PM – 7:00 PM',
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    const randomCode = `VELORA-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(randomCode);
    setConfirmed(true);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello Velora Jewels,\n\nI just confirmed my VIP Appointment (${confirmationCode}):\n- Type: ${appointmentType === 'studio' ? 'Flagship Studio (42, MI Road, Jaipur)' : 'Virtual Video Suite'}\n- Service: ${selectedService}\n- Date: ${date || 'Flexible'}\n- Time Slot: ${timeSlot}\n- Name: ${fullName}\n- Phone: ${phone}`
    );
    window.open(`https://wa.me/${BRAND_INFO.phoneClean}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#121110] border border-[#3b3225] rounded-2xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#181613] p-6 border-b border-[#2b241c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#241f17] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                Private Consultation
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#faedd0]">
                Book a VIP Atelier Appointment
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#9c9180] hover:text-[#faedd0] hover:bg-[#26211a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-10 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] text-[#faedd0] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-[#e5c378]" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Appointment Reserved
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#f7f3e8]">
                We Look Forward to Welcoming You
              </h4>
              <p className="text-xs sm:text-sm text-[#b5aa99] max-w-md mx-auto leading-relaxed">
                Your private session with our senior gemologist has been tentatively booked. Our studio host will contact you shortly to finalize details.
              </p>
            </div>

            {/* Ticket Summary Box */}
            <div className="bg-[#171512] border border-[#3b3225] rounded-xl p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-[#2b241c]">
                <span className="text-[#877c6c]">Confirmation ID:</span>
                <span className="font-mono text-[#d4af37] font-bold">{confirmationCode}</span>
              </div>
              <div className="flex justify-between text-[#d6cdbe]">
                <span className="text-[#877c6c]">Experience:</span>
                <span className="font-medium">
                  {appointmentType === 'studio' ? 'Flagship Studio (42, MI Road, Jaipur)' : 'Virtual 4K Video Suite'}
                </span>
              </div>
              <div className="flex justify-between text-[#d6cdbe]">
                <span className="text-[#877c6c]">Service:</span>
                <span className="font-medium">{selectedService}</span>
              </div>
              <div className="flex justify-between text-[#d6cdbe]">
                <span className="text-[#877c6c]">Time Slot:</span>
                <span className="font-medium">{timeSlot}</span>
              </div>
              <div className="flex justify-between text-[#d6cdbe]">
                <span className="text-[#877c6c]">Patron:</span>
                <span className="font-medium">{fullName} ({phone})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={handleWhatsAppShare}
                className="px-6 py-3 rounded-lg bg-[#1a2b20] border border-[#25d366]/40 hover:border-[#25d366] text-[#25d366] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-[#d4af37] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider hover:brightness-110"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleBook} className="p-6 sm:p-8 space-y-6">
            
            {/* Step 1: In-Studio vs Virtual Mode */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-2">
                1. Select Consultation Venue
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAppointmentType('studio')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    appointmentType === 'studio'
                      ? 'bg-[#221c14] border-[#d4af37] text-[#faedd0]'
                      : 'bg-[#161412] border-[#29221a] text-[#a19685] hover:border-[#3d3326]'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#f0e9dc]">Jaipur Studio Visit</div>
                    <div className="text-[11px] text-[#7a6f5e] mt-0.5">42, MI Road • Private VIP Lounge</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType('virtual')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    appointmentType === 'virtual'
                      ? 'bg-[#221c14] border-[#d4af37] text-[#faedd0]'
                      : 'bg-[#161412] border-[#29221a] text-[#a19685] hover:border-[#3d3326]'
                  }`}
                >
                  <Video className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#f0e9dc]">Virtual Video Suite</div>
                    <div className="text-[11px] text-[#7a6f5e] mt-0.5">Worldwide patrons • 4K stone viewing</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-2">
                2. Consultation Focus
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] outline-none focus:border-[#d4af37]"
              >
                {SERVICES_CATALOG.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Step 3: Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] outline-none focus:border-[#d4af37]"
                >
                  {timeSlots.map((ts) => (
                    <option key={ts} value={ts}>{ts}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Singhal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] placeholder-[#6b6255] outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] placeholder-[#6b6255] outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="radhika@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2.5 text-xs text-[#faedd0] placeholder-[#6b6255] outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#b8ad9c] block mb-1.5 font-medium">
                Design References or Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Specific pieces you wish to see, budget, or wedding dates..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#161412] border border-[#2e261d] rounded-xl px-3.5 py-2 text-xs text-[#faedd0] placeholder-[#6b6255] outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c378] to-[#c5a059] text-[#0b0b0d] font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Atelier Reservation</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
