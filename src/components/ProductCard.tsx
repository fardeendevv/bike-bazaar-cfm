import React, { useState } from 'react';
import { Heart, ShoppingCart, Check, AlertTriangle, Eye } from 'lucide-react';
import { Product } from '../data/defaultProducts';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onViewDetails,
}) => {
  const [addedRecently, setAddedRecently] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    onAddToCart(product);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1200);
  };

  const isOutOfStock = product.stock <= 0;
  const isLimitedStock = product.stock > 0 && product.stock < 5;
  const hasSale = product.oldPrice && product.oldPrice > product.price;

  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-lg p-3 sm:p-4 border border-gray-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(200,16,46,0.14)] hover:border-[#C8102E]/40 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative bg-[#F3F4F6] rounded-md overflow-hidden aspect-[4/3] flex items-center justify-center mb-3">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.08]"
            onError={(e) => {
              // Fallback to placeholder if needed
              (e.target as HTMLImageElement).src = `https://placehold.co/400x300/F3F4F6/C8102E?text=${encodeURIComponent(product.name.slice(0, 18))}`;
            }}
          />

          {/* Badges: Top Left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {hasSale && (
              <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                SALE {Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}%
              </span>
            )}
            {product.badge && !hasSale && (
              <span className="bg-[#171A1D] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Wishlist Heart button: Top Right */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-[#C8102E] flex items-center justify-center transition-colors shadow-sm z-10"
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart 
              className={`w-4 h-4 ${isWishlisted ? 'text-[#C8102E] fill-[#C8102E]' : ''}`} 
            />
          </button>

          {/* Quick view hint icon on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-[#171A1D]/80 text-white text-[11px] font-heading uppercase px-2.5 py-1 rounded flex items-center gap-1 shadow">
              <Eye className="w-3.5 h-3.5" /> Quick View
            </span>
          </div>
        </div>

        {/* Product Meta: Fitment & Stock Status */}
        <div className="flex items-center justify-between gap-1 mb-1.5 text-[11px]">
          {isOutOfStock ? (
            <span className="text-red-600 font-bold uppercase">Out of Stock</span>
          ) : isLimitedStock ? (
            <span className="text-[#F59E0B] font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Only {product.stock} Left
            </span>
          ) : (
            <span className="text-[#16803C] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16803C]"></span> In Stock ({product.stock})
            </span>
          )}
          <span className="text-gray-400 font-mono text-[10px] truncate">{product.sku}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-heading text-base font-semibold text-[#171A1D] group-hover:text-[#C8102E] transition-colors line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Compatible Bikes text */}
        <p className="text-[11px] text-[#6B7280] line-clamp-1 mt-1">
          ✓ Fits {product.compatibleBikes}
        </p>
      </div>

      {/* Pricing & Add to Cart Button */}
      <div className="pt-3 mt-2 border-t border-gray-100">
        <div className="flex items-baseline gap-2 mb-2.5">
          <span className="font-heading text-lg sm:text-xl text-[#C8102E] font-bold">
            Rs. {product.price.toLocaleString('en-PK')}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-[#6B7280] line-through">
              Rs. {product.oldPrice.toLocaleString('en-PK')}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className={`w-full font-heading text-xs sm:text-sm uppercase tracking-wider py-2 sm:py-2.5 px-3 rounded flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : addedRecently
              ? 'bg-[#16803C] text-white'
              : 'bg-[#C8102E] hover:bg-[#A50C24] text-white hover:scale-[1.02] shadow-sm'
          }`}
        >
          {addedRecently ? (
            <>
              <Check className="w-4 h-4" /> Added to Cart
            </>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
