import React, { useState } from 'react';
import { 
  X, ShoppingCart, Heart, ShieldCheck, 
  Truck, Check, Plus, Minus, MessageSquare, Wrench 
} from 'lucide-react';
import { Product } from '../data/defaultProducts';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden my-6 border border-gray-200">
        
        {/* Header */}
        <div className="bg-[#171A1D] text-white px-5 py-3.5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-[#C8102E] font-mono text-xs font-bold uppercase">{product.sku}</span>
            <span className="text-gray-500">|</span>
            <span className="text-xs text-gray-300 font-semibold">{product.section}</span>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Image */}
          <div className="relative bg-[#F3F4F6] rounded-lg p-4 flex items-center justify-center aspect-square border border-gray-200">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#171A1D] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:text-[#C8102E]"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'text-[#C8102E] fill-[#C8102E]' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider">
              {product.category}
            </span>

            <h3 className="font-heading text-xl sm:text-2xl uppercase text-[#171A1D] leading-tight">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-2xl text-[#C8102E] font-bold">
                Rs. {product.price.toLocaleString('en-PK')}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.oldPrice.toLocaleString('en-PK')}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Availability:</span>
              {isOutOfStock ? (
                <span className="text-red-600 font-bold uppercase">Out of Stock</span>
              ) : (
                <span className="text-[#16803C] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#16803C]"></span>
                  {product.stock} Units in Central Karachi Hub
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed border-t border-b border-gray-100 py-2.5 my-1">
              {product.description}
            </p>

            {/* Compatibility */}
            <div className="bg-[#F3F4F6] p-2.5 rounded text-xs">
              <span className="font-bold text-[#171A1D] block mb-0.5">Tested Fitment:</span>
              <span className="text-gray-600 font-medium">{product.compatibleBikes}</span>
            </div>

            {/* Quantity stepper & Action */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-gray-300 rounded bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2 hover:bg-gray-100 text-gray-600"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold text-[#171A1D]">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  disabled={qty >= product.stock}
                  className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={isOutOfStock}
                className={`flex-1 font-heading text-sm uppercase tracking-wider py-2.5 px-4 rounded flex items-center justify-center gap-2 shadow transition-transform active:scale-95 ${
                  added ? 'bg-[#16803C] text-white' : 'bg-[#C8102E] hover:bg-[#A50C24] text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Quick WhatsApp Inquiry */}
            <a
              href={`https://wa.me/923001234567?text=${encodeURIComponent(`Hi Bike Bazaar, is "${product.name}" (${product.sku}) available for Cash on Delivery?`)}`}
              target="_blank"
              rel="noreferrer"
              className="text-center text-xs text-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-1.5 font-semibold pt-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Ask compatibility with mechanic on WhatsApp
            </a>

          </div>
        </div>

      </div>
    </div>
  );
};
