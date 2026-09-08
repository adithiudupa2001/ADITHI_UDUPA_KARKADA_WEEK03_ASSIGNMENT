import React, { useState } from 'react';
import { ActionType, Animal, EnquirySubmission } from '../types';

interface EnquiryScreenProps {
  animal: Animal;
  actionType: ActionType;
  onBack: () => void;
  onSubmitted?: (submission: EnquirySubmission) => void;
}

export const EnquiryScreen: React.FC<EnquiryScreenProps> = ({
  animal,
  actionType,
  onBack,
  onSubmitted,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isVisit = actionType === 'visit';
  const badgeLabel = isVisit ? 'Shelter Visit' : 'Permanent Adoption';
  const badgeClass = isVisit
    ? 'bg-amber-100 text-amber-900 border border-amber-200'
    : 'bg-terracotta-50 text-terracotta-600 border border-terracotta-200';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    const submission: EnquirySubmission = {
      animal,
      actionType,
      fullName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    setIsSubmitted(true);
    if (onSubmitted) {
      onSubmitted(submission);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between pb-1">
        <button
          id="btn-back-to-rescues"
          onClick={onBack}
          className="touch-target inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-warmgray-800 bg-white border border-[#E8E1DA] px-4 py-2 rounded-full tap-scale shadow-xs hover:border-terracotta-400 hover:text-terracotta-600 transition-colors"
        >
          <span className="text-base leading-none">‹</span> Back to Rescues
        </button>
        <span className="text-xs font-semibold text-terracotta-600 bg-terracotta-50 border border-terracotta-200 px-3 py-1 rounded-full">
          Step 2: Enquiry
        </span>
      </div>

      {/* Selected Animal Summary Header Card */}
      <div
        id="enquiry-target-summary"
        className="bg-white border border-[#E8E1DA] rounded-3xl p-4 sm:p-6 shadow-xs flex items-center gap-4 sm:gap-6"
      >
        <img
          src={animal.image}
          alt={animal.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 border border-[#E8E1DA] shadow-xs"
          referrerPolicy="no-referrer"
        />
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between gap-1 flex-wrap">
            <h4 className="font-extrabold text-lg sm:text-xl text-warmgray-900">
              {animal.name}
            </h4>
            <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
              {badgeLabel}
            </span>
          </div>
          <p className="text-xs text-warmgray-600 mt-0.5">
            {animal.category} • {animal.age} • {animal.gender} ({animal.size})
          </p>
          <p className="text-[11px] sm:text-xs text-warmgray-500 italic truncate mt-1">
            &ldquo;{animal.story.substring(0, 75)}...&rdquo;
          </p>
        </div>
      </div>

      {/* Main Container: Form or Confirmation */}
      {!isSubmitted ? (
        <div
          id="enquiry-form-container"
          className="bg-white border border-[#E8E1DA] rounded-3xl p-5 sm:p-8 shadow-xs"
        >
          <h3 className="font-extrabold text-base sm:text-xl text-warmgray-900">
            {isVisit
              ? `Schedule a visit to meet ${animal.name}`
              : `Apply for adoption & home delivery of ${animal.name}`}
          </h3>
          <p className="text-xs sm:text-sm text-warmgray-600 mt-1 mb-5 sm:mb-6 leading-relaxed">
            Fill in your contact info below. Our Pasir Ris coordinator will reach out via WhatsApp within 24 hours to arrange next steps.
          </p>

          <form id="enquiry-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-warmgray-900 mb-1.5" htmlFor="input-name">
                  Full Name *
                </label>
                <input
                  id="input-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rachel Tan"
                  className="w-full text-base sm:text-sm px-4 py-3 rounded-2xl border border-[#D6CBC0] bg-warmgray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 focus:border-terracotta-500 transition-all text-warmgray-900 placeholder:text-warmgray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-warmgray-900 mb-1.5" htmlFor="input-phone">
                  Singapore Mobile Number (+65) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-warmgray-600">
                    🇸🇬 +65
                  </span>
                  <input
                    id="input-phone"
                    type="tel"
                    required
                    pattern="[0-9 ]{8,12}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9123 4567"
                    className="w-full text-base sm:text-sm pl-20 pr-4 py-3 rounded-2xl border border-[#D6CBC0] bg-warmgray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 focus:border-terracotta-500 transition-all text-warmgray-900 placeholder:text-warmgray-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-warmgray-900 mb-1.5" htmlFor="input-email">
                Email Address *
              </label>
              <input
                id="input-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rachel.tan@example.sg"
                className="w-full text-base sm:text-sm px-4 py-3 rounded-2xl border border-[#D6CBC0] bg-warmgray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 focus:border-terracotta-500 transition-all text-warmgray-900 placeholder:text-warmgray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-warmgray-900 mb-1.5" htmlFor="input-message">
                Household Environment or Questions (Optional)
              </label>
              <textarea
                id="input-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your home setup (HDB/condo, existing pets, window grilles/mesh, experience)..."
                className="w-full text-base sm:text-sm px-4 py-3 rounded-2xl border border-[#D6CBC0] bg-warmgray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 focus:border-terracotta-500 transition-all text-warmgray-900 placeholder:text-warmgray-400"
              />
            </div>

            <button
              id="btn-submit-enquiry"
              type="submit"
              className="touch-target w-full py-3.5 sm:py-4 px-4 bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all tap-scale flex items-center justify-center gap-2"
            >
              <span>
                {isVisit ? 'Request Shelter Visit Slot' : 'Submit Adoption Request'}
              </span>
              <span className="text-base font-bold">→</span>
            </button>
            <p className="text-[11px] text-warmgray-500 text-center mt-2">
              🔒 We respect your privacy. Details are only used by Paws &amp; Home SG coordinators for rescue matching.
            </p>
          </form>
        </div>
      ) : (
        /* Confirmation Card */
        <div
          id="enquiry-confirmation"
          className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 text-center shadow-xs space-y-5"
        >
          <div className="w-16 h-16 sm:w-18 sm:h-18 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-3xl font-black shadow-xs">
            ✓
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              Request Received
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-warmgray-900">
              {isVisit
                ? `Shelter Visit Request for ${animal.name}`
                : `Adoption Request for ${animal.name}`}
            </h3>
            <p className="text-xs sm:text-sm text-warmgray-600 mt-1">
              Thank you {name}. Your request regarding <strong>{animal.name}</strong> has been received by our Pasir Ris coordination desk.
            </p>
          </div>

          {/* Dynamic Next Steps Banner */}
          <div
            className={`p-4 sm:p-5 rounded-2xl text-left text-xs sm:text-sm leading-relaxed ${
              isVisit
                ? 'bg-amber-50 border border-amber-200/90 text-amber-950'
                : 'bg-emerald-50 border border-emerald-200/90 text-emerald-950'
            }`}
          >
            {isVisit ? (
              <>
                <div className="font-extrabold text-sm sm:text-base text-amber-900 mb-1.5 flex items-center gap-2">
                  <span>📍</span> Next Step: Come to the Pasir Ris shelter for a visit
                </div>
                <p>
                  We are coordinating a zero-pressure visit slot at our <strong>Pasir Ris shelter (71 Pasir Ris Farmway 1)</strong>. Our volunteer coordinator will WhatsApp you at <strong>+65 {phone}</strong> within 24 hours to book a quiet bonding pen time so you can interact with <strong>{animal.name}</strong>.
                </p>
              </>
            ) : (
              <>
                <div className="font-extrabold text-sm sm:text-base text-emerald-900 mb-1.5 flex items-center gap-2">
                  <span>🏡</span> Next Step: Prepare for home hand-delivery
                </div>
                <p>
                  Our adoption coordinator will review your application and conduct a friendly virtual home walkthrough. Once approved, <strong>{animal.name} will be lovingly hand-delivered to your home</strong> with starter kibble, vaccination cards, and an assigned volunteer buddy to guide the first 60 days.
                </p>
              </>
            )}
          </div>

          {/* Applicant details summary */}
          <div className="border-t border-[#E8E1DA] pt-3 text-left text-xs text-warmgray-600 space-y-1 bg-warmgray-50 p-4 rounded-2xl">
            <p>
              <strong>Applicant:</strong> <span className="text-warmgray-900">{name}</span>
            </p>
            <p>
              <strong>Contact:</strong>{' '}
              <span className="text-warmgray-900">
                {email} (🇸🇬 +65 {phone})
              </span>
            </p>
            <p>
              <strong>Shelter Facility:</strong> 71 Pasir Ris Farmway 1, Singapore
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              id="btn-browse-more-rescues"
              onClick={onBack}
              className="touch-target w-full sm:w-auto px-6 py-3 bg-warmgray-800 hover:bg-warmgray-900 text-white text-xs sm:text-sm font-bold rounded-2xl transition-all tap-scale shadow-xs"
            >
              Browse Other Rescues
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
