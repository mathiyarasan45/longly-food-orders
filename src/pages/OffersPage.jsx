import React, { useState } from 'react';
import { Tag, Search, Grid, Building2, Layers, Gift, Clock, Sparkles, Percent, ArrowRight } from 'lucide-react';
import { CATEGORIES, BRANDS, PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function OffersPage({
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) {
  const [viewMode, setViewMode] = useState('Items'); // 'Items' | 'Company' | 'Both'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Filter products with offers/discounts
  let offerProducts = PRODUCTS.filter(p => p.discountPercentage > 0 || p.isFeaturedOffer);

  if (searchQuery.trim() !== '') {
    offerProducts = offerProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory) {
    offerProducts = offerProducts.filter(p => p.category === selectedCategory.id);
  }

  if (selectedBrand) {
    offerProducts = offerProducts.filter(p => p.brandId === selectedBrand.id);
  }

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Title */}
      <div className="space-y-1">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17231B] flex items-center gap-2">
          <Tag className="w-6 h-6 text-[#FF6B2C]" /> Long-Life Food Offers & Combos
        </h1>
        <p className="text-xs text-[#66736A]">
          Exclusive BOGO deals, flat discounts, and seasonal combo offers on authentic Indian long-life foods
        </p>
      </div>

      {/* 1. Top Search Bar */}
      <div className="relative bg-white p-2 sm:p-3 rounded-2xl border border-[#E4E9E4] shadow-xs">
        <input
          type="text"
          placeholder="Search for offers, products, brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#FAFAF7] border border-[#E4E9E4] focus:border-[#176B3A] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#17231B] placeholder-[#66736A] focus:outline-none focus:ring-2 focus:ring-[#176B3A]/20 transition"
        />
        <Search className="w-4 h-4 text-[#176B3A] absolute left-6 top-1/2 -translate-y-1/2" />
      </div>

      {/* Hero Banner Banner: Krishna Sweets BOGO Showcase */}
      <div className="bg-gradient-to-r from-[#FFF0E8] via-[#fff4ec] to-[#FFF0E8] p-6 rounded-3xl border border-[#FF6B2C]/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#FF6B2C] px-3 py-1 rounded-full">
            Featured Brand Deal • Krishna Sweets (Demo Brand)
          </span>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#17231B]">
            Buy 1 Kg Selected Sweets & Get 500g Mysore Pak Free!
          </h3>
          <p className="text-xs text-[#66736A] max-w-xl">
            Srivilliputhur heritage ghee sweets packed in long-life canisters. Offer valid on Gulab Jamun, Mysore Pak, and Laddu boxes.
          </p>
        </div>

        <button
          onClick={() => {
            const sweet = PRODUCTS.find(p => p.id === 'prod-4');
            if (sweet) onSelectProduct(sweet);
          }}
          className="bg-[#FF6B2C] hover:bg-[#e5591d] text-white px-6 py-3 rounded-2xl font-heading font-extrabold text-xs shadow-lg transition shrink-0 flex items-center gap-2"
        >
          <span>Claim Sweet Offer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. EXACTLY 3 Selector Boxes: Items | Company | Both */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* Items */}
        <button
          onClick={() => {
            setViewMode('Items');
            setSelectedBrand(null);
          }}
          className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2 ${
            viewMode === 'Items'
              ? 'border-[#176B3A] bg-[#176B3A] text-white shadow-md'
              : 'border-[#E4E9E4] bg-white text-[#17231B] hover:border-[#176B3A]/40'
          }`}
        >
          <Grid className="w-5 h-5" />
          <div>
            <span className="font-heading font-extrabold text-sm block">1. Items</span>
            <span className={`text-[10px] block mt-0.5 ${viewMode === 'Items' ? 'text-emerald-100' : 'text-[#66736A]'}`}>
              Food Item Offers
            </span>
          </div>
        </button>

        {/* Company */}
        <button
          onClick={() => {
            setViewMode('Company');
            setSelectedCategory(null);
          }}
          className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2 ${
            viewMode === 'Company'
              ? 'border-[#176B3A] bg-[#176B3A] text-white shadow-md'
              : 'border-[#E4E9E4] bg-white text-[#17231B] hover:border-[#176B3A]/40'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <div>
            <span className="font-heading font-extrabold text-sm block">2. Company</span>
            <span className={`text-[10px] block mt-0.5 ${viewMode === 'Company' ? 'text-emerald-100' : 'text-[#66736A]'}`}>
              Brand Special Offers
            </span>
          </div>
        </button>

        {/* Both */}
        <button
          onClick={() => {
            setViewMode('Both');
          }}
          className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2 ${
            viewMode === 'Both'
              ? 'border-[#176B3A] bg-[#176B3A] text-white shadow-md'
              : 'border-[#E4E9E4] bg-white text-[#17231B] hover:border-[#176B3A]/40'
          }`}
        >
          <Layers className="w-5 h-5" />
          <div>
            <span className="font-heading font-extrabold text-sm block">3. Both</span>
            <span className={`text-[10px] block mt-0.5 ${viewMode === 'Both' ? 'text-emerald-100' : 'text-[#66736A]'}`}>
              All Active Offers
            </span>
          </div>
        </button>

      </div>

      {/* Mode A: ITEM OFFERS */}
      {(viewMode === 'Items' || viewMode === 'Both') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#17231B]">
              Item Category Offers
            </h3>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-bold text-[#FF6B2C] hover:underline"
              >
                Reset ({selectedCategory.name})
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory?.id === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center gap-2.5 ${
                    isSelected
                      ? 'border-[#FF6B2C] bg-[#FFF0E8] ring-2 ring-[#FF6B2C]/20 shadow-xs'
                      : 'border-[#E4E9E4] bg-white hover:border-[#FF6B2C]/40'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <div className="truncate">
                    <h4 className="font-heading font-bold text-xs text-[#17231B] truncate">{cat.name} Offers</h4>
                    <span className="text-[10px] text-[#FF6B2C] font-bold block">Up to 20% OFF</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode B: BRAND OFFERS */}
      {(viewMode === 'Company' || viewMode === 'Both') && (
        <div className="space-y-4 border-t border-[#E4E9E4] pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#17231B]">
              Company & Brand Deals
            </h3>
            {selectedBrand && (
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-xs font-bold text-[#FF6B2C] hover:underline"
              >
                Reset ({selectedBrand.name})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BRANDS.map((brand) => {
              const isSelected = selectedBrand?.id === brand.id;
              return (
                <div
                  key={brand.id}
                  onClick={() => setSelectedBrand(isSelected ? null : brand)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                    isSelected
                      ? 'border-[#176B3A] bg-[#EAF5EC] ring-2 ring-[#176B3A]/30 shadow-xs'
                      : 'border-[#E4E9E4] bg-white hover:border-[#176B3A]/30'
                  }`}
                >
                  <img src={brand.logo} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 truncate">
                    <h4 className="font-heading font-bold text-xs text-[#17231B] truncate">{brand.name}</h4>
                    <span className="text-[10px] text-[#FF6B2C] font-extrabold block">BOGO & Discount Active</span>
                    <span className="text-[10px] text-[#66736A] block mt-0.5">{brand.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Offer Product Grid */}
      <div className="space-y-4 border-t border-[#E4E9E4] pt-6">
        <h3 className="font-heading font-extrabold text-lg text-[#17231B]">
          Current Active Discounted Products ({offerProducts.length})
        </h3>

        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {offerProducts.map((product) => (
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
        ) : (
          <div className="py-12 bg-white rounded-3xl border border-[#E4E9E4] text-center space-y-3">
            <p className="text-sm font-bold text-[#17231B]">No offer items found for this selection.</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedBrand(null);
                setSearchQuery('');
              }}
              className="bg-[#176B3A] text-white text-xs font-heading font-bold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
