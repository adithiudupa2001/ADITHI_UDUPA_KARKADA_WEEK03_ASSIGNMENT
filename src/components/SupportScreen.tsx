import React, { useState } from 'react';

interface SupportScreenProps {
  onBackToAdopt?: () => void;
  isEmbedded?: boolean;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  onBackToAdopt,
  isEmbedded = false,
}) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const activeAmount = customAmount !== '' ? Number(customAmount) : (selectedTier ?? 50);

  const handleSelectPreset = (amount: number) => {
    setSelectedTier(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val !== '') {
      setSelectedTier(null);
    }
  };

  const handleConfirm = () => {
    if (activeAmount >= 5) {
      setIsConfirmed(true);
    }
  };

  const handleReset = () => {
    setSelectedTier(50);
    setCustomAmount('');
    setIsConfirmed(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
      {/* Top Back Nav */}
      {!isEmbedded && onBackToAdopt && (
        <div className="flex items-center justify-between pb-1">
          <button
            id="btn-back-from-support"
            onClick={onBackToAdopt}
            className="touch-target inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-warmgray-800 bg-white border border-[#E8E1DA] px-4 py-2 rounded-full tap-scale shadow-xs hover:border-terracotta-400 hover:text-terracotta-600 transition-colors"
          >
            <span className="text-base leading-none">‹</span> Back to Rescues
          </button>
          <span className="text-xs font-semibold text-terracotta-600 bg-terracotta-50 border border-terracotta-200 px-3 py-1 rounded-full">
            Direct Community Aid
          </span>
        </div>
      )}

      {/* Intro Card */}
      <section className="bg-gradient-to-br from-terracotta-50 via-white to-[#FFF4EE] border border-terracotta-200 rounded-3xl p-5 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-terracotta-600 text-xs font-bold mb-2.5 sm:mb-3 border border-terracotta-200 shadow-xs">
          💛 Can&rsquo;t Adopt Right Now?
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-warmgray-900 leading-snug">
          Support our stray medical &amp; food fund
        </h2>
        <p className="text-xs sm:text-sm text-warmgray-600 mt-2 sm:mt-2.5 leading-relaxed">
          Every contribution directly buys wet food rations, flea &amp; tick medication, sterilization subsidies, and warm bedding at our Pasir Ris community rescue facility.
        </p>
      </section>

      {!isConfirmed ? (
        /* Picker Container */
        <div
          id="support-picker-container"
          className="bg-white border border-[#E8E1DA] rounded-3xl p-5 sm:p-8 shadow-xs space-y-5 sm:space-y-6"
        >
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-warmgray-900">
              Choose a contribution amount
            </h3>
            <p className="text-xs text-warmgray-600 mt-0.5">
              Select a preset tier or specify your own gift
            </p>
          </div>

          {/* 3 Preset Tier Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" id="preset-buttons">
            {/* $20 */}
            <button
              type="button"
              id="tier-btn-20"
              onClick={() => handleSelectPreset(20)}
              className={`preset-btn touch-target p-4 sm:p-5 rounded-2xl text-left transition-all tap-scale flex flex-col justify-between ${
                selectedTier === 20 && customAmount === ''
                  ? 'border-2 border-terracotta-500 bg-terracotta-50 shadow-xs'
                  : 'border border-[#D6CBC0] bg-warmgray-50 hover:border-terracotta-400'
              }`}
            >
              <div>
                <span
                  className={`block text-2xl font-black ${
                    selectedTier === 20 && customAmount === ''
                      ? 'text-terracotta-600'
                      : 'text-warmgray-900'
                  }`}
                >
                  $20 <span className="text-xs font-semibold text-warmgray-500">SGD</span>
                </span>
                <span
                  className={`block text-xs font-bold mt-1 ${
                    selectedTier === 20 && customAmount === ''
                      ? 'text-terracotta-700'
                      : 'text-terracotta-600'
                  }`}
                >
                  Shelter Meal Packs
                </span>
              </div>
              <p className="text-[11px] text-warmgray-500 mt-2">
                Feeds 4 rescued dogs &amp; cats wholesome daily meals.
              </p>
            </button>

            {/* $50 */}
            <button
              type="button"
              id="tier-btn-50"
              onClick={() => handleSelectPreset(50)}
              className={`preset-btn touch-target p-4 sm:p-5 rounded-2xl text-left transition-all tap-scale flex flex-col justify-between ${
                selectedTier === 50 && customAmount === ''
                  ? 'border-2 border-terracotta-500 bg-terracotta-50 shadow-xs'
                  : 'border border-[#D6CBC0] bg-warmgray-50 hover:border-terracotta-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`block text-2xl font-black ${
                      selectedTier === 50 && customAmount === ''
                        ? 'text-terracotta-600'
                        : 'text-warmgray-900'
                    }`}
                  >
                    $50 <span className="text-xs font-semibold text-warmgray-500">SGD</span>
                  </span>
                  <span className="text-[10px] font-extrabold bg-terracotta-500 text-white px-2 py-0.5 rounded-full">
                    POPULAR
                  </span>
                </div>
                <span
                  className={`block text-xs font-bold mt-1 ${
                    selectedTier === 50 && customAmount === ''
                      ? 'text-terracotta-700'
                      : 'text-terracotta-600'
                  }`}
                >
                  Vet Checkup &amp; Jabs
                </span>
              </div>
              <p className="text-[11px] text-warmgray-500 mt-2">
                Covers core vaccination &amp; tick preventive doses.
              </p>
            </button>

            {/* $100 */}
            <button
              type="button"
              id="tier-btn-100"
              onClick={() => handleSelectPreset(100)}
              className={`preset-btn touch-target p-4 sm:p-5 rounded-2xl text-left transition-all tap-scale flex flex-col justify-between ${
                selectedTier === 100 && customAmount === ''
                  ? 'border-2 border-terracotta-500 bg-terracotta-50 shadow-xs'
                  : 'border border-[#D6CBC0] bg-warmgray-50 hover:border-terracotta-400'
              }`}
            >
              <div>
                <span
                  className={`block text-2xl font-black ${
                    selectedTier === 100 && customAmount === ''
                      ? 'text-terracotta-600'
                      : 'text-warmgray-900'
                  }`}
                >
                  $100 <span className="text-xs font-semibold text-warmgray-500">SGD</span>
                </span>
                <span
                  className={`block text-xs font-bold mt-1 ${
                    selectedTier === 100 && customAmount === ''
                      ? 'text-terracotta-700'
                      : 'text-terracotta-600'
                  }`}
                >
                  Sterilisation Fund
                </span>
              </div>
              <p className="text-[11px] text-warmgray-500 mt-2">
                Subsidises complete surgical procedure and aftercare.
              </p>
            </button>
          </div>

          {/* Custom Amount Field */}
          <div>
            <label
              className="block text-xs font-bold text-warmgray-900 mb-1.5"
              htmlFor="custom-amount-input"
            >
              Or enter a custom amount (SGD)
            </label>
            <div className="relative max-w-sm">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-extrabold text-warmgray-600">
                $
              </span>
              <input
                id="custom-amount-input"
                type="number"
                min="5"
                value={customAmount}
                onChange={handleCustomChange}
                placeholder="e.g. 75"
                className="w-full text-base sm:text-sm pl-9 pr-4 py-3 rounded-2xl border border-[#D6CBC0] bg-warmgray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 focus:border-terracotta-500 transition-all text-warmgray-900"
              />
            </div>
            <p className="text-[11px] text-warmgray-500 mt-1.5">
              Minimum donation of $5 to cover secure payment processing.
            </p>
          </div>

          {/* Current Selected Display */}
          <div className="p-4 rounded-2xl bg-warmgray-50 border border-[#EFE8E0] flex items-center justify-between text-xs text-warmgray-700">
            <div>
              <span className="text-warmgray-600">Selected gift amount:</span>
              <div className="text-terracotta-600 text-lg font-black" id="current-amount-display">
                ${activeAmount > 0 ? activeAmount : 0} SGD
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-full bg-white border border-[#E8E1DA] font-bold text-[11px] text-warmgray-800">
                🇸🇬 100% Stays in SG
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            id="btn-confirm-contribution"
            type="button"
            onClick={handleConfirm}
            disabled={activeAmount < 5}
            className="touch-target w-full py-4 px-4 bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all tap-scale flex items-center justify-center gap-2"
          >
            <span>Confirm Contribution</span>
            <span>❤️</span>
          </button>
        </div>
      ) : (
        /* Thank You View */
        <div
          id="support-thank-you"
          className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 text-center shadow-xs space-y-5"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-3xl sm:text-4xl shadow-inner">
            🧡
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              Gift Received
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-warmgray-900">
              Thank you for your warmth!
            </h3>
            <p className="text-base font-bold text-terracotta-600 mt-1" id="thankyou-amount-text">
              Your ${activeAmount} SGD contribution has been recorded.
            </p>
          </div>

          <div className="bg-warmgray-50 border border-[#EFE8E0] rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm leading-relaxed text-warmgray-700 space-y-2.5 max-w-xl mx-auto">
            <p>
              Your gift immediately supports shelter foster meals, emergency rescue transport in Singapore, and basic medications for strays awaiting homes.
            </p>
            <p className="font-bold text-warmgray-900">
              🇸🇬 100% of your funds stay directly within Singapore&rsquo;s community animal rescue ecosystem.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              id="btn-make-another-gift"
              type="button"
              onClick={handleReset}
              className="touch-target px-6 py-3 bg-warmgray-100 hover:bg-warmgray-200 text-warmgray-800 text-xs sm:text-sm font-bold rounded-2xl transition-all tap-scale"
            >
              Make Another Gift
            </button>
            <button
              id="btn-back-to-rescues-grid"
              type="button"
              onClick={onBackToAdopt}
              className="touch-target px-6 py-3 bg-terracotta-50 text-terracotta-600 border border-terracotta-200 text-xs sm:text-sm font-bold rounded-2xl transition-all tap-scale hover:bg-terracotta-100"
            >
              Back to Meet Rescues
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
