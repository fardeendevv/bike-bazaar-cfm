import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  Hero 
} from './components/Hero';
import { 
  ProductCard 
} from './components/ProductCard';
import { 
  CartDrawer 
} from './components/CartDrawer';
import { 
  CheckoutModal 
} from './components/CheckoutModal';
import { 
  ProductModal 
} from './components/ProductModal';
import { 
  AdminConsole 
} from './components/AdminConsole';
import { 
  Footer 
} from './components/Footer';
import { 
  SplashLoader 
} from './components/BikeBazaarLogo';
import { 
  DEFAULT_PRODUCTS, Product, CATEGORIES_SECTION_A, CATEGORIES_SECTION_B 
} from './data/defaultProducts';
import { 
  CartItem, ToastMessage, CheckoutFormState 
} from './types';
import { 
  Percent, ArrowRight, Heart, X, Check, ShoppingCart, SlidersHorizontal, Trash2
} from 'lucide-react';

const STORAGE_KEY_PRODUCTS = 'bike_bazaar_products_v2_10';
const STORAGE_KEY_CART = 'bike_bazaar_cart_v2_10';
const STORAGE_KEY_WISHLIST = 'bike_bazaar_wishlist_v2_10';

export default function App() {
  // --- Persistent State ---
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clean up legacy 46-product cache
      localStorage.removeItem('bike_bazaar_products_v1');
      localStorage.removeItem('bike_bazaar_cart_v1');
      localStorage.removeItem('bike_bazaar_wishlist_v1');

      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        // Always sync bundled local asset URLs for the 10 core products so images work offline and after downloading project code
        return parsed.map((p) => {
          const defaultMatch = DEFAULT_PRODUCTS.find((d) => d.id === p.id);
          if (defaultMatch) {
            return { ...p, imageUrl: defaultMatch.imageUrl };
          }
          return p;
        });
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return DEFAULT_PRODUCTS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return [
      { productId: 'bb-04', quantity: 1 },
      { productId: 'bb-09', quantity: 1 },
      { productId: 'bb-10', quantity: 2 },
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading wishlist from localStorage', e);
    }
    return ['bb-01', 'bb-06', 'bb-07'];
  });

  // --- UI State ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBike, setSelectedBike] = useState('');
  const [activeSectionTab, setActiveSectionTab] = useState<'all' | 'Section A' | 'Section B'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name'>('popular');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Coupons & Animations
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [cartBouncing, setCartBouncing] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaderFinishing, setIsLoaderFinishing] = useState(false);

  // Initial website preloader timer
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsLoaderFinishing(true);
    }, 1500);
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Toast Helper
  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Cart operations
  const triggerCartBounce = () => {
    setCartBouncing(true);
    setTimeout(() => setCartBouncing(false), 600);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) return;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { productId: product.id, quantity }];
    });
    triggerCartBounce();
    showToast(`Added to cart: ${product.name}`, `Rs. ${product.price.toLocaleString('en-PK')}`, 'success');
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    const p = products.find((x) => x.id === productId);
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    if (p) showToast(`Removed from cart`, p.name, 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Shopping cart cleared', undefined, 'info');
  };

  const handleApplyCoupon = (code: string): boolean => {
    if (code.toUpperCase() === 'BIKER15') {
      setAppliedCoupon('BIKER15');
      showToast('Promo Code BIKER15 Applied!', '15% discount will be deducted from order subtotal.', 'success');
      return true;
    }
    return false;
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const isW = wishlistIds.includes(product.id);
    if (isW) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast('Removed from wishlist', product.name, 'info');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast('Saved to wishlist', product.name, 'success');
    }
  };

  // Product CRUD (Admin)
  const handleAddProduct = (newP: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newP,
      id: 'bb-custom-' + Date.now(),
    };
    setProducts((prev) => [product, ...prev]);
    showToast('New SKU published', product.name, 'success');
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Part updated', updated.name, 'success');
  };

  const handleDeleteProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCartItems((prev) => prev.filter((item) => item.productId !== id));
    setWishlistIds((prev) => prev.filter((itemId) => itemId !== id));
    if (p) showToast('Product deleted from inventory', p.name, 'warning');
  };

  const handleResetDefaults = () => {
    if (confirm('Reset catalog to the 10 default products?')) {
      setProducts(DEFAULT_PRODUCTS);
      showToast('Catalog reset', 'All 10 spare parts restored to defaults.', 'info');
    }
  };

  const handleOrderSuccess = (orderId: string, form: CheckoutFormState, total: number) => {
    setCartItems([]);
    showToast(`Order #${orderId} Confirmed!`, `Total Rs. ${total.toLocaleString('en-PK')} (COD)`, 'success');
  };

  // Direct Fitment Part Finder callback from Hero
  const handleHeroFindParts = (bike: string, category: string) => {
    setSelectedBike(bike);
    setSelectedCategory(category);
    if (category) {
      const inA = CATEGORIES_SECTION_A.includes(category);
      setActiveSectionTab(inA ? 'Section A' : 'Section B');
    }
    const elem = document.getElementById(category ? 'catalog-area' : 'section-a');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    showToast(`Filtered for ${bike}`, category ? `Category: ${category}` : 'Showing all matching parts', 'info');
  };

  // Filter and sort products
  const filteredProducts = products.filter((p) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchBikes = p.compatibleBikes.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchCat && !matchBikes) return false;
    }

    // Bike model filter
    if (selectedBike) {
      const b = selectedBike.toLowerCase();
      if (!p.compatibleBikes.toLowerCase().includes(b) && !p.compatibleBikes.toLowerCase().includes('universal')) {
        return false;
      }
    }

    // Section tab filter
    if (activeSectionTab !== 'all' && p.section !== activeSectionTab) {
      return false;
    }

    // Category filter
    if (selectedCategory && p.category !== selectedCategory) {
      return false;
    }

    // Budget filter
    if (budgetFilter === 'low' && p.price > 1500) return false;
    if (budgetFilter === 'mid' && (p.price < 1500 || p.price > 5000)) return false;
    if (budgetFilter === 'high' && p.price < 5000) return false;

    // In Stock Only
    if (inStockOnly && p.stock <= 0) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return b.rating * 10 + (b.stock > 0 ? 100 : 0) - (a.rating * 10 + (a.stock > 0 ? 100 : 0));
  });

  // Separate sorted products by Section A & Section B for structured browsing
  const sectionAProducts = sortedProducts.filter((p) => p.section === 'Section A');
  const sectionBProducts = sortedProducts.filter((p) => p.section === 'Section B');

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // If Admin mode is toggled, display Admin Console
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#F3F4F6]">
        <AdminConsole
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetDefaults={handleResetDefaults}
          onCloseAdmin={() => setIsAdmin(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171A1D]">
      {/* Splash Loading Screen with BIKEBAZAAR SPARE PARTS Logo */}
      {showSplash && <SplashLoader isFinishing={isLoaderFinishing} />}
      
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-lg shadow-xl text-white text-xs flex items-start gap-3 border transition-all animate-bounce-short ${
              toast.type === 'success'
                ? 'bg-[#171A1D] border-[#C8102E]'
                : toast.type === 'warning'
                ? 'bg-amber-900 border-amber-500'
                : 'bg-[#2B2F33] border-gray-600'
            }`}
          >
            <div className="mt-0.5">
              {toast.type === 'success' ? (
                <Check className="w-4 h-4 text-[#C8102E]" />
              ) : (
                <Percent className="w-4 h-4 text-yellow-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-heading uppercase font-bold text-sm tracking-wide text-white">
                {toast.title}
              </div>
              {toast.description && (
                <div className="text-gray-300 text-[11px] mt-0.5">{toast.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBike={selectedBike}
        onSelectBike={setSelectedBike}
        cartBouncing={cartBouncing}
      />

      <main className="flex-1">
        {/* Hero Section with Fitment Part Finder */}
        <Hero onFindParts={handleHeroFindParts} />

        {/* Catalog Control Bar & Filter Chips */}
        <div id="catalog-area" className="bg-[#171A1D] text-white py-4 px-4 sticky top-[108px] z-30 shadow-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto flex flex-col gap-3">
            
            {/* Top row: Section A/B Switcher + Sort + Budget */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Section Tabs */}
              <div className="flex items-center bg-[#2B2F33] p-1 rounded-lg border border-gray-700">
                <button
                  onClick={() => {
                    setActiveSectionTab('all');
                    setSelectedCategory('');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-heading uppercase tracking-wider transition-colors ${
                    activeSectionTab === 'all'
                      ? 'bg-[#C8102E] text-white font-bold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  All Parts ({products.length})
                </button>
                <button
                  onClick={() => {
                    setActiveSectionTab('Section A');
                    setSelectedCategory('');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-heading uppercase tracking-wider transition-colors ${
                    activeSectionTab === 'Section A'
                      ? 'bg-[#C8102E] text-white font-bold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Section A: Engine & Elect.
                </button>
                <button
                  onClick={() => {
                    setActiveSectionTab('Section B');
                    setSelectedCategory('');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-heading uppercase tracking-wider transition-colors ${
                    activeSectionTab === 'Section B'
                      ? 'bg-[#C8102E] text-white font-bold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Section B: Body & Drive
                </button>
              </div>

              {/* Secondary Filters: Budget + Sort + Stock Toggle */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Budget selector */}
                <select
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value as any)}
                  className="bg-[#2B2F33] text-gray-200 px-3 py-1.5 rounded border border-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Budgets</option>
                  <option value="low">Economy (&lt; Rs. 1,500)</option>
                  <option value="mid">Mid-Range (Rs. 1,500 - 5,000)</option>
                  <option value="high">Premium (&gt; Rs. 5,000)</option>
                </select>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#2B2F33] text-gray-200 px-3 py-1.5 rounded border border-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>

                {/* In stock only checkbox */}
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-300 px-2 py-1 select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#C8102E] w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>In Stock</span>
                </label>
              </div>
            </div>

            {/* Bottom Row: Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 text-xs">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  selectedCategory === ''
                    ? 'bg-white text-[#171A1D] border-white font-bold'
                    : 'bg-[#2B2F33] text-gray-300 border-gray-700 hover:border-gray-500'
                }`}
              >
                All Categories
              </button>

              {(activeSectionTab === 'Section B' 
                ? CATEGORIES_SECTION_B 
                : activeSectionTab === 'Section A' 
                ? CATEGORIES_SECTION_A 
                : [...CATEGORIES_SECTION_A, ...CATEGORIES_SECTION_B]
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                  className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#C8102E] text-white border-[#C8102E] font-bold shadow'
                      : 'bg-[#2B2F33] text-gray-300 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  {cat}
                </button>
              ))}

              {(selectedCategory || selectedBike || searchQuery || budgetFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedBike('');
                    setSearchQuery('');
                    setBudgetFilter('all');
                    setActiveSectionTab('all');
                  }}
                  className="px-2.5 py-1 rounded-full bg-red-950 text-red-300 border border-red-800 text-[11px] hover:bg-red-900"
                >
                  Clear Filters ✕
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Search Results Summary (when filtered) */}
        {(searchQuery || selectedBike || selectedCategory || budgetFilter !== 'all') && (
          <div className="bg-[#F3F4F6] border-b border-gray-200 py-3 px-4 text-xs">
            <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-600">
              <div>
                Showing <strong>{sortedProducts.length}</strong> matching spare parts
                {selectedBike && <span> for <strong>{selectedBike}</strong></span>}
                {selectedCategory && <span> in <strong>{selectedCategory}</strong></span>}
                {searchQuery && <span> matching <em>"{searchQuery}"</em></span>}
              </div>
              <span className="text-gray-400 font-mono">Catalog: {products.length} Genuine SKUs</span>
            </div>
          </div>
        )}

        {/* SECTION A: Engine & Electrical Core (Light Gray #F3F4F6) */}
        {(activeSectionTab === 'all' || activeSectionTab === 'Section A') && (
          <section id="section-a" className="bg-[#F3F4F6] py-12 md:py-16 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8102E] uppercase tracking-widest mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#C8102E]"></span>
                    High-Tolerance Assemblies
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl uppercase tracking-tight text-[#171A1D]">
                    SECTION A: ENGINE & ELECTRICAL CORE
                  </h2>
                  <p className="text-[#6B7280] text-xs sm:text-sm mt-0.5">
                    Critical ignition units, stators, cylinder kits, valves, and friction shoes engineered to OEM tolerances.
                  </p>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Categories 1, 2, 3 · {sectionAProducts.length} Parts Available
                </div>
              </div>

              {/* Red Left-Border Category Titles & Product Grids */}
              {CATEGORIES_SECTION_A.map((categoryName) => {
                const categoryProducts = sectionAProducts.filter((p) => p.category === categoryName);
                if (selectedCategory && selectedCategory !== categoryName) return null;
                if (categoryProducts.length === 0) return null;

                return (
                  <div key={categoryName} className="mb-12 last:mb-0">
                    {/* Category Title with expanding Red Left Border */}
                    <div className="category-header-bar border-l-4 border-[#C8102E] pl-3 mb-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-[#171A1D]">
                          {categoryName}
                        </h3>
                        <span className="text-[11px] text-[#6B7280]">
                          100% Factory Match Guaranteed · {categoryProducts.length} items
                        </span>
                      </div>
                      <span className="text-xs font-bold font-mono text-[#C8102E]">
                        Section A
                      </span>
                    </div>

                    {/* Responsive Product Grid: 1 col on xs, 2 cols on mobile, 3 on tablet, 4 on desktop */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                      {categoryProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onToggleWishlist={handleToggleWishlist}
                          isWishlisted={wishlistIds.includes(product.id)}
                          onViewDetails={setSelectedProductForModal}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

            </div>
          </section>
        )}

        {/* OFFERS BANNER (Deep Red #C8102E) */}
        <section id="offers-banner" className="bg-gradient-to-r from-red-800 via-[#C8102E] to-red-900 text-white py-10 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1.5 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-red-200 text-xs font-bold uppercase tracking-widest">
                <Percent className="w-4 h-4 text-yellow-300" />
                LIMITED TIME TUNE-UP FESTIVAL
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight">
                MEHNGAI PE BREAK! FLAT 15% OFF ON TUNE-UP KITS
              </h3>
              <p className="text-red-100 text-xs sm:text-sm max-w-xl">
                Get your ride ready for long tours. Applies to genuine plugs, oil filters, air elements, and heavy clutch friction plates.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#171A1D]/70 p-3 rounded-xl border border-red-400/30">
              <div className="bg-white text-[#171A1D] px-4 py-2 rounded-lg font-heading text-lg font-bold tracking-widest shadow">
                COUPON: <span className="text-[#C8102E]">BIKER15</span>
              </div>
              <button
                onClick={() => handleApplyCoupon('BIKER15')}
                className="bg-white hover:bg-gray-100 text-[#C8102E] font-heading text-sm uppercase tracking-wider px-5 py-2.5 rounded-lg transition-transform active:scale-95 shadow font-bold"
              >
                {appliedCoupon === 'BIKER15' ? 'Applied ✓' : 'Apply Discount'}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION B: Body, Drive & Accessories (White #FFFFFF) */}
        {(activeSectionTab === 'all' || activeSectionTab === 'Section B') && (
          <section id="section-b" className="bg-white py-12 md:py-16 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8102E] uppercase tracking-widest mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#C8102E]"></span>
                    Chassis & Road Dynamics
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl uppercase tracking-tight text-[#171A1D]">
                    SECTION B: BODY, DRIVE & ACCESSORIES
                  </h2>
                  <p className="text-[#6B7280] text-xs sm:text-sm mt-0.5">
                    Heavy gauge drive chains, hydraulic fork shocks, body tabay, wheels, and genuine engine lubricants.
                  </p>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Categories 4, 5, 6 · {sectionBProducts.length} Parts Available
                </div>
              </div>

              {/* Red Left-Border Category Titles & Product Grids */}
              {CATEGORIES_SECTION_B.map((categoryName) => {
                const categoryProducts = sectionBProducts.filter((p) => p.category === categoryName);
                if (selectedCategory && selectedCategory !== categoryName) return null;
                if (categoryProducts.length === 0) return null;

                return (
                  <div key={categoryName} className="mb-12 last:mb-0">
                    {/* Category Title with expanding Red Left Border */}
                    <div className="category-header-bar border-l-4 border-[#C8102E] pl-3 mb-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-[#171A1D]">
                          {categoryName}
                        </h3>
                        <span className="text-[11px] text-[#6B7280]">
                          Certified Compatibility Across All Nationwide Models · {categoryProducts.length} items
                        </span>
                      </div>
                      <span className="text-xs font-bold font-mono text-[#C8102E]">
                        Section B
                      </span>
                    </div>

                    {/* Responsive Product Grid: 1 col on xs, 2 cols on mobile, 3 on tablet, 4 on desktop */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                      {categoryProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onToggleWishlist={handleToggleWishlist}
                          isWishlisted={wishlistIds.includes(product.id)}
                          onViewDetails={setSelectedProductForModal}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

            </div>
          </section>
        )}

      </main>

      {/* Footer (Graphite #2B2F33) */}
      <Footer />

      {/* Slide-In Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        products={products}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        products={products}
        onOrderSuccess={handleOrderSuccess}
        appliedCoupon={appliedCoupon}
      />

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProductForModal ? wishlistIds.includes(selectedProductForModal.id) : false}
      />

      {/* Wishlist Drawer / Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden my-6 border border-gray-200">
            <div className="bg-[#171A1D] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#C8102E] fill-[#C8102E]" />
                <h3 className="font-heading text-lg uppercase tracking-wider">
                  Saved Wishlist ({wishlistIds.length})
                </h3>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto divide-y divide-gray-100">
              {wishlistIds.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-xs">
                  Your wishlist is empty. Click the heart icon on any spare part to save it here.
                </div>
              ) : (
                wishlistIds.map((id) => {
                  const prod = products.find((p) => p.id === id);
                  if (!prod) return null;
                  return (
                    <div key={prod.id} className="py-3 flex items-center justify-between gap-3">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-12 h-12 object-contain bg-[#F3F4F6] rounded p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-sm text-[#171A1D] truncate">{prod.name}</h4>
                        <span className="font-heading text-sm font-bold text-[#C8102E]">
                          Rs. {prod.price.toLocaleString('en-PK')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            handleAddToCart(prod);
                            setWishlistIds((prev) => prev.filter((i) => i !== prod.id));
                          }}
                          className="bg-[#C8102E] text-white px-3 py-1.5 rounded text-xs font-heading uppercase"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => setWishlistIds((prev) => prev.filter((i) => i !== prod.id))}
                          className="p-1.5 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Cart Bar (When Cart Has Items) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-[#171A1D] text-white p-3 z-30 border-t border-gray-800 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-[#C8102E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <div className="text-xs">
              <span className="text-gray-400 block text-[10px]">Total items in cart</span>
              <span className="font-heading text-[#C8102E] font-bold">
                Rs. {cartItems.reduce((acc, i) => {
                  const p = products.find((x) => x.id === i.productId);
                  return acc + (p ? p.price * i.quantity : 0);
                }, 0).toLocaleString('en-PK')}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#C8102E] text-white text-xs font-heading uppercase px-4 py-2 rounded shadow"
          >
            View Cart & Checkout →
          </button>
        </div>
      )}

    </div>
  );
}
