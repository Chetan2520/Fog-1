import { useState } from "react";
import { X, Package, Tag, DollarSign, Percent, Sparkles } from "lucide-react";

const AddProductPopup = ({ 
  setShowAddPopup, 
  setLoading, 
  setError, 
  loadProducts, 
  defaultImage 
}) => {
  const [loading, setLocalLoading] = useState(false);
  const [error, setLocalError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    oldPrice: '',
    newPrice: '',
    discount: '',
    isNew: true,
    brand: '',
    category: ''
  });

  const handleSubmit = async () => {
    try {
      setLocalLoading(true);
      setLocalError(null);
      setLoading(true);
      const productData = {
        name: formData.name,
        brand: formData.brand || 'Unknown',
        category: formData.category || 'General',
        description: formData.description,
        oldPrice: formData.oldPrice ? parseInt(formData.oldPrice) : null,
        newPrice: parseInt(formData.newPrice),
        price: parseInt(formData.newPrice),
        image: defaultImage,
        discount: formData.discount ? parseInt(formData.discount) : 0,
        isNew: formData.isNew
      };
      
      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      await loadProducts();
      
      setShowAddPopup(false);
      setFormData({
        name: '',
        description: '',
        oldPrice: '',
        newPrice: '',
        discount: '',
        isNew: true,
        brand: '',
        category: ''
      });
    } catch (error) {
      setLocalError('Failed to add product');
      setError('Failed to add product');
      console.error('Error adding product:', error);
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#B88E2F]/10 rounded-xl">
              <Package size={24} className="text-[#B88E2F]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Add Product</h2>
          </div>
          <button
            onClick={() => setShowAddPopup(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        {/* Form */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B88E2F]/20 focus:border-[#B88E2F] transition-colors"
              placeholder="Enter product name"
            />
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Brand <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B88E2F]/20 focus:border-[#B88E2F] transition-colors"
                placeholder="Brand"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B88E2F]/20 focus:border-[#B88E2F] transition-colors"
                placeholder="Category"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B88E2F]/20 focus:border-[#B88E2F] transition-colors resize-none"
              placeholder="Product description"
              rows={3}
            />
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center">
              <DollarSign size={16} className="mr-2 text-[#B88E2F]" />
              Pricing
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Old Price
                </label>
                <input
                  type="number"
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({...formData, oldPrice: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B88E2F]/20 focus:border-[#B88E2F] transition-colors"
                  placeholder="₹ 0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Current Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.newPrice}
                  onChange={(e) => setFormData({...formData, newPrice: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B88E2F]/20 focus:border-[#B88E2F] transition-colors"
                  placeholder="₹ 0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Discount
              </label>
              <input
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({...formData, discount: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B88E2F]/20 focus:border-[#B88E2F] transition-colors"
                placeholder="Enter discount amount"
                min="0"
              />
            </div>
          </div>

          {/* New Product Toggle */}
          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="flex items-center">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="ml-4">
                <label className="text-sm font-semibold text-gray-900">
                  Mark as New Product
                </label>
                <p className="text-xs text-gray-600 mt-0.5">
                  Show "New" badge on product card
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                className="sr-only"
              />
              <div
                onClick={() => setFormData({...formData, isNew: !formData.isNew})}
                className={`relative w-14 h-7 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                  formData.isNew 
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-emerald-200' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 transform flex items-center justify-center ${
                    formData.isNew ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                >
                  {formData.isNew && (
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                {formData.isNew && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-30 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {(error || setLocalError) && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl">
              <div className="flex items-center">
                <div className="text-red-800 text-sm font-medium">
                  {error || setLocalError}
                </div>
              </div>
            </div>
          )}
          
        </div>

        {/* Footer Buttons */}
        <div className="flex space-x-4 p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            type="button"
            onClick={() => setShowAddPopup(false)}
            disabled={loading}
            className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:border-gray-300 hover:shadow-md disabled:opacity-50 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#B88E2F] to-[#C9952F] text-white rounded-xl hover:from-[#A17B28] hover:to-[#B8842A] hover:shadow-lg hover:shadow-[#B88E2F]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center group"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-b-transparent mr-2"></div>
                <span>Adding Product...</span>
              </>
            ) : (
              <>
                <Package size={18} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                <span>Add Product</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPopup;