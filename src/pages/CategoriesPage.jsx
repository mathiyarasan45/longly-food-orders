import React, { useState } from 'react';
import { Search, Grid, Building2, Layers, ChevronRight, Star, Clock, Filter } from 'lucide-react';
import { CATEGORIES, BRANDS, PRODUCTS, SUBCATEGORIES_MAP } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function CategoriesPage({
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) {
  const [viewMode, setViewMode] = useState('Items'); // 'Items' | 'Company' | 'Both'
  const [selectedCategory, setSelectedCategory] = useState(null); // category object or null
  const [selectedSubcategory, setSelectedSubcategory] = useState('All'); // subcategory string
  const [selectedBrand, setSelectedBrand] = useState(null); // brand object or null

  // Filter products based on search, category selection, subcategory selection, and brand selection
  let displayProducts = PRODUCTS;

  if (searchQuery.trim() !== '') {
    displayProducts = displayProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory) {
    displayProducts = displayProducts.filter(p => p.category === selectedCategory.id);
    if (selectedSubcategory && selectedSubcategory !== 'All') {
      displayProducts = displayProducts.filter(p => p.subcategory === selectedSubcategory);
    }
  }

  if (selectedBrand) {
    displayProducts = displayProducts.filter(p => p.brandId === selectedBrand.id);
  }

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Header Title */}
      <div className="space-y-1">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17231B]">
          Explore Long-Life Food Categories
        </h1>
        <p className="text-xs text-[#66736A]">
          Filter authentic long-shelf-life Indian delicacies by food category, company brand, or both
        </p>
      </div>

      {/* 1. Top Search Bar */}
      <div className="relative bg-white p-2 sm:p-3 rounded-2xl border border-[#E4E9E4] shadow-xs">
        <input
          type="text"
          placeholder="Search for products, brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#FAFAF7] border border-[#E4E9E4] focus:border-[#176B3A] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#17231B] placeholder-[#66736A] focus:outline-none focus:ring-2 focus:ring-[#176B3A]/20 transition"
        />
        <Search className="w-4 h-4 text-[#176B3A] absolute left-6 top-1/2 -translate-y-1/2" />
      </div>

      {/* 2. EXACTLY 3 Selector Boxes: Items | Company | Both */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* Selector 1: Items */}
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
              By Food Types
            </span>
          </div>
        </button>

        {/* Selector 2: Company */}
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
              By Indian Brands
            </span>
          </div>
        </button>

        {/* Selector 3: Both */}
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
              Combined Explorer
            </span>
          </div>
        </button>

      </div>

      {/* Mode A: ITEMS MODE */}
      {(viewMode === 'Items' || viewMode === 'Both') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#17231B]">
              Long-Life Food Categories ({CATEGORIES.length})
            </h3>
            {selectedCategory && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory('All');
                }}
                className="text-xs font-bold text-[#FF6B2C] hover:underline"
              >
                Clear Category Filter ({selectedCategory.name})
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory?.id === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat);
                    setSelectedSubcategory('All');
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                    isSelected
                      ? 'border-[#176B3A] bg-[#EAF5EC] ring-2 ring-[#176B3A]/30 shadow-sm'
                      : 'border-[#E4E9E4] bg-white hover:border-[#176B3A]/40'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="truncate">
                    <h4 className="font-heading font-bold text-xs text-[#17231B] truncate">{cat.name}</h4>
                    <span className="text-[10px] text-[#66736A] block">{cat.count}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subcategory Drill-Down Chips */}
          {selectedCategory && SUBCATEGORIES_MAP[selectedCategory.id] && (
            <div className="bg-[#EAF5EC]/70 p-4 rounded-2xl border border-[#176B3A]/20 space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading font-extrabold text-[#176B3A] uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#FF6B2C]" /> Subcategory Filter ({selectedCategory.name}):
                </span>
                {selectedSubcategory !== 'All' && (
                  <button
                    onClick={() => setSelectedSubcategory('All')}
                    className="text-[11px] text-[#FF6B2C] hover:underline font-bold"
                  >
                    Clear Subcategory ({selectedSubcategory})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {SUBCATEGORIES_MAP[selectedCategory.id].map(sub => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition ${
                      selectedSubcategory === sub
                        ? 'bg-[#176B3A] text-white shadow-xs'
                        : 'bg-white text-[#17231B] border border-[#E4E9E4] hover:border-[#176B3A]/40'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode B: COMPANY MODE */}
      {(viewMode === 'Company' || viewMode === 'Both') && (
        <div className="space-y-4 border-t border-[#E4E9E4] pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#17231B]">
              Verified Indian Food Brands & Kitchens ({BRANDS.length})
            </h3>
            {selectedBrand && (
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-xs font-bold text-[#FF6B2C] hover:underline"
              >
                Clear Brand Filter ({selectedBrand.name})
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
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 ${
                    isSelected
                      ? 'border-[#176B3A] bg-[#EAF5EC] ring-2 ring-[#176B3A]/30 shadow-sm'
                      : 'border-[#E4E9E4] bg-white hover:border-[#176B3A]/40'
                  }`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#E4E9E4] shrink-0"
                  />
                  <div className="flex-1 truncate">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-xs text-[#17231B] truncate">{brand.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#176B3A]">
                        <Star className="w-3 h-3 fill-[#176B3A]" />
                        <span>{brand.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#66736A] truncate mt-0.5">{brand.specialty}</p>
                    <span className="text-[10px] text-[#176B3A] font-bold block mt-1">{brand.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Product List Grid */}
      <div className="space-y-4 border-t border-[#E4E9E4] pt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-extrabold text-lg text-[#17231B]">
            {selectedCategory ? `${selectedCategory.name} Long-Life Products` : selectedBrand ? `Products by ${selectedBrand.name}` : 'All Long-Life Food Products'}
            <span className="text-xs font-normal text-[#66736A] ml-2">({displayProducts.length} items found)</span>
          </h3>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayProducts.map((product) => (
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
            <p className="text-sm font-bold text-[#17231B]">No products match the selected filters.</p>
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
