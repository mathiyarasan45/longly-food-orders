import React, { useState } from 'react';
import { MapPin, Search, Sparkles, Tag, ShieldCheck, ArrowRight, ChevronRight, Clock, Award, Star, X } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function HomePage({
  location,
  onOpenLocationModal,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  setActiveTab,
  onOpenSellerModal
}) {
  const [isPromoBannerVisible, setIsPromoBannerVisible] = useState(true);
  const [isSellerBannerVisible, setIsSellerBannerVisible] = useState(true);

  // Filter product lists
  const forYouProducts = PRODUCTS.filter(p => p.isForYou);
  const recentlyViewedProducts = PRODUCTS.filter(p => p.isRecentlyViewed);
  const otherProducts = PRODUCTS.filter(p => !p.isForYou && !p.isRecentlyViewed);
  const featuredOfferProducts = PRODUCTS.filter(p => p.isFeaturedOffer);

  return (
    <div className="space-y-10 pb-12">
      
      {/* 1. Hero Location & Delivery Reassurance Header */}
      <section className="bg-gradient-to-br from-[#176B3A] via-[#1b7641] to-[#0f4927] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle Decorative Pattern */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-48 h-48 rounded-full bg-emerald-400/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          
          {/* Top Location Selector Pill */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-amber-200">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>Delivering to: <strong>{location.district}, {location.state} ({location.pincode})</strong></span>
            <button
              onClick={onOpenLocationModal}
              className="ml-2 text-white font-bold underline hover:text-amber-200 transition"
            >
              Change
            </button>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl leading-tight tracking-tight">
            Authentic Indian <span className="text-amber-300">Long-Shelf-Life Foods</span> Direct To Your Home.
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Homemade pickles, mountain honey, fudgy brownies, ghee sweets, and regional thokku—prepared naturally by top Indian artisans & certified brands with central delivery freshness guarantee.
          </p>

          {/* Key Value Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-emerald-100">
            <span className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-300" /> Natural 3–24 Months Shelf Life
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> 100% Expiry & Mfg Transparency
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full border border-white/10">
              <Award className="w-3.5 h-3.5 text-amber-300" /> Verified Indian Sellers
            </span>
          </div>

        </div>
      </section>

      {/* 2. Large Search Bar Section */}
      <section className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E4E9E4] shadow-xs space-y-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAFAF7] border border-[#E4E9E4] focus:border-[#176B3A] rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#17231B] placeholder-[#66736A] focus:outline-none focus:ring-2 focus:ring-[#176B3A]/20 transition shadow-inner font-medium"
          />
          <Search className="w-5 h-5 text-[#176B3A] absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center justify-between text-xs text-[#66736A] px-2">
          <span>Popular searches: Mango Pickle, Pure Honey, Brownie, Gulab Jamun, Thokku</span>
          <button onClick={() => setActiveTab('Categories')} className="text-[#176B3A] font-bold hover:underline hidden sm:inline">
            Browse All Categories →
          </button>
        </div>
      </section>

      {/* 3. Promotional BOGO Advertisement Banner */}
      {isPromoBannerVisible && (
        <section className="relative bg-gradient-to-r from-[#FFF0E8] via-[#fff7f2] to-[#FFF0E8] p-5 sm:p-6 rounded-3xl border border-[#FF6B2C]/20 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setIsPromoBannerVisible(false)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-[#66736A] hover:text-[#17231B] border border-[#E4E9E4] flex items-center justify-center transition shadow-xs"
            title="Close promotional banner"
            aria-label="Close promotional banner"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-4 text-center sm:text-left pr-6 sm:pr-0">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B2C] text-white flex items-center justify-center font-heading font-extrabold text-xl shrink-0 shadow-md transform -rotate-3">
              BOGO
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF6B2C] bg-[#FF6B2C]/10 px-2.5 py-0.5 rounded-full">
                Limited Time Festival Offer
              </span>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#17231B] mt-1">
                Buy 1 Get 1 Free On Selected Pickles & Honey!
              </h3>
              <p className="text-xs text-[#66736A] mt-0.5">
                Order any Mangalorean Prawn Pickle or Organic Forest Honey Jar and get a second jar free.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('Offers')}
            className="bg-[#FF6B2C] hover:bg-[#e5591d] text-white px-5 py-2.5 rounded-2xl font-heading font-bold text-xs shadow-md transition shrink-0 flex items-center gap-1.5"
          >
            <span>Claim BOGO Offer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* 4. "For You" Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#17231B] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF6B2C]" /> For You
            </h2>
            <p className="text-xs text-[#66736A]">Curated long-shelf-life specialties tailored for your region</p>
          </div>
          <button 
            onClick={() => setActiveTab('Categories')}
            className="text-xs font-bold text-[#176B3A] hover:underline flex items-center gap-1"
          >
            See All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {forYouProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 5. Long-Life Offers Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#17231B] flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#176B3A]" /> Exclusive Long-Life Offers
            </h2>
            <p className="text-xs text-[#66736A]">Flat discounts & combo savings on homemade pickles & sweets</p>
          </div>
          <button 
            onClick={() => setActiveTab('Offers')}
            className="text-xs font-bold text-[#176B3A] hover:underline flex items-center gap-1"
          >
            View All Offers <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {featuredOfferProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 6. "Recently Viewed" Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#17231B] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#66736A]" /> Recently Viewed Products
            </h2>
            <p className="text-xs text-[#66736A]">Long-life items you recently explored</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {recentlyViewedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 7. "Other Products" Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#17231B]">
              Other Authentic Long-Life Foods
            </h2>
            <p className="text-xs text-[#66736A]">Discover additional traditional healthy mixes, masalas & dry fruits</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {otherProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 8. Promotional Seller Onboarding Card */}
      {isSellerBannerVisible && (
        <section className="relative bg-[#17231B] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-950">
          <button
            onClick={() => setIsSellerBannerVisible(false)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 flex items-center justify-center transition shadow-xs"
            title="Close seller banner"
            aria-label="Close seller banner"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-2 text-center md:text-left pr-6 md:pr-0">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Become a Longly Partner
            </span>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Are You a Homemade Food Seller or Indian Food Brand?
            </h3>
            <p className="text-xs text-emerald-100/70 max-w-xl">
              Join Longly Food Orders to reach thousands of food lovers nationwide. Our central logistics handles pickup, date tagging, packaging, and door delivery.
            </p>
          </div>

          <button
            onClick={onOpenSellerModal}
            className="bg-[#176B3A] hover:bg-[#12542d] text-white px-6 py-3 rounded-2xl font-heading font-extrabold text-xs shadow-md transition shrink-0 hover:scale-102"
          >
            Join as Seller Now
          </button>
        </section>
      )}

    </div>
  );
}
