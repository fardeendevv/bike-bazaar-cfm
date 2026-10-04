import React, { useState } from 'react';
import { 
  X, CheckCircle, ShieldCheck, Truck, Lock, 
  MessageSquare, Banknote, CreditCard, ChevronRight, ArrowLeft 
} from 'lucide-react';
import { Product } from '../data/defaultProducts';
import { CartItem, CheckoutFormState } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  onOrderSuccess: (orderId: string, form: CheckoutFormState, total: number) => void;
  appliedCoupon: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  products,
  onOrderSuccess,
  appliedCoupon,
}) => {
  const [form, setForm] = useState<CheckoutFormState>({
    fullName: '',
    phone: '',
    province: 'Punjab',
    city: 'Lahore',
    address: '',
    instructions: '',
    paymentMethod: 'cod',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    id: string;
    total: number;
    itemsCount: number;
  } | null>(null);

  if (!isOpen) return null;

  const detailedItems = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { item, product };
  }).filter(entry => entry.product !== undefined);

  const grossSubtotal = detailedItems.reduce((acc, entry) => {
    return acc + (entry.product!.price * entry.item.quantity);
  }, 0);

  const isFreeDelivery = grossSubtotal >= 15000;
  const deliveryFee = grossSubtotal === 0 ? 0 : isFreeDelivery ? 0 : 250;
  const discountRate = appliedCoupon.toUpperCase() === 'BIKER15' ? 0.15 : 0;
  const discountAmount = Math.round(grossSubtotal * discountRate);
  const totalAmount = grossSubtotal - discountAmount + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address) {
      alert('Please fill in your full name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderId = 'PK-BB-' + Math.floor(100000 + Math.random() * 900000);
      setCompletedOrder({
        id: generatedOrderId,
        total: totalAmount,
        itemsCount: detailedItems.reduce((acc, i) => acc + i.item.quantity, 0),
      });
      setIsSubmitting(false);
      onOrderSuccess(generatedOrderId, form, totalAmount);
    }, 1000);
  };

  const getWhatsAppOrderLink = () => {
    if (!completedOrder) return '#';
    const itemsText = detailedItems.map(i => `- ${i.product!.name} x${i.item.quantity} (Rs. ${(i.product!.price * i.item.quantity).toLocaleString('en-PK')})`).join('%0A');
    const msg = `*NEW ORDER - BIKE BAZAAR*%0A` +
      `*Order ID:* ${completedOrder.id}%0A` +
      `*Customer:* ${encodeURIComponent(form.fullName)}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone)}%0A` +
      `*City/Province:* ${encodeURIComponent(form.city)}, ${encodeURIComponent(form.province)}%0A` +
      `*Address:* ${encodeURIComponent(form.address)}%0A` +
      `*Payment Method:* ${form.paymentMethod.toUpperCase()}%0A%0A` +
      `*Items:*%0A${itemsText}%0A%0A` +
      `*Total Amount:* Rs. ${completedOrder.total.toLocaleString('en-PK')} (COD)`;
    return `https://wa.me/923001234567?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden my-6 border border-gray-200">
        
        {/* Header */}
        <div className="bg-[#171A1D] text-white px-5 py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] animate-pulse"></span>
            <h2 className="font-heading text-lg sm:text-xl uppercase tracking-wider">
              Fast Checkout & Doorstep Dispatch
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Success State */
          <div className="p-6 sm:p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <h3 className="font-heading text-2xl sm:text-3xl uppercase text-[#171A1D]">
              Order Placed Successfully!
            </h3>
            
            <p className="text-gray-600 text-sm max-w-md mt-2">
              Your spare parts order <strong className="text-[#C8102E] font-mono">#{completedOrder.id}</strong> has been logged. Our dispatch hub will contact you before courier handoff.
            </p>

            <div className="bg-[#F3F4F6] p-4 rounded-lg my-6 w-full max-w-md text-left text-xs border border-gray-200">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Order ID</span>
                <span className="font-bold font-mono text-[#171A1D]">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Total Amount Payable</span>
                <span className="font-heading text-sm text-[#C8102E] font-bold">
                  Rs. {completedOrder.total.toLocaleString('en-PK')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Payment Option</span>
                <span className="font-semibold uppercase">{form.paymentMethod.toUpperCase()} (Doorstep)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Delivery Address</span>
                <span className="text-right max-w-[200px] truncate">{form.address}, {form.city}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <a
                href={getWhatsAppOrderLink()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-heading text-sm uppercase tracking-wider py-3 px-4 rounded shadow flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                Confirm on WhatsApp
              </a>
              <button
                onClick={onClose}
                className="bg-[#2B2F33] hover:bg-gray-700 text-white font-heading text-sm uppercase tracking-wider py-3 px-5 rounded"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Active Checkout Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left 7 cols: Form inputs */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-7 p-5 sm:p-6 flex flex-col gap-6 overflow-y-auto max-h-[75vh]">
              
              {/* Step 1: Customer Details */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-3 border-b border-gray-200">
                  <span className="font-heading text-lg text-[#C8102E] font-bold">01</span>
                  <h3 className="font-heading text-base uppercase text-[#171A1D]">
                    Customer & Courier Destination
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Muhammad Usman Ali"
                      className="w-full bg-[#F3F4F6] text-xs px-3 py-2.5 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-[#C8102E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1 flex justify-between">
                      <span>WhatsApp / Mobile Number *</span>
                      <span className="text-[#C8102E] font-bold">SMS / WA Alerts</span>
                    </label>
                    <div className="flex items-center bg-[#F3F4F6] rounded border border-gray-300">
                      <span className="px-2.5 text-xs font-semibold text-gray-500">+92</span>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="300 1234567"
                        className="w-full bg-transparent text-xs py-2.5 pr-3 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Province *
                    </label>
                    <select
                      value={form.province}
                      onChange={(e) => setForm({ ...form, province: e.target.value })}
                      className="w-full bg-[#F3F4F6] text-xs px-3 py-2.5 rounded border border-gray-300 focus:outline-none"
                    >
                      <option value="Punjab">Punjab</option>
                      <option value="Sindh">Sindh</option>
                      <option value="KPK">Khyber Pakhtunkhwa</option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="Islamabad">Islamabad Capital</option>
                      <option value="AJK">Azad Jammu & Kashmir</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      City / Tehsil *
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-[#F3F4F6] text-xs px-3 py-2.5 rounded border border-gray-300 focus:outline-none"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Street Address & Nearest Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Shop/House #, Street name, Near Famous Chowk or Market"
                      className="w-full bg-[#F3F4F6] text-xs px-3 py-2.5 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-[#C8102E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Rider Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.instructions}
                      onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                      placeholder="e.g. Call before delivery, drop at workshop desk..."
                      className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Option */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-3 border-b border-gray-200">
                  <span className="font-heading text-lg text-[#C8102E] font-bold">02</span>
                  <h3 className="font-heading text-base uppercase text-[#171A1D]">
                    Choose Payment Option
                  </h3>
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className={`cursor-pointer p-3 rounded border flex items-start gap-3 transition-colors ${
                    form.paymentMethod === 'cod' ? 'bg-red-50/50 border-[#C8102E]' : 'bg-[#F3F4F6] border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={form.paymentMethod === 'cod'}
                      onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                      className="mt-0.5 accent-[#C8102E]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#171A1D] uppercase">
                          Cash on Delivery (COD)
                        </span>
                        <span className="bg-[#C8102E] text-white text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                          Popular
                        </span>
                      </div>
                      <p className="text-gray-500 text-[11px] mt-0.5">
                        Pay cash when the courier rider delivers the parcel to your doorstep. Inspection allowed.
                      </p>
                    </div>
                  </label>

                  <label className={`cursor-pointer p-3 rounded border flex items-start gap-3 transition-colors ${
                    form.paymentMethod === 'wallet' ? 'bg-red-50/50 border-[#C8102E]' : 'bg-[#F3F4F6] border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={form.paymentMethod === 'wallet'}
                      onChange={() => setForm({ ...form, paymentMethod: 'wallet' })}
                      className="mt-0.5 accent-[#C8102E]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#171A1D] uppercase">
                          JazzCash / Easypaisa Direct
                        </span>
                        <span className="text-gray-400 text-[10px] font-mono">0300-1234567</span>
                      </div>
                      <p className="text-gray-500 text-[11px] mt-0.5">
                        Instant mobile account push or direct manual mobile transfer.
                      </p>
                    </div>
                  </label>

                  <label className={`cursor-pointer p-3 rounded border flex items-start gap-3 transition-colors ${
                    form.paymentMethod === 'bank' ? 'bg-red-50/50 border-[#C8102E]' : 'bg-[#F3F4F6] border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={form.paymentMethod === 'bank'}
                      onChange={() => setForm({ ...form, paymentMethod: 'bank' })}
                      className="mt-0.5 accent-[#C8102E]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#171A1D] uppercase">
                          Online Bank Transfer (1Link Raast / Meezan / HBL)
                        </span>
                      </div>
                      <p className="text-gray-500 text-[11px] mt-0.5">
                        Direct IBFT Raast transfer with screenshot verification.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-heading text-lg uppercase tracking-wider py-3.5 rounded shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Dispatch...</span>
                ) : (
                  <>
                    <span>Confirm Cash on Delivery Order</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Right 5 cols: Order Summary */}
            <div className="lg:col-span-5 bg-[#2B2F33] text-white p-5 sm:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-700">
              <div>
                <h3 className="font-heading text-lg uppercase tracking-wider pb-2 border-b border-gray-700 flex justify-between items-center">
                  <span>Order Summary</span>
                  <span className="text-xs text-gray-400 font-mono">
                    {detailedItems.length} Parts
                  </span>
                </h3>

                {/* Items preview list */}
                <div className="py-3 flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {detailedItems.map(({ item, product }) => (
                    <div key={product!.id} className="flex justify-between items-center text-xs">
                      <div className="flex-1 pr-2 truncate">
                        <span className="text-white font-medium">{product!.name}</span>
                        <span className="text-gray-400 block text-[10px]">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-heading text-white shrink-0">
                        Rs. {(product!.price * item.quantity).toLocaleString('en-PK')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="flex flex-col gap-2 pt-3 border-t border-gray-700 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Items Gross Subtotal</span>
                    <span className="font-heading text-white text-sm">
                      Rs. {grossSubtotal.toLocaleString('en-PK')}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Code Discount (15%)</span>
                      <span>- Rs. {discountAmount.toLocaleString('en-PK')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Courier Delivery Fee</span>
                    {isFreeDelivery ? (
                      <span className="text-emerald-400 font-bold uppercase text-[11px]">
                        FREE OVER 15K
                      </span>
                    ) : (
                      <span className="font-heading text-white text-sm">Rs. 250</span>
                    )}
                  </div>

                  <div className="flex justify-between items-end pt-3 border-t border-gray-600 font-heading text-white">
                    <span className="uppercase text-xs tracking-wider text-gray-300">
                      Total Net Payable
                    </span>
                    <span className="text-[#C8102E] text-2xl font-bold">
                      Rs. {totalAmount.toLocaleString('en-PK')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-6 flex flex-col gap-2 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Inspection Allowed:</strong> Check parcel contents before paying rider.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C8102E] shrink-0" />
                  <span><strong>Express TCS / Leopard:</strong> Doorstep delivery in 24-48 hours.</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
