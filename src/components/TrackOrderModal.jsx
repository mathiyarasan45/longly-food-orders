import React from 'react';
import { X, CheckCircle2, Truck, PackageCheck, MapPin, Calendar, Clock, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function TrackOrderModal({ order, onClose }) {
  if (!order) return null;

  const steps = [
    { title: 'Order Placed', desc: 'Received & sent to seller kitchen', key: 'Order Placed' },
    { title: 'Ready to Ship', desc: 'Central delivery agent verified & packed', key: 'Ready to Ship' },
    { title: 'Out for Delivery', desc: 'Dispatch agent on the way to address', key: 'Out for Delivery' },
    { title: 'Delivered', desc: 'Handed over safely to recipient', key: 'Delivered' },
  ];

  // Determine current step index based on order.status
  const currentStepIndex = steps.findIndex(s => s.key === order.status);
  const activeIndex = currentStepIndex !== -1 ? currentStepIndex : (order.status === 'Confirmed' ? 0 : 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E4E9E4] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E4E9E4] bg-[#FAFAF7] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#EAF5EC] text-[#176B3A] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#17231B]">
                Track Order: <span className="text-[#176B3A]">{order.id}</span>
              </h3>
              <p className="text-xs text-[#66736A]">Central Logistics Live Status</p>
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
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar">
          
          {/* Top Status Highlight Banner */}
          <div className="bg-gradient-to-r from-[#176B3A] to-[#12542d] text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-200 tracking-wider">Current Status</span>
              <h4 className="font-heading font-extrabold text-lg text-white mt-0.5">{order.status}</h4>
              <p className="text-xs text-emerald-100 mt-1">Expected Delivery: {order.expectedDelivery}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-emerald-200">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] space-y-6">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#176B3A]">
              Delivery Progress Timeline
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4E9E4]">
              {steps.map((step, idx) => {
                const isCompleted = idx <= activeIndex;
                const isCurrent = idx === activeIndex;

                return (
                  <div key={idx} className="relative flex items-start gap-3">
                    {/* Circle Node */}
                    <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition ${
                      isCompleted
                        ? 'bg-[#176B3A] text-white ring-4 ring-[#EAF5EC]'
                        : 'bg-white border-2 border-[#66736A]/40 text-[#66736A]'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className={`font-heading font-bold text-sm ${isCurrent ? 'text-[#176B3A]' : isCompleted ? 'text-[#17231B]' : 'text-[#66736A]'}`}>
                          {step.title}
                        </h5>
                        {isCurrent && (
                          <span className="text-[10px] bg-[#EAF5EC] text-[#176B3A] px-2 py-0.5 rounded-full font-bold animate-pulse-subtle">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#66736A] mt-0.5 leading-snug">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Content Summary */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#17231B]">
              Ordered Food Package Items
            </h4>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#FAFAF7] rounded-xl border border-[#E4E9E4] flex items-center gap-3">
                  <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover border border-[#E4E9E4]" />
                  <div className="flex-1 truncate">
                    <h5 className="font-heading font-bold text-xs text-[#17231B] truncate">{item.product.name}</h5>
                    <p className="text-[11px] text-[#66736A]">Qty: {item.quantity} • Weight: {item.product.weight}</p>
                  </div>
                  <span className="font-heading font-bold text-xs text-[#176B3A]">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="p-4 bg-[#FAFAF7] rounded-2xl border border-[#E4E9E4] space-y-1.5 text-xs">
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#FF6B2C] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Destination Address
            </span>
            <p className="font-bold text-[#17231B]">{order.deliveryAddress.name} ({order.deliveryAddress.phone})</p>
            <p className="text-[#66736A] leading-relaxed">{order.deliveryAddress.address}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
