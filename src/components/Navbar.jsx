import React from 'react';
import { Home, Grid, Tag, Package, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Categories', label: 'Categories', icon: Grid },
    { id: 'Offers', label: 'Offers', icon: Tag },
    { id: 'Orders', label: 'Orders', icon: Package },
    { id: 'Account', label: 'Account', icon: User },
  ];

  return (
    <nav className="bg-white border-b border-[#E4E9E4] shadow-xs sticky top-[69px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center md:justify-start space-x-1 sm:space-x-8 overflow-x-auto custom-scrollbar py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 font-heading text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'border-[#176B3A] text-[#176B3A] bg-[#EAF5EC]/40 rounded-t-lg'
                    : 'border-transparent text-[#66736A] hover:text-[#17231B] hover:border-[#E4E9E4]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#176B3A]' : 'text-[#66736A]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
