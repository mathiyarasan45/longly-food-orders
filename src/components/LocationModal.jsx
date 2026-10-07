import React, { useState } from 'react';
import { MapPin, X, Check, Navigation, Building2 } from 'lucide-react';
import { SAMPLE_LOCATIONS } from '../data/mockData';

export default function LocationModal({ isOpen, onClose, selectedLocation, onSelectLocation }) {
  const [locations, setLocations] = useState(SAMPLE_LOCATIONS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    address: '',
    pincode: '',
  });

  if (!isOpen) return null;

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!formData.address || !formData.pincode) return;
    const newLoc = {
      id: `loc-${Date.now()}`,
      state: formData.state,
      district: formData.district,
      address: formData.address,
      pincode: formData.pincode,
      isDefault: false,
    };
    setLocations([newLoc, ...locations]);
    onSelectLocation(newLoc);
    setShowAddForm(false);
    setFormData({ state: 'Tamil Nadu', district: 'Coimbatore', address: '', pincode: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E4E9E4] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#E4E9E4] flex items-center justify-between bg-[#FAFAF7]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#EAF5EC] flex items-center justify-center text-[#176B3A]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#17231B]">Select Delivery Location</h3>
              <p className="text-xs text-[#66736A]">Central delivery available across South India</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#66736A] hover:bg-[#E4E9E4] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 custom-scrollbar">
          {!showAddForm ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#66736A]">Saved Addresses</span>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="text-xs font-semibold text-[#176B3A] hover:underline flex items-center gap-1"
                >
                  + Add New Address
                </button>
              </div>

              <div className="space-y-3">
                {locations.map((loc) => {
                  const isSelected = selectedLocation.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => {
                        onSelectLocation(loc);
                        onClose();
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                        isSelected 
                          ? 'border-[#176B3A] bg-[#EAF5EC]/40 ring-2 ring-[#176B3A]/20' 
                          : 'border-[#E4E9E4] bg-white hover:border-[#176B3A]/40'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#176B3A] bg-[#176B3A] text-white' : 'border-[#66736A]/40'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-semibold text-sm text-[#17231B]">{loc.district}, {loc.state}</span>
                          {loc.isDefault && (
                            <span className="text-[10px] bg-[#FFF0E8] text-[#FF6B2C] px-2 py-0.5 rounded-full font-bold">Default</span>
                          )}
                        </div>
                        <p className="text-xs text-[#66736A] mt-1 leading-relaxed">{loc.address}</p>
                        <p className="text-xs font-mono font-medium text-[#176B3A] mt-1.5">PIN: {loc.pincode}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <form onSubmit={handleAddNew} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E9E4]">
                <h4 className="font-heading font-bold text-sm text-[#17231B]">Add Delivery Address</h4>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-[#66736A] hover:underline"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17231B] mb-1">State</label>
                  <select 
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-lg px-3 py-2 text-xs font-medium text-[#17231B] focus:outline-none focus:border-[#176B3A]"
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17231B] mb-1">District / City</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Coimbatore"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-lg px-3 py-2 text-xs text-[#17231B] focus:outline-none focus:border-[#176B3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17231B] mb-1">Street Address & Door No.</label>
                <textarea 
                  required
                  rows={2}
                  placeholder="e.g. 142 West TV Swamy Road, RS Puram"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-lg px-3 py-2 text-xs text-[#17231B] focus:outline-none focus:border-[#176B3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17231B] mb-1">PIN Code</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. 641002"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-[#E4E9E4] rounded-lg px-3 py-2 text-xs text-[#17231B] focus:outline-none focus:border-[#176B3A]"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#176B3A] text-white py-2.5 rounded-xl font-heading font-semibold text-xs hover:bg-[#12542d] transition shadow-md"
              >
                Save & Set Location
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
