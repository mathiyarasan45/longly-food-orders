import React from 'react';
import { Star, Heart, ShoppingBag, ShieldCheck, Clock } from 'lucide-react';

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E4E9E4] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group relative">
      {/* Image Container */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative aspect-4/3 bg-[#FAFAF7] overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition duration-500"
        />

        {/* Shelf Life Pill */}
        <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
          <Clock className="w-3 h-3 text-[#FF6B2C]" />
          <span>Shelf: {product.shelfLife}</span>
        </div>

        {/* Discount Badge if available */}
        {product.discountPercentage > 0 && (
          <div className="absolute bottom-2.5 left-2.5 bg-[#FF6B2C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition shadow-md ${
            isWishlisted 
              ? 'bg-white text-[#FF6B2C]' 
              : 'bg-white/80 backdrop-blur-xs text-[#66736A] hover:text-[#FF6B2C] hover:bg-white'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF6B2C]' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div onClick={() => onSelectProduct(product)} className="cursor-pointer space-y-1.5">
          {/* Brand Name */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#176B3A] uppercase tracking-wide truncate">
              {product.brandName}
            </span>
            <div className="flex items-center gap-1 bg-[#EAF5EC] px-1.5 py-0.5 rounded-md text-[11px] font-bold text-[#176B3A] shrink-0">
              <Star className="w-3 h-3 fill-[#176B3A] text-[#176B3A]" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-heading font-bold text-sm text-[#17231B] group-hover:text-[#176B3A] transition line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#66736A] line-clamp-1">
            Weight: {product.weight} • Mfg: {product.mfgDate}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#E4E9E4] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-extrabold text-base text-[#17231B]">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#66736A] line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[9px] text-[#176B3A] font-bold block">Central Delivery Verified</span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-[#EAF5EC] hover:bg-[#176B3A] text-[#176B3A] hover:text-white px-3 py-1.5 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition shadow-xs hover:shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
