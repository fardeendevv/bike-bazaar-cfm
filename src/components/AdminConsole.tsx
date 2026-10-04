import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, RotateCcw, Search, 
  X, Check, AlertTriangle, ArrowLeft, Download, Layers 
} from 'lucide-react';
import { Product, DEFAULT_PRODUCTS, CATEGORIES_SECTION_A, CATEGORIES_SECTION_B } from '../data/defaultProducts';
import { BikeBazaarLogo } from './BikeBazaarLogo';

interface AdminConsoleProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onResetDefaults: () => void;
  onCloseAdmin: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetDefaults,
  onCloseAdmin,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formSection, setFormSection] = useState<'Section A' | 'Section B'>('Section A');
  const [formCategory, setFormCategory] = useState(CATEGORIES_SECTION_A[0]);
  const [formPrice, setFormPrice] = useState(1500);
  const [formOldPrice, setFormOldPrice] = useState<number | undefined>(undefined);
  const [formStock, setFormStock] = useState(25);
  const [formBadge, setFormBadge] = useState('GENUINE');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCompatibleBikes, setFormCompatibleBikes] = useState('Honda CD70, CG125');

  // Filter products for the table
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'all' || p.section === sectionFilter;
    return matchesSearch && matchesSection;
  });

  const lowStockCount = products.filter(p => p.stock < 5).length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalCatalogValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  const openAddModal = () => {
    setModalMode('add');
    setEditingProduct(null);
    setFormName('');
    setFormSku('BB-' + Math.floor(100 + Math.random() * 900));
    setFormSection('Section A');
    setFormCategory(CATEGORIES_SECTION_A[0]);
    setFormPrice(1500);
    setFormOldPrice(undefined);
    setFormStock(20);
    setFormBadge('GENUINE');
    setFormImageUrl('');
    setFormDescription('Factory tested high-grade replacement component.');
    setFormCompatibleBikes('Honda CD70, CG125');
  };

  const openEditModal = (p: Product) => {
    setModalMode('edit');
    setEditingProduct(p);
    setFormName(p.name);
    setFormSku(p.sku);
    setFormSection(p.section);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOldPrice(p.oldPrice);
    setFormStock(p.stock);
    setFormBadge(p.badge || '');
    setFormImageUrl(p.imageUrl);
    setFormDescription(p.description);
    setFormCompatibleBikes(p.compatibleBikes);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSku.trim()) {
      alert('Part title and SKU are required.');
      return;
    }

    const defaultImg = formImageUrl.trim() || DEFAULT_PRODUCTS[0].imageUrl;

    if (modalMode === 'add') {
      onAddProduct({
        name: formName.trim(),
        sku: formSku.trim(),
        section: formSection,
        category: formCategory,
        price: Number(formPrice),
        oldPrice: formOldPrice ? Number(formOldPrice) : undefined,
        stock: Number(formStock),
        badge: formBadge.trim() || undefined,
        imageUrl: defaultImg,
        description: formDescription.trim(),
        compatibleBikes: formCompatibleBikes.trim(),
        rating: 4.8,
        reviewsCount: 12,
      });
    } else if (modalMode === 'edit' && editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formName.trim(),
        sku: formSku.trim(),
        section: formSection,
        category: formCategory,
        price: Number(formPrice),
        oldPrice: formOldPrice ? Number(formOldPrice) : undefined,
        stock: Number(formStock),
        badge: formBadge.trim() || undefined,
        imageUrl: defaultImg,
        description: formDescription.trim(),
        compatibleBikes: formCompatibleBikes.trim(),
      });
    }

    setModalMode(null);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen py-8 px-4 text-[#171A1D]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Top Header Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onCloseAdmin}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <BikeBazaarLogo variant="emblem" className="w-14 h-12 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider">
                  Workshop Console v3.4
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <h1 className="font-heading text-2xl uppercase tracking-tight text-[#171A1D]">
                BIKE BAZAAR Auto Inventory & Store Manager
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-heading uppercase px-3 py-2.5 rounded flex items-center gap-1.5 transition-colors border border-gray-300"
              title="Reset to 10 Default Products"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Catalog Defaults
            </button>

            <button
              onClick={openAddModal}
              className="bg-[#C8102E] hover:bg-[#A50C24] text-white text-xs font-heading uppercase tracking-wider px-4 py-2.5 rounded shadow flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              + Add New Spare Part
            </button>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Active Stock SKUs
            </span>
            <div className="font-heading text-3xl font-bold text-[#171A1D] mt-1">
              {products.length} <span className="text-xs text-gray-500 font-normal">Parts</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold mt-1">
              {totalStockUnits} units available
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
              Low Stock Alert (&lt;5)
            </span>
            <div className="font-heading text-3xl font-bold text-red-600 mt-1">
              {lowStockCount} <span className="text-xs text-gray-500 font-normal">Reorders</span>
            </div>
            <span className="text-xs text-red-600 font-semibold mt-1">
              Urgent replenishment
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Section Split
            </span>
            <div className="font-heading text-2xl font-bold text-[#171A1D] mt-1">
              {products.filter(p => p.section === 'Section A').length} / {products.filter(p => p.section === 'Section B').length}
            </div>
            <span className="text-xs text-gray-500 font-semibold mt-1">
              Sec A (Engine) / Sec B (Body)
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Total Inventory Value
            </span>
            <div className="font-heading text-2xl font-bold text-[#C8102E] mt-1">
              Rs. {totalCatalogValue.toLocaleString('en-PK')}
            </div>
            <span className="text-xs text-gray-500 font-semibold mt-1">
              At retail selling price
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1 w-full sm:w-auto relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search parts by name, SKU or category..."
              className="w-full bg-[#F3F4F6] text-xs pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="w-full bg-[#F3F4F6] text-xs px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none"
            >
              <option value="all">All Inventory Sections</option>
              <option value="Section A">Section A: Engine & Electrical</option>
              <option value="Section B">Section B: Body & Drive</option>
            </select>
          </div>
        </div>

        {/* High-Density Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171A1D] text-white uppercase text-[11px] font-heading tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-16 text-center">Thumb</th>
                  <th className="py-3 px-4">Part Title & SKU</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Section</th>
                  <th className="py-3 px-4">Bike Fitment</th>
                  <th className="py-3 px-4">Price (PKR)</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-4 text-center">
                      <img 
                        src={p.imageUrl} 
                        alt={p.name}
                        className="w-10 h-10 object-contain rounded bg-[#F3F4F6] p-1 mx-auto border border-gray-200"
                      />
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-heading text-sm text-[#171A1D] font-semibold">{p.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{p.sku}</div>
                    </td>
                    <td className="py-2.5 px-4 text-gray-600 font-medium">{p.category}</td>
                    <td className="py-2.5 px-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold">
                        {p.section}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-gray-600 max-w-xs truncate">
                      {p.compatibleBikes}
                    </td>
                    <td className="py-2.5 px-4 font-heading text-sm font-bold text-[#C8102E]">
                      Rs. {p.price.toLocaleString('en-PK')}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                        p.stock < 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {p.stock} pcs
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-[#C8102E]"
                          title="Edit Part"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"
                          title="Delete SKU"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            <span>Showing {filteredProducts.length} of {products.length} parts</span>
            <button
              onClick={onCloseAdmin}
              className="text-[#C8102E] font-heading uppercase font-bold hover:underline"
            >
              Return to Storefront →
            </button>
          </div>
        </div>

      </div>

      {/* Add / Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden my-6 border border-gray-200">
            <div className="bg-[#171A1D] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-heading text-lg uppercase tracking-wider">
                {modalMode === 'add' ? 'Add New Spare Part SKU' : 'Edit Spare Part Specification'}
              </h3>
              <button onClick={() => setModalMode(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 flex flex-col gap-3 text-xs max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Part Title *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Brake Caliper Assembly"
                  className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    placeholder="BB-ENG-101"
                    className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. JAPAN SPEC"
                    className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Section</label>
                  <select
                    value={formSection}
                    onChange={(e) => {
                      const sec = e.target.value as 'Section A' | 'Section B';
                      setFormSection(sec);
                      setFormCategory(sec === 'Section A' ? CATEGORIES_SECTION_A[0] : CATEGORIES_SECTION_B[0]);
                    }}
                    className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  >
                    <option value="Section A">Section A (Engine / Elect.)</option>
                    <option value="Section B">Section B (Body / Drive)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  >
                    {(formSection === 'Section A' ? CATEGORIES_SECTION_A : CATEGORIES_SECTION_B).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Selling Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Old Price (Sale)</label>
                  <input
                    type="number"
                    value={formOldPrice || ''}
                    onChange={(e) => setFormOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Stock (Units) *</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Compatible Bike Models *</label>
                <input
                  type="text"
                  required
                  value={formCompatibleBikes}
                  onChange={(e) => setFormCompatibleBikes(e.target.value)}
                  placeholder="e.g. Honda CD70, CG125, Yamaha YBR 125"
                  className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Image URL (Optional)</label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="Leave empty for auto-generated placeholder"
                  className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#F3F4F6] text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-heading uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#C8102E] hover:bg-[#A50C24] text-white font-heading uppercase text-xs shadow"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
