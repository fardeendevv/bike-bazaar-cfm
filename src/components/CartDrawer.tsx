import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { Product } from '../data/defaultProducts';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Compute items details
  const detailedItems = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      item,
      product,
    };
  }).filter(entry => entry.product !== undefined);

  const grossSubtotal = detailedItems.reduce((acc, entry) => {
    return acc + (entry.product!.price * entry.item.quantity);
  }, 0);

  const isFreeDelivery = grossSubtotal >= 15000;
  const deliveryFee = grossSubtotal === 0 ? 0 : isFreeDelivery ? 0 : 250;
  
  const discountRate = appliedCoupon.toUpperCase() === 'BIKER15' ? 0.15 : 0;
  const discountAmount = Math.round(grossSubtotal * discountRate);
  const totalAmount = grossSubtotal - discountAmount + deliveryFee;

  const freeDeliveryProgress = Math.min(100, (grossSubtotal / 15000) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = onApplyCoupon(couponInput.trim());
    if (!ok) {
      setCouponError('Invalid coupon. Try "BIKER15" for 15% off.');
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="bg-[#171A1D] text-white px-5 py-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C8102E]" />
              <h2 className="font-heading text-xl uppercase tracking-wider">
                Shopping Cart ({detailedItems.length})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#2B2F33] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Goal Bar */}
          <div className="bg-[#F3F4F6] px-5 py-2.5 border-b border-gray-200 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-[#171A1D]">
                {isFreeDelivery ? (
                  <span className="text-[#16803C] font-bold flex items-center gap-1">
                    ✓ You unlocked FREE Delivery across Pakistan!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#C8102E]">Rs. {(15000 - grossSubtotal).toLocaleString('en-PK')}</strong> more for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-gray-500 font-mono text-[11px]">
                Rs. 15,000 threshold
              </span>
            </div>
            <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#C8102E] h-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {detailedItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#6B7280]">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-3 stroke-[1.5]" />
                <h3 className="font-heading text-lg text-[#171A1D] uppercase">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mt-1">
                  Explore Section A and B to add genuine motorbike replacement parts.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 bg-[#C8102E] hover:bg-[#A50C24] text-white font-heading text-xs uppercase px-5 py-2.5 rounded shadow"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              detailedItems.map(({ item, product }) => {
                const prod = product!;
                return (
                  <div key={prod.id} className="py-3.5 flex gap-3 items-center">
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.name}
                      className="w-16 h-16 object-contain bg-[#F3F4F6] rounded p-1 shrink-0 border border-gray-200"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-heading text-sm text-[#171A1D] line-clamp-1">
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(prod.id)}
                          className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-[11px] text-gray-400 font-mono">
                        {prod.sku}
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-gray-300 rounded bg-white">
                          <button
                            onClick={() => onUpdateQuantity(prod.id, -1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#171A1D]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(prod.id, 1)}
                            disabled={item.quantity >= prod.stock}
                            className="p-1 hover:bg-gray-100 text-gray-600 disabled:opacity-30 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-heading text-sm font-bold text-[#C8102E]">
                          Rs. {(prod.price * item.quantity).toLocaleString('en-PK')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer */}
          {detailedItems.length > 0 && (
            <div className="bg-[#2B2F33] text-white p-5 border-t border-gray-700 flex flex-col gap-3">
              
              {/* Promo Code input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon (BIKER15)"
                    className="w-full bg-[#171A1D] text-white text-xs px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-[#C8102E] uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-700 hover:bg-gray-600 text-white text-xs font-heading uppercase px-3 py-2 rounded transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="bg-[#171A1D] p-2 rounded flex justify-between items-center text-xs">
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Tag className="w-3.5 h-3.5" /> Coupon Active: {appliedCoupon}
                  </span>
                  <span className="text-gray-400 text-[10px]">15% Off Applied</span>
                </div>
              )}

              {couponError && (
                <p className="text-red-400 text-xs">{couponError}</p>
              )}

              {/* Price Calculations */}
              <div className="flex flex-col gap-1.5 text-xs text-gray-300 pt-1 border-t border-gray-700">
                <div className="flex justify-between">
                  <span>Gross Subtotal</span>
                  <span className="font-heading text-sm text-white">
                    Rs. {grossSubtotal.toLocaleString('en-PK')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon Discount (15%)</span>
                    <span>- Rs. {discountAmount.toLocaleString('en-PK')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Nationwide Courier Fee</span>
                  {isFreeDelivery ? (
                    <span className="text-emerald-400 font-bold uppercase text-[11px]">
                      FREE OVER RS. 15,000
                    </span>
                  ) : (
                    <span className="font-heading text-sm text-white">Rs. 250</span>
                  )}
                </div>

                <div className="flex justify-between items-end pt-2 border-t border-gray-600 font-heading text-lg font-bold text-white">
                  <span>Net Total Amount</span>
                  <span className="text-[#C8102E] text-2xl">
                    Rs. {totalAmount.toLocaleString('en-PK')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={onClearCart}
                  className="px-3 py-3 rounded text-xs text-gray-400 hover:text-white hover:bg-[#171A1D] transition-colors border border-gray-700"
                  title="Clear Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={onProceedToCheckout}
                  className="flex-1 bg-[#C8102E] hover:bg-[#A50C24] text-white font-heading text-base uppercase tracking-wider py-3 px-4 rounded shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cash on Delivery Verified · Open Seal Inspection</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
