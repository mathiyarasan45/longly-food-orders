import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Package, Heart, ShoppingBag, 
  ChevronRight, ShieldCheck, HelpCircle, Store, Bell, 
  Globe, ChevronDown, CheckCircle2, ArrowRight, Truck, Award,
  Camera, Mic, Info, Lock
} from 'lucide-react';
import { SAMPLE_LOCATIONS, FAQS } from '../data/mockData';

export default function AccountPage({
  location,
  onOpenLocationModal,
  setActiveTab,
  setActiveSubTab,
  onOpenWishlist,
  onOpenSellerModal,
  orders,
  onTrackOrder
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [notifications, setNotifications] = useState({
    whatsapp: true,
    sms: true,
    email: true,
  });
  const [permissions, setPermissions] = useState({
    location: true,
    camera: false,
    microphone: false,
    notification: true,
  });
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Active or latest order if available
  const activeOrder = orders.find(o => o.status !== 'Delivered') || orders[0];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17231B] flex items-center gap-2">
          <User className="w-7 h-7 text-[#176B3A]" /> My Account & Preferences
        </h1>
        <p className="text-xs text-[#66736A]">
          Manage your profile, delivery addresses, order history, helpline support, and seller program
        </p>
      </div>

      {/* 1. Profile Overview Card */}
      <section className="bg-gradient-to-r from-[#176B3A] via-[#1b7641] to-[#0f4927] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Avatar Circle */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-[#176B3A] font-heading font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shrink-0 border-2 border-amber-300">
              A
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">Ananya Sharma</h2>
                <span className="bg-amber-300 text-[#17231B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Award className="w-3 h-3 text-[#176B3A]" /> Premium Club Member
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-300" /> ananya.sharma@example.in
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-300" /> +91 98765 43210
                </span>
              </div>

              <div className="pt-1 flex items-center gap-1 text-xs text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="truncate max-w-md">
                  Default Address: <strong>{location.district}, {location.state} ({location.pincode})</strong>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenLocationModal}
            className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-4 py-2.5 rounded-2xl text-xs font-heading font-bold transition shrink-0 self-start md:self-auto flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>Change Default Address</span>
          </button>

        </div>
      </section>

      {/* 2. Quick Action Grid Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: My Orders */}
        <button
          onClick={() => {
            setActiveTab('Orders');
            setActiveSubTab('orders');
          }}
          className="bg-white p-5 rounded-2xl border border-[#E4E9E4] hover:border-[#176B3A] shadow-xs hover:shadow-md transition text-left space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#176B3A] flex items-center justify-center group-hover:scale-110 transition">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-[#17231B] group-hover:text-[#176B3A]">
              My Orders
            </h3>
            <p className="text-[11px] text-[#66736A] mt-0.5">
              {orders.length} Past & Active Orders
            </p>
          </div>
        </button>

        {/* Card 2: Shopping Cart */}
        <button
          onClick={() => {
            setActiveTab('Orders');
            setActiveSubTab('cart');
          }}
          className="bg-white p-5 rounded-2xl border border-[#E4E9E4] hover:border-[#176B3A] shadow-xs hover:shadow-md transition text-left space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] text-[#FF6B2C] flex items-center justify-center group-hover:scale-110 transition">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-[#17231B] group-hover:text-[#FF6B2C]">
              My Shopping Cart
            </h3>
            <p className="text-[11px] text-[#66736A] mt-0.5">
              View Items & Checkout
            </p>
          </div>
        </button>

        {/* Card 3: Wishlist */}
        <button
          onClick={onOpenWishlist}
          className="bg-white p-5 rounded-2xl border border-[#E4E9E4] hover:border-[#176B3A] shadow-xs hover:shadow-md transition text-left space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-110 transition">
            <Heart className="w-5 h-5 fill-pink-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-[#17231B] group-hover:text-pink-600">
              Saved Wishlist
            </h3>
            <p className="text-[11px] text-[#66736A] mt-0.5">
              Favorite Long-Life Foods
            </p>
          </div>
        </button>

        {/* Card 4: Track Active Package */}
        <button
          onClick={() => {
            if (activeOrder) onTrackOrder(activeOrder);
            else {
              setActiveTab('Orders');
              setActiveSubTab('orders');
            }
          }}
          className="bg-white p-5 rounded-2xl border border-[#E4E9E4] hover:border-[#176B3A] shadow-xs hover:shadow-md transition text-left space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#176B3A] flex items-center justify-center group-hover:scale-110 transition">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-[#17231B] group-hover:text-[#176B3A]">
              Track Package
            </h3>
            <p className="text-[11px] text-[#176B3A] font-bold mt-0.5 truncate">
              {activeOrder ? activeOrder.status : 'No Active Shipment'}
            </p>
          </div>
        </button>

      </section>

      {/* 3. Seller Partner Onboarding Banner */}
      <section className="bg-gradient-to-r from-[#FFF0E8] via-[#fff7f2] to-[#FFF0E8] p-6 rounded-3xl border border-[#FF6B2C]/30 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B2C] text-white flex items-center justify-center font-heading font-extrabold text-xl shrink-0 shadow-md">
            <Store className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF6B2C] bg-[#FF6B2C]/10 px-2.5 py-0.5 rounded-full">
              Longly Seller Partner Network
            </span>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#17231B] mt-1">
              Do You Prepare Long-Shelf-Life Pickles, Honey or Sweets?
            </h3>
            <p className="text-xs text-[#66736A] mt-0.5 max-w-xl">
              Become a verified seller on Longly Food Orders. We take care of central pickup, verification date seals, glass packaging, and nationwide home delivery.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSellerModal}
          className="bg-[#FF6B2C] hover:bg-[#e5591d] text-white px-6 py-3 rounded-2xl font-heading font-extrabold text-xs shadow-md transition shrink-0 flex items-center gap-2"
        >
          <span>Apply as Seller</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 4. Saved Addresses List Section */}
      <section className="bg-white p-6 rounded-3xl border border-[#E4E9E4] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E9E4] pb-3">
          <div>
            <h3 className="font-heading font-bold text-base text-[#17231B] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#176B3A]" /> Saved Delivery Addresses
            </h3>
            <p className="text-xs text-[#66736A]">Manage delivery locations for central transit orders</p>
          </div>
          <button
            onClick={onOpenLocationModal}
            className="text-xs font-bold text-[#176B3A] hover:underline"
          >
            + Add New Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_LOCATIONS.map((loc, idx) => {
            const isSelected = location.id === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => onOpenLocationModal()}
                className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                  isSelected
                    ? 'border-[#176B3A] bg-[#EAF5EC]/40 ring-2 ring-[#176B3A]/20'
                    : 'border-[#E4E9E4] bg-[#FAFAF7] hover:border-[#176B3A]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#17231B]">
                    Address {idx + 1}: {loc.district}
                  </span>
                  {loc.isDefault && (
                    <span className="text-[10px] bg-[#FFF0E8] text-[#FF6B2C] px-2 py-0.5 rounded-full font-bold">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#66736A] leading-relaxed">{loc.address}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#176B3A] pt-1">
                  <span>PIN: {loc.pincode}</span>
                  <span className="font-sans font-bold text-[#176B3A]">
                    {isSelected ? '✓ Selected' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Account Settings & Notification Preferences */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Box A: Order Updates & Alerts */}
        <div className="bg-white p-6 rounded-3xl border border-[#E4E9E4] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-[#17231B] flex items-center gap-2 border-b border-[#E4E9E4] pb-3">
            <Bell className="w-5 h-5 text-[#FF6B2C]" /> Order Notification Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-[#E4E9E4]/60">
              <div>
                <span className="font-heading font-bold text-[#17231B] block">WhatsApp Order Alerts</span>
                <span className="text-[#66736A]">Receive instant dispatch & live tracking links</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.whatsapp}
                onChange={(e) => setNotifications({ ...notifications, whatsapp: e.target.checked })}
                className="w-4 h-4 accent-[#176B3A] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E4E9E4]/60">
              <div>
                <span className="font-heading font-bold text-[#17231B] block">SMS Delivery Updates</span>
                <span className="text-[#66736A]">OTP and delivery partner phone updates</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                className="w-4 h-4 accent-[#176B3A] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="font-heading font-bold text-[#17231B] block">Email Invoices & Offers</span>
                <span className="text-[#66736A]">Weekly BOGO deals and tax invoices</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="w-4 h-4 accent-[#176B3A] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Box B: App Language & Help Helpline */}
        <div className="bg-white p-6 rounded-3xl border border-[#E4E9E4] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-[#17231B] flex items-center gap-2 border-b border-[#E4E9E4] pb-3">
            <Globe className="w-5 h-5 text-[#176B3A]" /> Language & Central Helpline
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#17231B] mb-1">App Display Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#176B3A]"
              >
                <option value="English">English (Default)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
              </select>
            </div>

            <div className="p-3.5 bg-[#EAF5EC] rounded-2xl border border-[#176B3A]/20 space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#176B3A]">Need Help With Your Food Order?</span>
              <p className="font-heading font-extrabold text-sm text-[#17231B]">Call Toll-Free: 1800-425-9988</p>
              <p className="text-[11px] text-[#66736A]">Available Mon–Sat: 9:00 AM – 8:00 PM</p>
            </div>
          </div>
        </div>

      </section>

      {/* 6. Device Permissions Section */}
      <section className="bg-white p-6 rounded-3xl border border-[#E4E9E4] shadow-xs space-y-4">
        <div className="border-b border-[#E4E9E4] pb-3">
          <h3 className="font-heading font-bold text-base text-[#17231B] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#176B3A]" /> Device & Feature Permissions
          </h3>
          <p className="text-xs text-[#66736A]">Manage location, camera, microphone, and notification permissions for Longly Food Orders</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* 1. Location Access */}
          <div className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5EC] text-[#176B3A] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-bold text-[#17231B] block">Location Access</span>
                <span className="text-[#66736A] text-[11px]">Auto-detect delivery district & PIN</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPermissions(p => ({ ...p, location: !p.location }))}
              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out p-0.5 relative ${permissions.location ? 'bg-[#176B3A]' : 'bg-gray-300'}`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-md block transform transition-transform duration-200 ease-in-out ${permissions.location ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* 2. Camera Access */}
          <div className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0E8] text-[#FF6B2C] flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-bold text-[#17231B] block">Camera Access</span>
                <span className="text-[#66736A] text-[11px]">Upload photo reviews of delivered jars</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPermissions(p => ({ ...p, camera: !p.camera }))}
              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out p-0.5 relative ${permissions.camera ? 'bg-[#176B3A]' : 'bg-gray-300'}`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-md block transform transition-transform duration-200 ease-in-out ${permissions.camera ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* 3. Microphone Access */}
          <div className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-bold text-[#17231B] block">Microphone Access</span>
                <span className="text-[#66736A] text-[11px]">Record voice search & video reviews</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPermissions(p => ({ ...p, microphone: !p.microphone }))}
              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out p-0.5 relative ${permissions.microphone ? 'bg-[#176B3A]' : 'bg-gray-300'}`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-md block transform transition-transform duration-200 ease-in-out ${permissions.microphone ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* 4. Notification Access */}
          <div className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-bold text-[#17231B] block">Notification Access</span>
                <span className="text-[#66736A] text-[11px]">Push alerts for order tracking & offers</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPermissions(p => ({ ...p, notification: !p.notification }))}
              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out p-0.5 relative ${permissions.notification ? 'bg-[#176B3A]' : 'bg-gray-300'}`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-md block transform transition-transform duration-200 ease-in-out ${permissions.notification ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Dedicated About Longly Section */}
      <section className="bg-[#FAFAF7] p-6 rounded-3xl border border-[#E4E9E4] shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-[#E4E9E4] pb-3">
          <div className="w-10 h-10 rounded-2xl bg-[#176B3A] text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-sm">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-base text-[#17231B]">
              About Longly Food Orders
            </h3>
            <p className="text-xs text-[#66736A]">India's premier marketplace for authentic long-shelf-life food products</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-[#66736A] leading-relaxed">
          <p className="text-xs font-semibold text-[#17231B]">
            Longly Food Orders is an online marketplace dedicated specifically to long-shelf-life food products.
          </p>

          <div className="space-y-2.5">
            <div className="p-3 bg-white rounded-2xl border border-[#E4E9E4] flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#176B3A] mt-1.5 shrink-0" />
              <span className="text-[#17231B]"><strong>Marketplace Focus:</strong> Longly Food Orders is an online marketplace for long-life food products.</span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#E4E9E4] flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#176B3A] mt-1.5 shrink-0" />
              <span className="text-[#17231B]"><strong>For Sellers & Brands:</strong> Homemade sellers and food companies/brands can list and sell their long-life food products.</span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#E4E9E4] flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#176B3A] mt-1.5 shrink-0" />
              <span className="text-[#17231B]"><strong>For Customers:</strong> Customers can discover products and place orders through the platform.</span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#E4E9E4] flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#176B3A] mt-1.5 shrink-0" />
              <span className="text-[#17231B]"><strong>Managed Delivery Flow:</strong> Longly manages the delivery flow through delivery agents who collect products from sellers and deliver them to customers.</span>
            </div>

            <div className="p-3.5 bg-[#EAF5EC] rounded-2xl border border-[#176B3A]/20 text-[11px] text-[#176B3A] font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#176B3A]" />
              <span>Customers can track order progress from <strong>Order Placed → Ready to Ship → Out for Delivery → Delivered</strong>.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Longly Guarantee & FAQs Accordion */}
      <section className="bg-white p-6 rounded-3xl border border-[#E4E9E4] shadow-xs space-y-4">
        <div>
          <h3 className="font-heading font-extrabold text-xl text-[#17231B] flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#176B3A]" /> Longly Quality & Delivery FAQs
          </h3>
          <p className="text-xs text-[#66736A]">Answers to common questions about long-shelf-life food guarantee</p>
        </div>

        <div className="divide-y divide-[#E4E9E4] border border-[#E4E9E4] rounded-2xl overflow-hidden">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-[#FAFAF7] transition"
                >
                  <span className="font-heading font-bold text-sm text-[#17231B]">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#66736A] shrink-0 transition transform ${isOpen ? 'rotate-180 text-[#176B3A]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#66736A] leading-relaxed bg-[#FAFAF7]/50 border-t border-[#E4E9E4]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
