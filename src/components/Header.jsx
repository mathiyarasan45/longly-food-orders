import React, { useState } from 'react';
import { MapPin, Search, ShoppingBag, Heart, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

export default function Header({
  location,
  onOpenLocationModal,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  activeTab,
  setActiveTab
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredSuggestions = searchQuery.trim() === ''
    ? PRODUCTS.slice(0, 4)
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  return (
    <header className="bg-white border-b border-[#E4E9E4] sticky top-0 z-40 shadow-xs">
      {/* Upper Bar: Logo + Location + Search + Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo & Platform Positioning */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('Home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#176B3A] to-[#0f4927] flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-md group-hover:scale-105 transition transform">
                L
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#17231B] flex items-center gap-1">
                  Longly <span className="text-[#176B3A]">Food Orders</span>
                </span>
                <span className="hidden sm:flex text-[10px] font-bold text-[#FF6B2C] tracking-wide uppercase items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#176B3A]" /> Long-Shelf-Life Food Marketplace
                </span>
              </div>
            </button>
          </div>

          {/* Top Location Selector */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-2 bg-[#FAFAF7] hover:bg-[#EAF5EC] border border-[#E4E9E4] hover:border-[#176B3A]/40 px-3 py-1.5 rounded-full text-xs transition text-left"
            >
              <MapPin className="w-3.5 h-3.5 text-[#176B3A] shrink-0" />
              <div className="max-w-[170px] truncate">
                <p className="text-[10px] text-[#66736A] uppercase font-bold tracking-wider leading-none">Deliver To</p>
                <p className="font-heading font-semibold text-[#17231B] text-xs truncate mt-0.5">
                  {location.district}, {location.pincode}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#66736A] shrink-0" />
            </button>
          </div>

          {/* Central Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-[#FAFAF7] focus:bg-white border border-[#E4E9E4] focus:border-[#176B3A] rounded-full py-2 pl-10 pr-4 text-xs sm:text-sm text-[#17231B] placeholder-[#66736A] focus:outline-none focus:ring-2 focus:ring-[#176B3A]/20 transition shadow-inner"
              />
              <Search className="w-4 h-4 text-[#66736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#66736A] hover:text-[#17231B]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search Recommendations Overlay */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#E4E9E4] z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-1.5 text-[11px] font-bold text-[#66736A] uppercase tracking-wider flex items-center justify-between">
                  <span>{searchQuery ? 'Matching Products & Brands' : 'Popular Long-Life Foods'}</span>
                  <Sparkles className="w-3 h-3 text-[#FF6B2C]" />
                </div>

                <div className="divide-y divide-[#E4E9E4]/60">
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((prod) => (
                      <div
                        key={prod.id}
                        onMouseDown={() => {
                          onSelectProduct(prod);
                          setIsSearchFocused(false);
                        }}
                        className="px-4 py-2.5 hover:bg-[#EAF5EC]/50 cursor-pointer flex items-center gap-3 transition"
                      >
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-9 h-9 rounded-lg object-cover border border-[#E4E9E4]" 
                        />
                        <div className="flex-1 truncate">
                          <p className="text-xs font-semibold text-[#17231B] truncate">{prod.name}</p>
                          <p className="text-[11px] text-[#66736A] truncate">
                            {prod.brandName} • <span className="font-mono text-[#176B3A] font-bold">₹{prod.price}</span>
                          </p>
                        </div>
                        <span className="text-[10px] bg-[#EAF5EC] text-[#176B3A] px-2 py-0.5 rounded-full font-bold">
                          {prod.categoryName}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-[#66736A] text-center">
                      No long-life products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 sm:px-3 sm:py-2 rounded-full hover:bg-[#FAFAF7] text-[#17231B] relative flex items-center gap-1.5 transition border border-transparent hover:border-[#E4E9E4]"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#FF6B2C] text-[#FF6B2C]' : 'text-[#66736A]'}`} />
              <span className="hidden lg:inline text-xs font-semibold">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6B2C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="bg-[#176B3A] hover:bg-[#12542d] text-white px-3 py-2 rounded-full text-xs font-heading font-bold flex items-center gap-2 shadow-md transition transform hover:scale-102"
              title="My Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#FF6B2C] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#176B3A]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>

        </div>

        {/* Mobile Location Selector Row */}
        <div className="mt-2.5 pt-2 border-t border-[#E4E9E4] flex md:hidden items-center justify-between">
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 text-xs text-[#17231B] hover:text-[#176B3A] transition"
          >
            <MapPin className="w-3.5 h-3.5 text-[#176B3A]" />
            <span className="font-semibold truncate max-w-[220px]">
              Delivering to: <span className="underline">{location.district}, {location.pincode}</span>
            </span>
            <ChevronDown className="w-3 h-3 text-[#66736A]" />
          </button>
        </div>
      </div>
    </header>
  );
}
