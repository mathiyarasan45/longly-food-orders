import React, { useState } from 'react';
import { X, MapPin, Check, Plus, ShieldCheck, Truck, ArrowRight, Tag, Zap } from 'lucide-react';
import { SAMPLE_LOCATIONS } from '../data/mockData';

export default function CheckoutModal({
  isOpen,
  onClose,
  items, // array of { product, quantity }
  onPlaceOrderSuccess,
  currentLocation,
}) {
  if (!isOpen || !items || items.length === 0) return null;

  const [savedAddresses, setSavedAddresses] = useState(SAMPLE_LOCATIONS);
  const [selectedAddressId, setSelectedAddressId] = useState(currentLocation.id || SAMPLE_LOCATIONS[0].id);
  const [deliveryType, setDeliveryType] = useState('standard'); // 'standard' | 'express'
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    address: '',
    pincode: '',
  });

  // Calculate financials
  const itemTotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const originalTotal = items.reduce((acc, item) => acc + ((item.product.originalPrice || item.product.price) * item.quantity), 0);
  const itemDiscount = originalTotal - itemTotal;
  
  const deliveryFee = deliveryType === 'express' ? 80 : (itemTotal > 500 ? 0 : 40);
  const gst = Math.round(itemTotal * 0.05); // 5% GST on packaged food
  const convenienceFee = 15;
  const couponDiscount = couponApplied ? 50 : 0;

  const totalAmount = Math.max(0, itemTotal + deliveryFee + gst + convenienceFee - couponDiscount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'LONGLY50' || couponCode.trim().toUpperCase() === 'BOGO') {
      setCouponApplied(true);
    } else {
      alert('Invalid code! Try LONGLY50 for ₹50 off.');
    }
  };

  const handleAddNewAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.address || !newAddr.pincode) return;
    const added = {
      id: `loc-${Date.now()}`,
      state: newAddr.state,
      district: newAddr.district,
      address: newAddr.address,
      pincode: newAddr.pincode,
      isDefault: false,
    };
    setSavedAddresses([...savedAddresses, added]);
    setSelectedAddressId(added.id);
    setShowAddAddress(false);
    setNewAddr({ state: 'Tamil Nadu', district: 'Coimbatore', address: '', pincode: '' });
  };

  const handleConfirmOrder = () => {
    const chosenAddressObj = savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0];

    const newOrderObj = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      expectedDelivery: deliveryType === 'express' ? '1-2 Days' : '3-4 Days',
      status: 'Order Placed',
      items: items,
      deliveryAddress: {
        name: 'Rajesh Subramanian',
        address: `${chosenAddressObj.address}, ${chosenAddressObj.district}, ${chosenAddressObj.state} - ${chosenAddressObj.pincode}`,
        phone: '+91 98765 43210',
      },
      paymentMethod: 'Pay on Delivery (Central Verified)',
      itemTotal,
      deliveryFee,
      gst,
      discount: itemDiscount + couponDiscount,
      totalAmount,
    };

    onPlaceOrderSuccess(newOrderObj);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E4E9E4] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E4E9E4] bg-[#FAFAF7] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EAF5EC] text-[#176B3A] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#17231B]">
                Central Delivery Checkout
              </h3>
              <p className="text-xs text-[#66736A]">Verify your items and delivery destination</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E4E9E4] flex items-center justify-center text-[#66736A] hover:bg-[#E4E9E4] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Columns: Product Summary + Address Selection + Delivery Speed */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Details Section */}
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-sm text-[#17231B] uppercase tracking-wider">
                  1. Product Summary ({items.length} Items)
                </h4>

                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                  {items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-[#FAFAF7] rounded-xl border border-[#E4E9E4] flex items-center gap-3"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-14 h-14 rounded-lg object-cover border border-[#E4E9E4] shrink-0" 
                      />
                      <div className="flex-1 truncate">
                        <h5 className="font-heading font-bold text-xs text-[#17231B] truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-[#66736A] truncate">
                          {item.product.brandName} • Weight: {item.product.weight}
                        </p>
                        <p className="text-xs font-semibold text-[#176B3A] mt-0.5">
                          Qty: {item.quantity} × ₹{item.product.price}
                        </p>
                      </div>
                      <span className="font-heading font-extrabold text-sm text-[#17231B] shrink-0">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="space-y-3 border-t border-[#E4E9E4] pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-[#17231B] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#176B3A]" />
                    2. Select Delivery Address
                  </h4>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="text-xs font-bold text-[#176B3A] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Address
                  </button>
                </div>

                {/* Add New Address Form drawer */}
                {showAddAddress && (
                  <form onSubmit={handleAddNewAddressSubmit} className="p-4 bg-[#EAF5EC]/40 rounded-2xl border border-[#176B3A]/30 space-y-3">
                    <h5 className="font-heading font-bold text-xs text-[#176B3A]">Add New Saved Address</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <input 
                        type="text" 
                        placeholder="State" 
                        required 
                        value={newAddr.state} 
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="bg-white border border-[#E4E9E4] rounded-lg px-2.5 py-1.5" 
                      />
                      <input 
                        type="text" 
                        placeholder="District/City" 
                        required 
                        value={newAddr.district} 
                        onChange={(e) => setNewAddr({ ...newAddr, district: e.target.value })}
                        className="bg-white border border-[#E4E9E4] rounded-lg px-2.5 py-1.5" 
                      />
                    </div>
                    <textarea 
                      placeholder="Street Address & House No." 
                      required 
                      rows={2} 
                      value={newAddr.address} 
                      onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                      className="w-full bg-white border border-[#E4E9E4] rounded-lg px-2.5 py-1.5 text-xs" 
                    />
                    <input 
                      type="text" 
                      placeholder="PIN Code" 
                      required 
                      value={newAddr.pincode} 
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      className="w-full bg-white border border-[#E4E9E4] rounded-lg px-2.5 py-1.5 text-xs" 
                    />
                    <button 
                      type="submit" 
                      className="w-full bg-[#176B3A] text-white text-xs font-heading font-bold py-2 rounded-xl"
                    >
                      Save Address
                    </button>
                  </form>
                )}

                {/* Saved Address Cards List */}
                <div className="space-y-2">
                  {savedAddresses.map((addr, idx) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                          isSelected
                            ? 'border-[#176B3A] bg-[#EAF5EC]/50 ring-2 ring-[#176B3A]/20'
                            : 'border-[#E4E9E4] bg-white hover:border-[#176B3A]/30'
                        }`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#176B3A] bg-[#176B3A] text-white' : 'border-[#66736A]/40'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-bold text-[#17231B]">
                              Address {idx + 1}: {addr.district}, {addr.state}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[9px] bg-[#FFF0E8] text-[#FF6B2C] px-1.5 py-0.5 rounded font-bold">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-[#66736A] mt-0.5 leading-snug">{addr.address}</p>
                          <p className="font-mono text-[11px] font-bold text-[#176B3A] mt-1">PIN: {addr.pincode}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Options Section */}
              <div className="space-y-3 border-t border-[#E4E9E4] pt-5">
                <h4 className="font-heading font-bold text-sm text-[#17231B] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#FF6B2C]" />
                  3. Delivery Options
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div
                    onClick={() => setDeliveryType('standard')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      deliveryType === 'standard'
                        ? 'border-[#176B3A] bg-[#EAF5EC]/40 ring-2 ring-[#176B3A]/20'
                        : 'border-[#E4E9E4] bg-white'
                    }`}
                  >
                    <div className="font-heading font-bold text-[#17231B]">Standard Delivery</div>
                    <p className="text-[#66736A] text-[11px] mt-0.5">3-4 Days central transit</p>
                    <span className="text-[10px] font-bold text-[#176B3A] block mt-1">
                      {itemTotal > 500 ? 'FREE' : '₹40 Delivery Fee'}
                    </span>
                  </div>

                  <div
                    onClick={() => setDeliveryType('express')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      deliveryType === 'express'
                        ? 'border-[#FF6B2C] bg-[#FFF0E8]/40 ring-2 ring-[#FF6B2C]/20'
                        : 'border-[#E4E9E4] bg-white'
                    }`}
                  >
                    <div className="font-heading font-bold text-[#17231B] flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#FF6B2C]" /> Express Delivery
                    </div>
                    <p className="text-[#66736A] text-[11px] mt-0.5">1-2 Days priority transit</p>
                    <span className="text-[10px] font-bold text-[#FF6B2C] block mt-1">
                      ₹80 Fast Shipping
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Price Breakdown & Coupon */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Coupon Code Section */}
              <div className="bg-[#FAFAF7] p-4 rounded-2xl border border-[#E4E9E4] space-y-3">
                <h5 className="font-heading font-bold text-xs text-[#17231B] uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#FF6B2C]" /> Apply Coupon Code
                </h5>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter LONGLY50" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-[#E4E9E4] rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#176B3A]" 
                  />
                  <button 
                    type="submit" 
                    className="bg-[#176B3A] text-white px-3 py-1.5 rounded-xl text-xs font-heading font-bold hover:bg-[#12542d] transition"
                  >
                    Apply
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-[11px] font-bold text-[#176B3A]">
                    ✓ Coupon LONGLY50 Applied! Extra ₹50 discount credited.
                  </p>
                )}
              </div>

              {/* Price Breakdown Bill Card */}
              <div className="bg-[#FAFAF7] p-5 rounded-2xl border border-[#E4E9E4] space-y-3.5 text-xs">
                <h4 className="font-heading font-bold text-sm text-[#17231B] border-b border-[#E4E9E4] pb-2">
                  Bill Details
                </h4>

                <div className="space-y-2 text-[#17231B]">
                  <div className="flex justify-between">
                    <span className="text-[#66736A]">Item Total</span>
                    <span className="font-semibold">₹{itemTotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#66736A]">Delivery Charges ({deliveryType})</span>
                    <span className="font-semibold text-[#176B3A]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#66736A]">GST (5% Packaged Food Tax)</span>
                    <span className="font-semibold">₹{gst}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#66736A]">Convenience & Packaging Fee</span>
                    <span className="font-semibold">₹{convenienceFee}</span>
                  </div>

                  {(itemDiscount > 0 || couponDiscount > 0) && (
                    <div className="flex justify-between text-[#176B3A] font-bold">
                      <span>Total Savings / Discount</span>
                      <span>-₹{itemDiscount + couponDiscount}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#E4E9E4] flex justify-between items-baseline">
                    <span className="font-heading font-bold text-sm text-[#17231B]">Total Payable Amount</span>
                    <span className="font-heading font-extrabold text-xl text-[#176B3A]">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="bg-[#EAF5EC] p-3 rounded-xl border border-[#176B3A]/20 text-[11px] text-[#176B3A] font-medium leading-relaxed">
                  ✓ Central delivery handles pickup, quality checks, glass safety padding, and direct door dispatch.
                </div>

                {/* Confirm Order CTA */}
                <button
                  onClick={handleConfirmOrder}
                  className="w-full bg-[#FF6B2C] hover:bg-[#e5591d] text-white py-3.5 rounded-2xl font-heading font-extrabold text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 transform hover:scale-101"
                >
                  <span>Place Order (₹{totalAmount})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
