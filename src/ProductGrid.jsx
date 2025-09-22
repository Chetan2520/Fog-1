import { useState, useEffect } from "react";
import { Filter, Grid3X3, LayoutGrid, BarChart3, ChevronDown } from "lucide-react";
import AddProductPopup from "./components/AddProductPopup";
import UpdateProductPopup from "./components/UpdateProductPopup";
import ProductCard from "./components/ProductCard";

const ProductGrid = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showCount, setShowCount] = useState(16);
  const [sortBy, setSortBy] = useState('Default');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Product data from backend
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minNewPrice: '',
    maxNewPrice: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Load products from backend
  const loadProducts = async (page = currentPage) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: showCount.toString()
      });

      // Add sorting parameters
      if (sortBy !== 'Default') {
        params.append('sortBy', sortBy.toLowerCase());
        params.append('sortOrder', sortOrder);
      }

      // Add filter parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await fetch(`https://fog-backend-k9mm.onrender.com/api/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setCurrentPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
      setBrands(data.brands || []);
      setCategories(data.categories || []);
      
      console.log('Products loaded:', data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount and when dependencies change
  useEffect(() => {
    loadProducts(1); // Reset to page 1 when filters/sort change
  }, [showCount, sortBy, sortOrder, filters]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  // Handle sort changes
  const handleSortChange = (newSortBy) => {
    if (newSortBy === 'Default') {
      setSortBy('Default');
      setSortOrder('asc');
    } else if (newSortBy === 'price-desc') {
      setSortBy('price');
      setSortOrder('desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadProducts(page);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      brand: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minNewPrice: '',
      maxNewPrice: ''
    });
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString()}`;
  };

  // Static image for new products
  const defaultImage = "/product1.png";



  const handleDeleteProduct = async (productId) => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this product? This action cannot be undone.');
    
    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      console.log('Attempting to delete product with ID:', productId);
      
      const response = await fetch(`https://fog-backend-k9mm.onrender.com/api/products/${productId}`, {
        method: 'DELETE',
      });
      
      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Delete error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }
      
      const result = await response.json();
      console.log('Delete successful:', result);
      
      // Remove product from frontend state
      setProducts(products.filter(p => p._id !== productId && p.id !== productId));
      
      // Reload products to ensure consistency
      await loadProducts();
      
      console.log('Product deleted successfully');
    } catch (error) {
      setError('Failed to delete product');
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="bg-white min-h-screen">
      {/* Filter Bar */}
      <div className="bg-[#F9F1E7] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Left side - Filter and View options */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-800 hover:text-black"
              >
                <Filter size={20} />
                <span className="font-medium text-sm sm:text-base">Filter</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1 ${viewMode === 'grid' ? 'text-black' : 'text-gray-600'}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1 ${viewMode === 'list' ? 'text-black' : 'text-gray-600'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <span className="h-6 sm:h-8 ml-3 sm:ml-5 w-[2px] bg-gray-500"></span>
              </div>
              
              <div className="hidden md:block text-gray-800 text-sm sm:text-base font-medium">
                Showing {products.length} of {total} results
              </div>
            </div>

            {/* Center - Add Product */}
            <div className="flex justify-center lg:block">
              <button 
                onClick={() => setShowAddPopup(true)}
                className="text-[#B88E2F] text-sm sm:text-base h-10 sm:h-12 px-6 sm:w-52 bg-white hover:text-amber-700 font-semibold rounded border border-[#B88E2F] transition-colors"
              >
                Add Product
              </button>
            </div>

            {/* Right side - Show count and Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="flex items-center space-x-3">
                <span className="text-black font-normal text-sm sm:text-xl">Show</span>
                <select 
                  value={showCount}
                  onChange={(e) => setShowCount(Number(e.target.value))}
                  className="text-[#9F9F9F] appearance-none text-sm sm:text-xl px-2 sm:px-4 py-1 sm:py-2 bg-white border border-gray-300 rounded font-normal"
                >
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                  <option value={48}>48</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-black font-normal text-sm  sm:text-xl">Sort by</span>
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-2 sm:px-4 py-1 sm:py-2 appearance-none bg-white  text-[#9F9F9F] text-sm sm:text-xl border border-gray-300 rounded"
                >
                  <option value="Default">Default</option>
                  <option value="brand">Brand Name</option>
                  <option value="price">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  value={filters.minNewPrice}
                  onChange={(e) => handleFilterChange('minNewPrice', e.target.value)}
                  placeholder="Min price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  value={filters.maxNewPrice}
                  onChange={(e) => handleFilterChange('maxNewPrice', e.target.value)}
                  placeholder="Max price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-[#B88E2F] hover:text-amber-700 font-medium border border-[#B88E2F] rounded-md hover:bg-[#F9F1E7] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-28 py-8 sm:py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        )}

        {/* Product Grid - Responsive */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            {products.slice(0, showCount).map(product => (
              <ProductCard 
                key={product._id || product.id} 
                product={product}
                setSelectedProduct={setSelectedProduct}
                setShowUpdatePopup={setShowUpdatePopup}
                handleDeleteProduct={handleDeleteProduct}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 sm:gap-7 mt-12 sm:mt-16">
          {/* Previous Button */}
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-12 h-10 sm:w-[60px] sm:h-[60px] bg-[#F9F1E7] text-sm sm:text-xl text-black rounded-md sm:rounded-[10px] cursor-pointer flex items-center justify-center font-normal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 sm:w-[60px] sm:h-[60px] rounded-md sm:rounded-[10px] cursor-pointer flex items-center justify-center font-normal text-sm sm:text-xl ${
                  currentPage === pageNum
                    ? 'bg-[#B88E2F] text-white'
                    : 'bg-[#F9F1E7] text-black hover:bg-[#E6D7C3]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-12 h-10 sm:w-[60px] sm:h-[60px] bg-[#F9F1E7] text-sm sm:text-xl text-black rounded-md sm:rounded-[10px] cursor-pointer flex items-center justify-center font-normal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Product Popup */}
      {showAddPopup && (
        <AddProductPopup 
          setShowAddPopup={setShowAddPopup}
          setLoading={setLoading}
          setError={setError}
          loadProducts={loadProducts}
          defaultImage={defaultImage}
        />
      )}

      {/* Update Product Popup */}
      {showUpdatePopup && (
        <UpdateProductPopup 
          selectedProduct={selectedProduct}
          setShowUpdatePopup={setShowUpdatePopup}
          setSelectedProduct={setSelectedProduct}
          setProducts={setProducts}
          products={products}
        />
      )}
    </div>
  );
};

export default ProductGrid;