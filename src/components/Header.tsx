import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Heart, ShieldAlert, 
  Menu, X, Phone, MessageSquare, Wrench, Check
} from 'lucide-react';
import { BikeBazaarLogo } from './BikeBazaarLogo';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedBike: string;
  onSelectBike: (bike: string) => void;
  cartBouncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  isAdmin,
  onToggleAdmin,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  selectedBike,
  onSelectBike,
  cartBouncing,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-xl select-none">
      {/* Top Strip */}
      <div className="bg-[#171A1D] text-white text-xs py-1.5 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-wide">
            <span className="flex items-center gap-1 text-[#C8102E] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse"></span>
              NATIONWIDE DELIVERY (PAKISTAN)
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline text-gray-300">CASH ON DELIVERY (COD)</span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:inline text-gray-400">UAN: 0300-BIKE-786</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="https://wa.me/923001234567" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Support
            </a>
            <span className="text-gray-600">|</span>
            <span className="font-bold text-[#C8102E]">PKR (Rs.)</span>
          </div>
        </div>
      </div>

      {/* Main Charcoal Header */}
      <div className="bg-[#171A1D] text-white px-4 py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Main Website Logo */}
          <div className="shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BikeBazaarLogo variant="header" />
          </div>

          {/* Bike Model Selector (Desktop) */}
          <div className="hidden lg:flex items-center bg-[#2B2F33] rounded px-3 py-1.5 border border-gray-700">
            <span className="text-xs text-gray-400 mr-2 font-semibold uppercase">Bike:</span>
            <select
              value={selectedBike}
              onChange={(e) => onSelectBike(e.target.value)}
              className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer pr-1"
            >
              <option value="" className="bg-[#171A1D]">All Motorcycles</option>
              <option value="Honda CD70" className="bg-[#171A1D]">Honda CD70</option>
              <option value="Honda CG125" className="bg-[#171A1D]">Honda CG125</option>
              <option value="Yamaha YBR" className="bg-[#171A1D]">Yamaha YBR 125</option>
              <option value="Suzuki GS150" className="bg-[#171A1D]">Pak Suzuki GS150</option>
              <option value="Pridor" className="bg-[#171A1D]">Honda Pridor</option>
            </select>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search genuine parts: e.g. piston, coil, brake..."
                className="w-full bg-white text-[#171A1D] placeholder:text-gray-400 text-xs px-3.5 py-2.5 rounded-l focus:outline-none font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button className="bg-[#C8102E] hover:bg-[#A50C24] text-white px-4 py-2.5 rounded-r flex items-center justify-center transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Action buttons: Wishlist, Cart, Admin Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-[#C8102E] fill-[#C8102E]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8102E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart with count badge & bounce animation */}
            <button
              onClick={onOpenCart}
              className={`relative p-2 text-gray-300 hover:text-white transition-colors ${cartBouncing ? 'animate-cart-bounce' : ''}`}
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8102E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Toggle button */}
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-heading tracking-wider uppercase transition-all ${
                isAdmin 
                  ? 'bg-[#C8102E] text-white shadow' 
                  : 'bg-[#2B2F33] text-gray-300 hover:text-white border border-gray-700'
              }`}
              title="Admin Inventory Manager"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdmin ? 'Store View' : 'Admin'}</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 md:hidden text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Genuine Spare Parts..."
              className="w-full bg-white text-[#171A1D] placeholder:text-gray-400 text-xs px-3 py-2 rounded-l focus:outline-none font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-12 text-gray-400 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button className="bg-[#C8102E] text-white px-3.5 py-2 rounded-r flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar (Graphite #2B2F33) */}
      <div className="bg-[#2B2F33] text-gray-300 text-xs px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto whitespace-nowrap py-2 gap-6">
          <div className="flex items-center gap-6">
            <a href="#section-a" className="nav-hover-line text-white font-medium hover:text-white">
              Section A: Engine & Electrical
            </a>
            <a href="#section-b" className="nav-hover-line text-white font-medium hover:text-white">
              Section B: Body & Drive
            </a>
            <a href="#offers-banner" className="nav-hover-line text-[#F59E0B] font-bold hover:text-yellow-400 flex items-center gap-1">
              <span>Hot Offers %</span>
            </a>
            <a href="#trust-features" className="nav-hover-line hover:text-white">
              COD & Delivery
            </a>
            <a href="#popular-models" className="nav-hover-line hover:text-white">
              Compatible Models
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-gray-400">
            <span>Karachi · Lahore · Rawalpindi · Faisalabad · Peshawar</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171A1D] text-white px-4 py-3 border-b border-gray-800 flex flex-col gap-3 text-xs">
          <div className="flex flex-col gap-1 pb-2 border-b border-gray-800">
            <label className="text-gray-400 text-[10px] font-bold uppercase">Filter Bike Model:</label>
            <select
              value={selectedBike}
              onChange={(e) => {
                onSelectBike(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="bg-[#2B2F33] text-white text-xs px-2.5 py-1.5 rounded border border-gray-700 focus:outline-none"
            >
              <option value="">All Motorcycles</option>
              <option value="Honda CD70">Honda CD70</option>
              <option value="Honda CG125">Honda CG125</option>
              <option value="Yamaha YBR">Yamaha YBR 125</option>
              <option value="Suzuki GS150">Pak Suzuki GS150</option>
              <option value="Pridor">Honda Pridor</option>
            </select>
          </div>
          <a 
            href="#section-a" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-1 hover:text-[#C8102E]"
          >
            Section A: Engine & Electrical Core
          </a>
          <a 
            href="#section-b" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-1 hover:text-[#C8102E]"
          >
            Section B: Body, Drive & Accessories
          </a>
          <a 
            href="#offers-banner" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-1 text-[#F59E0B] font-bold"
          >
            15% Off Tune-Up Kits (Promo)
          </a>
          <button
            onClick={() => {
              onToggleAdmin();
              setMobileMenuOpen(false);
            }}
            className="text-left py-1 text-red-400 flex items-center gap-1.5 font-bold"
          >
            <Wrench className="w-3.5 h-3.5" />
            {isAdmin ? 'Exit Admin Mode' : 'Open Admin Inventory Manager'}
          </button>
        </div>
      )}
    </header>
  );
};
