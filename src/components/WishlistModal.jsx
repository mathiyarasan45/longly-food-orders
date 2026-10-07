import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct
}) {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E4E9E4] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E4E9E4] bg-[#FAFAF7] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-pink-600" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#17231B]">
                My Saved Wishlist ({wishlistedProducts.length})
              </h3>
              <p className="text-xs text-[#66736A]">Your favorite long-shelf-life delicacies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E4E9E4] flex items-center justify-center text-[#66736A] hover:bg-[#E4E9E4] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {wishlistedProducts.length > 0 ? (
            <div className="space-y-3">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-white rounded-2xl border border-[#E4E9E4] hover:border-[#176B3A]/30 shadow-xs flex items-center gap-4 transition"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#E4E9E4] shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  />

                  <div className="flex-1 truncate space-y-1">
                    <span className="text-[10px] font-bold text-[#176B3A] uppercase">
                      {product.brandName}
                    </span>
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="font-heading font-bold text-xs sm:text-sm text-[#17231B] hover:text-[#176B3A] cursor-pointer truncate"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#66736A]">
                      Shelf Life: {product.shelfLife} • Weight: {product.weight}
                    </p>
                    <div className="flex items-baseline gap-1.5 pt-0.5">
                      <span className="font-heading font-extrabold text-sm text-[#17231B]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#66736A] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onAddToCart(product);
                      }}
                      className="bg-[#EAF5EC] hover:bg-[#176B3A] text-[#176B3A] hover:text-white px-3 py-1.5 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => onToggleWishlist(product)}
                      className="p-1.5 text-[#66736A] hover:text-[#FF6B2C] transition rounded-lg hover:bg-gray-100"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <Heart className="w-12 h-12 text-[#66736A] mx-auto opacity-40" />
              <h4 className="font-heading font-bold text-base text-[#17231B]">Your Wishlist is Empty</h4>
              <p className="text-xs text-[#66736A] max-w-xs mx-auto">
                Explore our catalog to save your favorite pickles, honey, brownies, and sweets.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
