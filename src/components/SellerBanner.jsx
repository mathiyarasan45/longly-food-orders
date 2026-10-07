import React, { useState } from 'react';
import { Store, X, ArrowRight, Sparkles } from 'lucide-react';

export default function SellerBanner({ onOpenSellerModal }) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[#176B3A] via-[#1f7d46] to-[#176B3A] text-white px-4 py-2.5 relative shadow-xs border-b border-emerald-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left pr-8 sm:pr-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <Store className="w-4 h-4 text-emerald-200" />
          </div>
          <p className="text-xs sm:text-sm font-medium">
            <span className="font-bold text-amber-200">Sell Your Long-Life Food With Us!</span> Are you a homemade food seller or brand? Reach customers directly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSellerModal}
            className="bg-gradient-to-r from-[#FF6B2C] to-[#ff854f] hover:from-[#e5591d] hover:to-[#FF6B2C] text-white px-3.5 py-1 rounded-full text-xs font-heading font-bold shadow-xs hover:shadow-md transition flex items-center gap-1.5"
          >
            <span>Join as Seller</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
        title="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
