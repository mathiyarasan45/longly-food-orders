import React, { useState } from 'react';
import { 
  X, Star, Heart, ShoppingBag, Truck, Calendar, Clock, 
  ShieldCheck, ArrowRight, MessageSquare, Camera, Video,
  CheckCircle2, AlertCircle, Award, Store
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import ProductCard from './ProductCard';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
}) {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('comments'); // 'comments' | 'photos' | 'videos'

  // Similar Products (same category, different product)
  const similarProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  // More Products from same brand
  const brandProducts = PRODUCTS.filter(
    p => p.brandId === product.brandId && p.id !== product.id
  ).slice(0, 3);

  // Circular rating component helper
  const CircularRating = ({ label, score }) => {
    const percentage = (score / 5) * 100;
    const strokeDashoffset = 100 - percentage;

    return (
      <div className="flex flex-col items-center bg-[#FAFAF7] p-3 rounded-xl border border-[#E4E9E4]">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#E4E9E4]"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#176B3A]"
              strokeDasharray="100"
              strokeDashoffset={strokeDashoffset}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute font-heading font-extrabold text-xs text-[#17231B]">
            {score}
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#66736A] mt-1.5">{label}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-[#E4E9E4] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E4E9E4] bg-[#FAFAF7] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#EAF5EC] text-[#176B3A] px-2.5 py-1 rounded-full font-bold">
              {product.categoryName}
            </span>
            <span className="text-xs text-[#66736A] hidden sm:inline">
              Brand: <strong className="text-[#17231B]">{product.brandName}</strong>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E4E9E4] flex items-center justify-center text-[#66736A] hover:bg-[#E4E9E4] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Top Main Section: Image Gallery & Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Image Gallery: 3-4 Thumbnails + Main View */}
            <div className="md:col-span-6 flex flex-col-reverse sm:flex-row gap-3">
              {/* Vertical Thumbnails */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[400px] shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#176B3A] ring-2 ring-[#176B3A]/20'
                        : 'border-[#E4E9E4] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Large Main Display */}
              <div className="flex-1 bg-[#FAFAF7] rounded-2xl overflow-hidden border border-[#E4E9E4] aspect-square relative group">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-300"
                />

                {/* Wishlist Button Overlay */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition ${
                    isWishlisted 
                      ? 'bg-white text-[#FF6B2C]' 
                      : 'bg-white/80 backdrop-blur-xs text-[#66736A] hover:text-[#FF6B2C]'
                  }`}
                  title={isWishlisted ? "Remove Wishlist" : "Add Wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#FF6B2C]' : ''}`} />
                </button>

                {/* Central Delivery Verified Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#E4E9E4] flex items-center gap-1.5 text-xs text-[#176B3A] font-bold shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#176B3A]" />
                  <span>Central Delivery Verified</span>
                </div>
              </div>
            </div>

            {/* Right Product Summary & Actions */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Store className="w-4 h-4 text-[#176B3A]" />
                  <span className="text-xs font-bold text-[#176B3A] uppercase tracking-wider">
                    {product.brandName}
                  </span>
                </div>
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#17231B] leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-[#66736A] mt-1.5 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Discount */}
              <div className="bg-[#FAFAF7] p-3.5 rounded-2xl border border-[#E4E9E4] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-extrabold text-2xl text-[#17231B]">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-[#66736A] line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#176B3A] font-bold mt-0.5">
                    Inclusive of all local taxes & central delivery packaging
                  </p>
                </div>
                {product.discountPercentage > 0 && (
                  <span className="bg-[#FFF0E8] text-[#FF6B2C] border border-[#FF6B2C]/30 text-xs font-extrabold px-3 py-1.5 rounded-xl">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#EAF5EC]/60 p-2.5 rounded-xl border border-[#E4E9E4] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#176B3A] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#66736A] block font-bold">SHELF LIFE</span>
                    <span className="font-bold text-[#17231B]">{product.shelfLife}</span>
                  </div>
                </div>

                <div className="bg-[#FFF0E8]/60 p-2.5 rounded-xl border border-[#E4E9E4] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#66736A] block font-bold">BEST BEFORE</span>
                    <span className="font-bold text-[#17231B]">{product.expiryDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-[#EAF5EC] hover:bg-[#176B3A] text-[#176B3A] hover:text-white py-3 px-4 rounded-2xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => onBuyNow(product)}
                  className="bg-[#FF6B2C] hover:bg-[#e5591d] text-white py-3 px-4 rounded-2xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition shadow-md"
                >
                  <span>Buy Now / Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Section 2: Detailed Product Specifications & Dates */}
          <div className="border-t border-[#E4E9E4] pt-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#17231B] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#176B3A]" />
              Product Transparency & Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 bg-[#FAFAF7] rounded-xl border border-[#E4E9E4]">
                <span className="text-[10px] font-bold uppercase text-[#66736A]">Weight / Quantity</span>
                <p className="font-heading font-bold text-sm text-[#17231B] mt-1">{product.weight}</p>
              </div>

              <div className="p-3.5 bg-[#FAFAF7] rounded-xl border border-[#E4E9E4]">
                <span className="text-[10px] font-bold uppercase text-[#66736A]">Manufacturing Date</span>
                <p className="font-heading font-bold text-sm text-[#17231B] mt-1">{product.mfgDate}</p>
              </div>

              <div className="p-3.5 bg-[#FAFAF7] rounded-xl border border-[#E4E9E4]">
                <span className="text-[10px] font-bold uppercase text-[#66736A]">Expiry / Best Before</span>
                <p className="font-heading font-bold text-sm text-[#17231B] mt-1">{product.expiryDate}</p>
              </div>

              <div className="p-3.5 bg-[#FAFAF7] rounded-xl border border-[#E4E9E4]">
                <span className="text-[10px] font-bold uppercase text-[#66736A]">Central Logistics</span>
                <p className="font-heading font-bold text-sm text-[#176B3A] mt-1">Verified Seller Packaging</p>
              </div>
            </div>

            {/* Ingredients & Storage Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4]">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#176B3A] mb-1.5">
                  Ingredients Used
                </h4>
                <p className="text-[#17231B] leading-relaxed">{product.ingredients}</p>
              </div>

              <div className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4]">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#FF6B2C] mb-1.5">
                  Storage & Preservation Instructions
                </h4>
                <p className="text-[#17231B] leading-relaxed">{product.storageInstructions}</p>
              </div>
            </div>
          </div>

          {/* Section 3: Circular Ratings Breakdown */}
          <div className="border-t border-[#E4E9E4] pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#17231B]">Customer Rating Breakdown</h3>
                <p className="text-xs text-[#66736A]">Based on verified long-life food buyer evaluations</p>
              </div>
              <div className="flex items-center gap-2 bg-[#EAF5EC] px-3 py-1.5 rounded-full self-start">
                <Star className="w-4 h-4 fill-[#176B3A] text-[#176B3A]" />
                <span className="font-heading font-bold text-sm text-[#176B3A]">{product.rating} / 5.0</span>
                <span className="text-xs text-[#66736A]">({product.reviewCount} Reviews)</span>
              </div>
            </div>

            {/* 4 Circular Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <CircularRating label="Price Value" score={product.aspectRatings?.price || 4.8} />
              <CircularRating label="Taste & Flavor" score={product.aspectRatings?.taste || 5.0} />
              <CircularRating label="Freshness Quality" score={product.aspectRatings?.quality || 4.9} />
              <CircularRating label="Quantity Portion" score={product.aspectRatings?.quantity || 4.7} />
            </div>
          </div>

          {/* Section 4: Customer Feedback Tabs (Comments, Photos, Videos) */}
          <div className="border-t border-[#E4E9E4] pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#17231B]">Customer Feedback</h3>

              {/* 3 Tabs */}
              <div className="flex items-center gap-1 bg-[#FAFAF7] p-1 rounded-xl border border-[#E4E9E4]">
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'comments'
                      ? 'bg-[#176B3A] text-white shadow-xs'
                      : 'text-[#66736A] hover:text-[#17231B]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Comments ({product.reviews?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'photos'
                      ? 'bg-[#176B3A] text-white shadow-xs'
                      : 'text-[#66736A] hover:text-[#17231B]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Photos ({product.photoReviews?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'videos'
                      ? 'bg-[#176B3A] text-white shadow-xs'
                      : 'text-[#66736A] hover:text-[#17231B]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Videos ({product.videoReviews?.length || 0})</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Comments */}
            {activeTab === 'comments' && (
              <div className="space-y-3">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#EAF5EC] text-[#176B3A] font-bold text-xs flex items-center justify-center">
                            {rev.user[0]}
                          </div>
                          <div>
                            <span className="font-heading font-bold text-xs text-[#17231B]">{rev.user}</span>
                            <span className="text-[10px] text-[#66736A] block">{rev.userLocation} • Verified Buyer</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#176B3A]">
                          <Star className="w-3.5 h-3.5 fill-[#176B3A]" />
                          <span>{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#17231B] leading-relaxed">{rev.comment}</p>
                      <p className="text-[10px] text-[#66736A]">{rev.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#66736A] italic py-4 text-center">No review comments yet for this product.</p>
                )}
              </div>
            )}

            {/* Tab 2: Photos */}
            {activeTab === 'photos' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.photoReviews && product.photoReviews.length > 0 ? (
                  product.photoReviews.map((img, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-[#E4E9E4] bg-[#FAFAF7]">
                      <img src={img} alt="Customer upload" className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-6 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] text-center text-xs text-[#66736A]">
                    Customer photo reviews uploaded upon package delivery.
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Videos */}
            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.videoReviews && product.videoReviews.length > 0 ? (
                  product.videoReviews.map((vid, i) => (
                    <div key={i} className="p-3 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] flex items-center gap-3">
                      <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-black shrink-0">
                        <img src={vid.thumbnail} alt="" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h5 className="font-heading font-bold text-xs text-[#17231B]">{vid.title}</h5>
                        <p className="text-[10px] text-[#66736A] mt-0.5">Duration: {vid.duration}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-6 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] text-center text-xs text-[#66736A]">
                    Video review unboxings uploaded by verified buyers.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 5: Similar Products from Other Companies */}
          {similarProducts.length > 0 && (
            <div className="border-t border-[#E4E9E4] pt-6 space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#17231B]">
                Similar {product.categoryName} Products from Other Brands
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProducts.map((simProd) => (
                  <ProductCard
                    key={simProd.id}
                    product={simProd}
                    onSelectProduct={onSelectProduct}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section 6: More Products From This Company */}
          {brandProducts.length > 0 && (
            <div className="border-t border-[#E4E9E4] pt-6 space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#17231B]">
                More Products From <span className="text-[#176B3A]">{product.brandName}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {brandProducts.map((bProd) => (
                  <ProductCard
                    key={bProd.id}
                    product={bProd}
                    onSelectProduct={onSelectProduct}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={false}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
