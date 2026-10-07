import React from 'react';
import { ShieldCheck, Truck, Clock, RefreshCw, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenSellerModal }) {
  return (
    <footer className="bg-[#17231B] text-white mt-16 border-t border-emerald-950">
      {/* Platform Value Pillars Bar */}
      <div className="border-b border-[#25392d] bg-[#121c16] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center p-3">
              <div className="w-12 h-12 rounded-2xl bg-[#176B3A]/30 text-emerald-400 flex items-center justify-center mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-white">Extended Shelf Life</h4>
              <p className="text-xs text-emerald-200/70 mt-1">Naturally preserved pickles, honey & sweets guaranteed for months.</p>
            </div>

            <div className="flex flex-col items-center p-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B2C]/20 text-[#FF6B2C] flex items-center justify-center mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-white">Central Delivery System</h4>
              <p className="text-xs text-emerald-200/70 mt-1">Collected directly from sellers & delivered with temperature tracking.</p>
            </div>

            <div className="flex flex-col items-center p-3">
              <div className="w-12 h-12 rounded-2xl bg-[#176B3A]/30 text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-white">100% Date Transparency</h4>
              <p className="text-xs text-emerald-200/70 mt-1">Clear Manufacturing Date, Best Before & Ingredient disclosures.</p>
            </div>

            <div className="flex flex-col items-center p-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B2C]/20 text-[#FF6B2C] flex items-center justify-center mb-3">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-white">Damaged Jar Shield</h4>
              <p className="text-xs text-emerald-200/70 mt-1">Hassle-free instant glass replacement or order credit.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#176B3A] flex items-center justify-center text-white font-heading font-bold text-lg">
                L
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                Longly <span className="text-emerald-400">Food Orders</span>
              </span>
            </div>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Longly Food Orders is India's dedicated online marketplace for authentic homemade and artisanal long-shelf-life food products. Connecting passion-driven food makers directly to food lovers nationwide.
            </p>
            <button
              onClick={onOpenSellerModal}
              className="inline-flex items-center gap-2 bg-[#176B3A] hover:bg-[#1f7d46] text-white px-4 py-2 rounded-xl text-xs font-heading font-bold transition shadow-md"
            >
              <span>Join as Seller / Brand</span>
            </button>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/80 font-medium">
              <li>
                <button onClick={() => setActiveTab('Home')} className="hover:text-emerald-400 transition">
                  Home Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Categories')} className="hover:text-emerald-400 transition">
                  Browse Food Categories
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Offers')} className="hover:text-emerald-400 transition">
                  Exclusive Long-Life Offers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Orders')} className="hover:text-emerald-400 transition">
                  Track & Manage Orders
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Account')} className="hover:text-emerald-400 transition">
                  Account Settings & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Top Long-Life Categories */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Top Specialities
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/80 font-medium">
              <li>Andhra & Chettinad Mango Pickles</li>
              <li>Nilgiri Raw Mountain Honey</li>
              <li>Nitrogen-Sealed Fudgy Brownies</li>
              <li>Srivilliputhur Ghee Sweets</li>
              <li>Spicy Non-Veg Prawn & Fish Pickles</li>
              <li>Sprouted 14-Grain Sathu Maavu Mix</li>
            </ul>
          </div>

          {/* Customer Helpline & Support */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Central Support
            </h4>
            <div className="space-y-3 text-xs text-emerald-200/80">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6B2C]" />
                <div>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase">Customer Helpline</p>
                  <p className="font-mono text-sm font-semibold text-white">1800-425-9988 (Toll Free)</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6B2C]" />
                <div>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase">Email Support</p>
                  <p className="font-medium text-white">support@longlyfoodorders.com</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#FF6B2C] shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-100/70">
                  Longly Logistics Hub, RS Puram Central, Coimbatore, Tamil Nadu - 641002
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-3">
          <p>© 2026 Longly Food Orders Marketplace. All rights reserved. Demo Phase 1 Interface.</p>
          <div className="flex items-center gap-4 text-emerald-200/80">
            <span>Made with <Heart className="w-3.5 h-3.5 inline text-[#FF6B2C] fill-[#FF6B2C]" /> for Indian Homemade Foods</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
