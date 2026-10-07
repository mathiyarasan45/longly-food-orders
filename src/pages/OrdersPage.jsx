import React, { useState } from 'react';
import { 
  Package, ShoppingBag, Truck, Clock, Trash2, Plus, Minus, 
  ArrowRight, ShieldCheck, CheckCircle2, RotateCcw, AlertCircle, XCircle 
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function OrdersPage({
  orders,
  cartItems,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onTrackOrder,
  onCancelOrder,
  onOpenCheckout,
  onSelectProduct,
  activeSubTab, // 'orders' | 'cart'
  setActiveSubTab
}) {
  // Calculate cart financials
  const itemTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((acc, item) => acc + ((item.product.originalPrice || item.product.price) * item.quantity), 0);
  const totalDiscount = originalTotal - itemTotal;

  const deliveryFee = itemTotal > 500 || itemTotal === 0 ? 0 : 40;
  const gst = Math.round(itemTotal * 0.05);
  const convenienceFee = cartItems.length > 0 ? 15 : 0;
  const grandTotal = cartItems.length > 0 ? (itemTotal + deliveryFee + gst + convenienceFee) : 0;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E9E4] pb-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17231B] flex items-center gap-2">
            <Package className="w-7 h-7 text-[#176B3A]" /> Orders & Shopping Cart
          </h1>
          <p className="text-xs text-[#66736A]">
            Manage your long-shelf-life food orders history and active shopping cart
          </p>
        </div>

        {/* Two Required Tabs: My Orders & My Cart */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#E4E9E4] shadow-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              activeSubTab === 'orders'
                ? 'bg-[#176B3A] text-white shadow-md'
                : 'text-[#66736A] hover:text-[#17231B]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('cart')}
            className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              activeSubTab === 'cart'
                ? 'bg-[#176B3A] text-white shadow-md'
                : 'text-[#66736A] hover:text-[#17231B]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Cart ({cartItems.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MY ORDERS */}
      {activeSubTab === 'orders' && (
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl border border-[#E4E9E4] shadow-xs overflow-hidden space-y-4"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-5 bg-[#FAFAF7] border-b border-[#E4E9E4] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#66736A] block">Order Reference ID</span>
                    <span className="font-heading font-extrabold text-sm text-[#17231B]">{ord.id}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#66736A] block">Order Date</span>
                    <span className="font-semibold text-[#17231B]">{ord.date}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#66736A] block">Expected Delivery</span>
                    <span className="font-semibold text-[#176B3A]">{ord.expectedDelivery}</span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-heading font-extrabold flex items-center gap-1.5 ${
                      ord.status === 'Delivered'
                        ? 'bg-[#EAF5EC] text-[#176B3A]'
                        : ord.status === 'Out for Delivery'
                        ? 'bg-[#FFF0E8] text-[#FF6B2C] animate-pulse-subtle'
                        : ord.status === 'Cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {ord.status === 'Cancelled' ? (
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      <span>{ord.status}</span>
                    </span>
                  </div>
                </div>

                {/* Order Items List */}
                <div className="px-4 sm:px-5 space-y-3">
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-[#E4E9E4]/60 last:border-none">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-[#E4E9E4] shrink-0 cursor-pointer"
                        onClick={() => onSelectProduct(item.product)}
                      />
                      <div className="flex-1 truncate">
                        <h4 
                          onClick={() => onSelectProduct(item.product)}
                          className="font-heading font-bold text-xs sm:text-sm text-[#17231B] hover:text-[#176B3A] cursor-pointer truncate"
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#66736A] mt-0.5">
                          {item.product.brandName} • Qty: {item.quantity} • Weight: {item.product.weight}
                        </p>
                        <p className="text-[10px] text-[#176B3A] font-bold mt-0.5">
                          Best Before: {item.product.expiryDate}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-heading font-extrabold text-sm text-[#17231B]">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Actions & Total */}
                <div className="p-4 sm:p-5 bg-[#FAFAF7]/60 border-t border-[#E4E9E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    <span className="text-[#66736A]">Total Paid: </span>
                    <span className="font-heading font-extrabold text-base text-[#176B3A]">
                      ₹{ord.totalAmount}
                    </span>
                    <span className="text-[10px] text-[#66736A] block">Central Logistics Verified</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {ord.status !== 'Cancelled' && (
                      <button
                        onClick={() => onTrackOrder(ord)}
                        className="bg-[#176B3A] hover:bg-[#12542d] text-white px-4 py-2 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 shadow-xs transition"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Order</span>
                      </button>
                    )}

                    {ord.status !== 'Delivered' && ord.status !== 'Cancelled' && (
                      <button
                        onClick={() => onCancelOrder && onCancelOrder(ord.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Order</span>
                      </button>
                    )}

                    <button
                      onClick={() => alert(`Re-ordered ${ord.items[0]?.product.name} into cart!`)}
                      className="bg-white border border-[#E4E9E4] hover:bg-[#EAF5EC] text-[#17231B] px-4 py-2 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#176B3A]" />
                      <span>Re-Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 bg-white rounded-3xl border border-[#E4E9E4] text-center space-y-3">
              <Package className="w-12 h-12 text-[#66736A] mx-auto opacity-50" />
              <h3 className="font-heading font-bold text-base text-[#17231B]">No Order History Yet</h3>
              <p className="text-xs text-[#66736A] max-w-sm mx-auto">
                Explore our authentic long-shelf-life pickles, honey, brownies, and sweets to place your first order.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY CART */}
      {activeSubTab === 'cart' && (
        <div className="space-y-6">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Cart Item Cards (Left 7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-[#17231B]">
                  Cart Items ({cartItems.length})
                </h3>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white p-4 rounded-2xl border border-[#E4E9E4] shadow-xs flex items-center gap-4 transition hover:border-[#176B3A]/30"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#E4E9E4] shrink-0 cursor-pointer"
                        onClick={() => onSelectProduct(item.product)}
                      />

                      <div className="flex-1 truncate space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#176B3A] uppercase">
                            {item.product.brandName}
                          </span>
                          <button
                            onClick={() => onRemoveFromCart(item.product.id)}
                            className="text-[#66736A] hover:text-[#FF6B2C] transition p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h4 
                          onClick={() => onSelectProduct(item.product)}
                          className="font-heading font-bold text-xs sm:text-sm text-[#17231B] hover:text-[#176B3A] cursor-pointer truncate"
                        >
                          {item.product.name}
                        </h4>

                        <p className="text-[11px] text-[#66736A]">
                          Shelf: {item.product.shelfLife} • Weight: {item.product.weight}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-heading font-extrabold text-sm sm:text-base text-[#17231B]">
                            ₹{item.product.price * item.quantity}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#E4E9E4] rounded-xl bg-[#FAFAF7] overflow-hidden">
                            <button
                              onClick={() => onUpdateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-[#66736A] hover:bg-[#E4E9E4] transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 font-heading font-bold text-xs text-[#17231B]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-[#66736A] hover:bg-[#E4E9E4] transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Summary (Right 5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-[#17231B]">
                  Order Summary & Charges
                </h3>

                <div className="bg-white p-6 rounded-3xl border border-[#E4E9E4] shadow-xs space-y-4 text-xs">
                  <div className="space-y-2.5 border-b border-[#E4E9E4] pb-4 text-[#17231B]">
                    <div className="flex justify-between">
                      <span className="text-[#66736A]">Item Total</span>
                      <span className="font-semibold">₹{itemTotal}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#66736A]">Delivery Charge (Central Transit)</span>
                      <span className="font-semibold text-[#176B3A]">
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#66736A]">GST (5% Food Tax)</span>
                      <span className="font-semibold">₹{gst}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#66736A]">Convenience Fee</span>
                      <span className="font-semibold">₹{convenienceFee}</span>
                    </div>

                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-[#176B3A] font-bold">
                        <span>Original Price Savings</span>
                        <span>-₹{totalDiscount}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-heading font-extrabold text-base text-[#17231B]">Total Amount</span>
                    <span className="font-heading font-extrabold text-2xl text-[#176B3A]">₹{grandTotal}</span>
                  </div>

                  <div className="p-3 bg-[#EAF5EC] rounded-xl border border-[#176B3A]/20 text-[11px] text-[#176B3A] font-medium leading-relaxed">
                    ✓ Packed directly by verified homemade kitchen sellers & delivered centrally.
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={onOpenCheckout}
                    className="w-full bg-[#FF6B2C] hover:bg-[#e5591d] text-white py-3.5 rounded-2xl font-heading font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 transform hover:scale-101"
                  >
                    <span>Place Order (₹{grandTotal})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="py-16 bg-white rounded-3xl border border-[#E4E9E4] text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#66736A] mx-auto opacity-50" />
              <h3 className="font-heading font-bold text-base text-[#17231B]">Your Cart is Empty</h3>
              <p className="text-xs text-[#66736A] max-w-sm mx-auto">
                Add long-shelf-life mango pickles, wild honey, brownies, or ghee sweets into your cart.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
