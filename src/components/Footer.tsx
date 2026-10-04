import React from 'react';
import { ShieldCheck, MessageSquare, Phone, Truck, Wrench } from 'lucide-react';
import { BikeBazaarLogo } from './BikeBazaarLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B2F33] text-gray-300 pt-12 pb-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <BikeBazaarLogo variant="footer" />
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Pakistan's premier engineered platform for OEM motorcycle spare parts and tuning components. Guaranteed fitment across all nationwide models.
            </p>

            <div className="flex items-center gap-2 text-white text-xs font-semibold mt-1 bg-[#171A1D] p-2.5 rounded border border-gray-700">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>100% GENUINE OEM CERTIFIED</span>
            </div>
          </div>

          {/* Col 2: Popular Bike Models */}
          <div id="popular-models" className="flex flex-col gap-2.5">
            <span className="font-heading text-base uppercase text-white tracking-wider">
              Popular Bike Models
            </span>
            <ul className="text-xs flex flex-col gap-1.5 text-gray-400">
              <li><a href="#section-a" className="hover:text-white transition-colors">Honda CD70 Euro II (All Models)</a></li>
              <li><a href="#section-a" className="hover:text-white transition-colors">Honda CG125 & Special Edition</a></li>
              <li><a href="#section-a" className="hover:text-white transition-colors">Yamaha YBR 125 & 125G</a></li>
              <li><a href="#section-b" className="hover:text-white transition-colors">Pak Suzuki GS 150 & 150SE</a></li>
              <li><a href="#section-b" className="hover:text-white transition-colors">United US 70 / US 100</a></li>
              <li><a href="#section-b" className="hover:text-white transition-colors">Road Prince Passion 70</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Support & Hubs */}
          <div className="flex flex-col gap-2.5">
            <span className="font-heading text-base uppercase text-white tracking-wider">
              Customer Support
            </span>
            <div className="text-xs text-gray-400 flex flex-col gap-2">
              <a 
                href="https://wa.me/923001234567" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-white hover:text-emerald-400 font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                WhatsApp: +92 300 1234567
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8102E]" />
                <span>UAN Helpdesk: 0300-BIKE-786</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-snug">
                Express Dispatch: Karachi, Lahore, Rawalpindi, Peshawar, Faisalabad, Quetta & 300+ tehsils nationwide.
              </p>
              <div className="flex flex-col gap-1 text-[11px] pt-1">
                <span>✓ 7-Day Hassle-free OEM Replacement</span>
                <span>✓ Wholesale Workshop Inquiries Accepted</span>
              </div>
            </div>
          </div>

          {/* Col 4: Payment Partners */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-base uppercase text-white tracking-wider">
              Payment Partners
            </span>
            <p className="text-xs text-gray-400">
              Safe doorstep collection and verified national payment gateways.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-[#171A1D]">
              <span className="bg-white px-2.5 py-1 rounded shadow-xs">CASH ON DELIVERY</span>
              <span className="bg-white px-2.5 py-1 rounded shadow-xs">JAZZCASH</span>
              <span className="bg-white px-2.5 py-1 rounded shadow-xs">EASYPAISA</span>
              <span className="bg-white px-2.5 py-1 rounded shadow-xs">1LINK / BANK</span>
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              Open seal inspection allowed before payment to courier rider.
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 BIKE BAZAAR Pakistan. All rights reserved. Precision spare parts distributor.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SUPPLY</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">OEM COMPLIANCE</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
