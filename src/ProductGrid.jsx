import { useState } from "react";
import { Filter, Grid3X3, LayoutGrid, Heart, Share2, BarChart3, ChevronDown, X, Edit, Trash2 } from "lucide-react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const ProductGrid = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showCount, setShowCount] = useState(16);
  const [sortBy, setSortBy] = useState('Default');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initial product data - 16 products for grid display
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: 3500000,
      image: "/product1.png",
      discount: "-30%",
      isNew: false
    },
    {
      id: 2,
      name: "Leviosa", 
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: null,
      image: "/product2.png",
      discount: null,
      isNew: false
    },
    {
      id: 3,
      name: "Lolito",
      description: "Luxury big sofa", 
      price: 7000000,
      originalPrice: 14000000,
      image: "/product3.png",
      discount: "-50%",
      isNew: false
    },
    {
      id: 4,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      originalPrice: null,
      image: "/product4.jpg",
      discount: null,
      isNew: true
    },
    {
      id: 5,
      name: "Grifo",
      description: "Night lamp",
      price: 1500000,
      originalPrice: null,
      image: "/product1.png",
      discount: null,
      isNew: false
    },
    {
      id: 6,
      name: "Muggo",
      description: "Small mug",
      price: 150000,
      originalPrice: null,
      image: "/product2.png",
      discount: null,
      isNew: true
    },
    {
      id: 7,
      name: "Pingky",
      description: "Cute bed set",
      price: 7000000,
      originalPrice: 14000000,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
      discount: "-50%",
      isNew: false
    },
    {
      id: 8,
      name: "Potty",
      description: "Minimalist flower pot",
      price: 500000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
      discount: null,
      isNew: true
    },
    {
      id: 9,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: 3500000,
      image: "/product1.png",
      discount: "-30%",
      isNew: false
    },
    {
      id: 10,
      name: "Leviosa", 
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: null,
      image: "/product2.png",
      discount: null,
      isNew: false
    },
    {
      id: 11,
      name: "Lolito",
      description: "Luxury big sofa", 
      price: 7000000,
      originalPrice: 14000000,
      image: "/product2.png",
      discount: "-50%",
      isNew: false
    },
    {
      id: 12,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=400&h=300&fit=crop",
      discount: null,
      isNew: true
    },
    {
      id: 13,
      name: "Grifo",
      description: "Night lamp",
      price: 1500000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      discount: null,
      isNew: false
    },
    {
      id: 14,
      name: "Muggo",
      description: "Small mug",
      price: 150000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      discount: null,
      isNew: false
    },
    {
      id: 15,
      name: "Pingky",
      description: "Cute bed set",
      price: 7000000,
      originalPrice: 14000000,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
      discount: "-50%",
      isNew: false
    },
    {
      id: 16,
      name: "Potty",
      description: "Minimalist flower pot",
      price: 500000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
      discount: null,
      isNew: true
    }
  ]);

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString()}`;
  };

  // Static image for new products
  const defaultImage = "/product1.png";

  const AddProductPopup = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: '',
      isNew: false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : null,
        image: defaultImage,
        discount: formData.discount || null,
        isNew: formData.isNew
      };
      
      setProducts([...products, newProduct]);
      setShowAddPopup(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        discount: '',
        isNew: false
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
            <button
              onClick={() => setShowAddPopup(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (Optional)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                placeholder="Enter original price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (Optional)
              </label>
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => setFormData({...formData, discount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                placeholder="e.g., -30%"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                className="w-4 h-4 text-[#B88E2F] border-gray-300 rounded focus:ring-[#B88E2F]"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Mark as New Product
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddPopup(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17B28]"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const UpdateProductPopup = () => {
    const [formData, setFormData] = useState({
      name: selectedProduct?.name || '',
      description: selectedProduct?.description || '',
      price: selectedProduct?.price || '',
      originalPrice: selectedProduct?.originalPrice || '',
      discount: selectedProduct?.discount || '',
      isNew: selectedProduct?.isNew || false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedProduct = {
        ...selectedProduct,
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : null,
        discount: formData.discount || null,
        isNew: formData.isNew
      };
      
      setProducts(products.map(p => p.id === selectedProduct.id ? updatedProduct : p));
      setShowUpdatePopup(false);
      setSelectedProduct(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Update Product</h2>
            <button
              onClick={() => {
                setShowUpdatePopup(false);
                setSelectedProduct(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (Optional)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (Optional)
              </label>
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => setFormData({...formData, discount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                className="w-4 h-4 text-[#B88E2F] border-gray-300 rounded focus:ring-[#B88E2F]"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Mark as New Product
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowUpdatePopup(false);
                  setSelectedProduct(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17B28]"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        className="relative bg-white group h-auto w-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-64 lg:h-72 object-cover"
          />
  
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-[#E97171] flex items-center justify-center h-8 w-8 sm:h-12 sm:w-12 text-white text-xs sm:text-base font-medium rounded-full">
              {product.discount}
            </div>
          )}
  
          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-[#2EC1AC] flex items-center justify-center h-8 w-8 sm:h-12 sm:w-12 text-white text-xs sm:text-base font-medium rounded-full">
              New
            </div>
          )}

          {/* Update/Delete Icons - Show on hover */}
          {isHovered && (
            <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                  setShowUpdatePopup(true);
                }}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all"
              >
                <Edit size={16} className="text-blue-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProduct(product.id);
                }}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          )}
        </div>
  
        {/* Product Info */}
        <div className="p-3 sm:p-6 bg-[#F4F5F7]">
          <h3 className="font-semibold text-[#3A3A3A] text-lg sm:text-2xl mb-2">{product.name}</h3>
          <p className="text-[#898989] text-sm sm:text-base font-medium mb-4">
            {product.description}
          </p>
  
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="font-semibold text-[#3A3A3A] text-base sm:text-xl">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[#B0B0B0] line-through font-normal text-sm sm:text-base">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
  
        {/* FULL CARD Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center space-y-4 sm:space-y-6 transition-all duration-300">
            <button className="bg-white text-[#B88E2F] font-semibold px-6 sm:px-12 py-2 sm:py-3 text-sm sm:text-base hover:bg-gray-50 transition-colors">
              Add to cart
            </button>
  
            <div className="flex items-center space-x-3 sm:space-x-6 text-white font-medium text-sm sm:text-base">
              <button className="flex items-center space-x-1 sm:space-x-2 hover:text-amber-300 transition-colors">
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 sm:space-x-2 hover:text-amber-300 transition-colors">
                <FaArrowRightArrowLeft size={16} />
                <span>Compare</span>
              </button>
              <button className="flex items-center space-x-1 sm:space-x-2 hover:text-amber-300 transition-colors">
                <Heart size={16} />
                <span>Like</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div className="bg-white min-h-screen">
      {/* Filter Bar */}
      <div className="bg-[#F9F1E7] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Left side - Filter and View options */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              <button className="flex items-center space-x-2 text-gray-800 hover:text-black">
                <Filter size={18} sm:size={20} />
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
                Showing 1–{Math.min(showCount, products.length)} of {products.length} results
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
                  className="text-[#9F9F9F] text-sm sm:text-xl px-2 sm:px-4 py-1 sm:py-2 bg-white border border-gray-300 rounded font-normal"
                >
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                  <option value={48}>48</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-black font-normal text-sm sm:text-xl">Sort by</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 sm:px-4 py-1 sm:py-2 bg-white font-medium text-[#9F9F9F] text-sm sm:text-xl border border-gray-300 rounded"
                >
                  <option value="Default">Default</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-28 py-8 sm:py-12">
        {/* Product Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {products.slice(0, showCount).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 sm:gap-7 mt-12 sm:mt-16">
          <button className="w-10 h-10 sm:w-[60px] sm:h-[60px] bg-[#B88E2F] text-white rounded-md sm:rounded-[10px] cursor-pointer flex items-center justify-center font-normal text-sm sm:text-xl">
            1
          </button>
          <button className="w-10 h-10 sm:w-[60px] sm:h-[60px] bg-[#F9F1E7] text-black text-sm sm:text-xl rounded-md sm:rounded-[10px] cursor-pointer flex items-center justify-center font-normal">
            2
          </button>
          <button className="w-10 h-10 sm:w-[60px] sm:h-[60px] bg-[#F9F1E7] text-black text-sm sm:text-xl rounded-md sm:rounded-[10px] cursor-pointer flex items-center justify-center font-normal">
            3
          </button>
          <button className="w-12 h-10 sm:w-[60px] sm:h-[60px] bg-[#F9F1E7] text-sm sm:text-xl text-black rounded-md sm:rounded-[10px] cursor-pointer flex items-center justify-center font-normal">
            Next
          </button>
        </div>
      </div>

      {/* Add Product Popup */}
      {showAddPopup && <AddProductPopup />}

      {/* Update Product Popup */}
      {showUpdatePopup && <UpdateProductPopup />}
    </div>
  );
};

export default ProductGrid;