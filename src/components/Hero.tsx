import React, { useState } from 'react';
import { 
  ShoppingBag, Percent, Search, ShieldCheck, 
  Truck, Banknote, RefreshCw, Wrench 
} from 'lucide-react';

interface HeroProps {
  onFindParts: (bike: string, category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onFindParts }) => {
  const [maker, setMaker] = useState('Honda');
  const [model, setModel] = useState('Honda CD70');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFindParts(model, category);
  };

  return (
    <section className="relative bg-[#171A1D] text-white py-12 md:py-16 overflow-hidden border-b border-gray-800">
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#C8102E 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Message */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-[#2B2F33] text-[#F59E0B] px-3 py-1 rounded text-xs font-bold tracking-widest uppercase border border-gray-700 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping"></span>
              PAKISTAN'S PRECISION MOTO NETWORK
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none text-white">
              ASLI PARTS.<br />
              <span className="text-[#C8102E]">SAHI DAAM.</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Pakistan's trusted bike spare parts store. 100% genuine factory-matched components for Honda CD70, CG125, Yamaha YBR 125, Pak Suzuki GS150, and United bikes. Fast nationwide doorstep Cash on Delivery.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href="#section-a" 
                className="bg-[#C8102E] hover:bg-[#A50C24] text-white font-heading text-base tracking-wider uppercase px-6 py-3 rounded shadow-lg transition-transform active:scale-95 hover:scale-105 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Section A
              </a>

              <a 
                href="#section-b" 
                className="bg-[#2B2F33] hover:bg-gray-700 text-white font-heading text-base tracking-wider uppercase px-6 py-3 rounded border border-gray-700 transition-colors flex items-center gap-2"
              >
                <Wrench className="w-5 h-5 text-[#C8102E]" />
                Shop Section B
              </a>

              <a 
                href="#offers-banner" 
                className="text-[#F59E0B] hover:text-yellow-400 font-heading text-base tracking-wider uppercase px-4 py-3 flex items-center gap-1.5"
              >
                <Percent className="w-4 h-4" />
                View 15% Offers
              </a>
            </div>
          </div>

          {/* Right Direct Fitment Part Finder Widget */}
          <div className="lg:col-span-5 bg-[#2B2F33] rounded-xl p-5 sm:p-6 border border-gray-700 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
              <Search className="w-5 h-5 text-[#C8102E]" />
              <span className="font-heading text-xl uppercase tracking-wide text-white">
                Direct Fitment Part Finder
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Step 1: Motorcycle Make
                </label>
                <select 
                  value={maker}
                  onChange={(e) => {
                    setMaker(e.target.value);
                    if (e.target.value === 'Honda') setModel('Honda CD70');
                    else if (e.target.value === 'Yamaha') setModel('Yamaha YBR');
                    else if (e.target.value === 'Suzuki') setModel('Suzuki GS150');
                  }}
                  className="w-full bg-[#171A1D] text-white text-xs px-3 py-2.5 rounded border border-gray-600 focus:outline-none focus:border-[#C8102E]"
                >
                  <option value="Honda">Atlas Honda Pakistan</option>
                  <option value="Yamaha">Yamaha Motor Pakistan</option>
                  <option value="Suzuki">Pak Suzuki Motors</option>
                  <option value="United">United Auto Industries</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Step 2: Model & Displacement
                </label>
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#171A1D] text-white text-xs px-3 py-2.5 rounded border border-gray-600 focus:outline-none focus:border-[#C8102E]"
                >
                  {maker === 'Honda' && (
                    <>
                      <option value="Honda CD70">Honda CD70 Euro II (70cc)</option>
                      <option value="Honda CG125">Honda CG125 & Special Edition (125cc)</option>
                      <option value="Pridor">Honda Pridor (100cc)</option>
                    </>
                  )}
                  {maker === 'Yamaha' && (
                    <>
                      <option value="Yamaha YBR">Yamaha YBR 125 & YBR 125G</option>
                      <option value="Yamaha YB125Z">Yamaha YB125Z DX</option>
                    </>
                  )}
                  {maker === 'Suzuki' && (
                    <>
                      <option value="Suzuki GS150">Pak Suzuki GS150 & 150SE</option>
                      <option value="Suzuki GR150">Suzuki GR150</option>
                    </>
                  )}
                  {maker === 'United' && (
                    <>
                      <option value="Honda CD70">United US 70</option>
                      <option value="Honda CG125">United US 125</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Step 3: Component Category
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#171A1D] text-white text-xs px-3 py-2.5 rounded border border-gray-600 focus:outline-none focus:border-[#C8102E]"
                >
                  <option value="">All Categories</option>
                  <option value="Electrical System & Electronics">Electrical System & Electronics</option>
                  <option value="Engine Components">Engine Components</option>
                  <option value="Brake System">Brake System</option>
                  <option value="Suspension, Frame & Body Parts">Suspension, Frame & Body Parts</option>
                  <option value="Transmission, Wheels & Drive Chain">Transmission, Wheels & Drive Chain</option>
                  <option value="Consumables & Accessories">Consumables & Accessories</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-heading text-sm uppercase tracking-wider py-3 rounded mt-1 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                Find Compatible Parts Now
              </button>
            </form>
          </div>

        </div>

        {/* Trust Badges Strip */}
        <div id="trust-features" className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-3 bg-[#2B2F33]/70 p-3 sm:p-4 rounded border border-gray-700/60">
            <Banknote className="w-8 h-8 text-[#C8102E] shrink-0" />
            <div>
              <div className="font-heading text-sm uppercase text-white tracking-wide">Cash on Delivery</div>
              <div className="text-[11px] text-gray-400">Pay cash at doorstep</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#2B2F33]/70 p-3 sm:p-4 rounded border border-gray-700/60">
            <Truck className="w-8 h-8 text-[#C8102E] shrink-0" />
            <div>
              <div className="font-heading text-sm uppercase text-white tracking-wide">Nationwide Delivery</div>
              <div className="text-[11px] text-gray-400">Karachi to Khyber (TCS/Leopard)</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#2B2F33]/70 p-3 sm:p-4 rounded border border-gray-700/60">
            <ShieldCheck className="w-8 h-8 text-[#C8102E] shrink-0" />
            <div>
              <div className="font-heading text-sm uppercase text-white tracking-wide">100% Genuine Parts</div>
              <div className="text-[11px] text-gray-400">Zero duplicate guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#2B2F33]/70 p-3 sm:p-4 rounded border border-gray-700/60">
            <RefreshCw className="w-8 h-8 text-[#C8102E] shrink-0" />
            <div>
              <div className="font-heading text-sm uppercase text-white tracking-wide">Easy Returns</div>
              <div className="text-[11px] text-gray-400">7-Day fitment warranty</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
