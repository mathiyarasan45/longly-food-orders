import React, { useState } from 'react';
import { X, Store, ShieldCheck, Truck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function JoinSellerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [sellerType, setSellerType] = useState('homemade'); // 'homemade' | 'brand'
  const [form, setForm] = useState({
    name: '',
    brandName: '',
    phone: '',
    city: '',
    specialty: 'Pickles & Thokku',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#E4E9E4] overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E4E9E4] bg-gradient-to-r from-[#176B3A] to-[#12542d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg">
                Sell Your Long-Life Food With Us
              </h3>
              <p className="text-xs text-emerald-100">Reach food lovers across India with central delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAFAF7] rounded-xl border border-[#E4E9E4]">
                <button
                  type="button"
                  onClick={() => setSellerType('homemade')}
                  className={`py-2 rounded-lg text-xs font-heading font-bold transition ${
                    sellerType === 'homemade'
                      ? 'bg-[#176B3A] text-white shadow-xs'
                      : 'text-[#66736A] hover:text-[#17231B]'
                  }`}
                >
                  Homemade Food Kitchen
                </button>

                <button
                  type="button"
                  onClick={() => setSellerType('brand')}
                  className={`py-2 rounded-lg text-xs font-heading font-bold transition ${
                    sellerType === 'brand'
                      ? 'bg-[#176B3A] text-white shadow-xs'
                      : 'text-[#66736A] hover:text-[#17231B]'
                  }`}
                >
                  Established Food Brand
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#17231B] mb-1">Your Full Name / Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lakshmi Narayanan"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#176B3A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#17231B] mb-1">Kitchen / Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amma's Homemade Pickles"
                    value={form.brandName}
                    onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#176B3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#17231B] mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#176B3A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17231B] mb-1">City / Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Madurai, Tamil Nadu"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#176B3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#17231B] mb-1">Primary Long-Life Specialty</label>
                  <select
                    value={form.specialty}
                    onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#176B3A]"
                  >
                    <option value="Pickles & Thokku">Pickles & Thokku</option>
                    <option value="Pure Honey">Pure Honey</option>
                    <option value="Long-Life Sweets">Long-Life Ghee Sweets</option>
                    <option value="Artisan Brownies">Artisan Brownies</option>
                    <option value="Healthy Mixes & Masalas">Healthy Mixes & Masalas</option>
                    <option value="Savouries & Snacks">Savouries & Snacks</option>
                  </select>
                </div>
              </div>

              {/* Benefits checklist */}
              <div className="p-3 bg-[#EAF5EC] rounded-2xl border border-[#176B3A]/20 space-y-1.5 text-[11px] text-[#176B3A]">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B2C]" /> Longly Onboarding Advantages:
                </div>
                <ul className="space-y-1 pl-4 list-disc text-[#17231B]">
                  <li>Centralized pickup & temperature-safe delivery handling</li>
                  <li>Clear manufacturing & expiry date verification seal</li>
                  <li>Zero upfront registration fee for Phase 1 onboarding</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6B2C] hover:bg-[#e5591d] text-white py-3 rounded-2xl font-heading font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <span>Submit Seller Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EAF5EC] text-[#176B3A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-heading font-extrabold text-lg text-[#17231B]">
                Application Received!
              </h4>
              <p className="text-xs text-[#66736A] max-w-sm mx-auto leading-relaxed">
                Thank you for applying to sell on Longly Food Orders! Our central seller onboarding team will contact <strong>{form.phone || 'your phone number'}</strong> within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="bg-[#176B3A] text-white text-xs font-heading font-bold px-6 py-2.5 rounded-xl hover:bg-[#12542d] transition"
              >
                Back to Marketplace
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
