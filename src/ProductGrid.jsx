import { useState } from "react";
import { Filter, Grid3X3, LayoutGrid, Heart, Share2, BarChart3, ChevronDown } from "lucide-react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
const ProductGrid = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showCount, setShowCount] = useState(16);
  const [sortBy, setSortBy] = useState('Default');

  // Product data - 16 products for grid display
  const products = [
    {
      id: 1,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: 3500000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      discount: "-30%",
      isNew: false
    },
    {
      id: 2,
      name: "Leviosa", 
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop",
      discount: null,
      isNew: false
    },
    {
      id: 3,
      name: "Lolito",
      description: "Luxury big sofa", 
      price: 7000000,
      originalPrice: 14000000,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      discount: "-50%",
      isNew: false
    },
    {
      id: 4,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=400&h=300&fit=crop",
      discount: null,
      isNew: true
    },
    {
      id: 5,
      name: "Grifo",
      description: "Night lamp",
      price: 1500000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      discount: null,
      isNew: false
    },
    {
      id: 6,
      name: "Muggo",
      description: "Small mug",
      price: 150000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      discount: "-30%",
      isNew: false
    },
    {
      id: 10,
      name: "Leviosa", 
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop",
      discount: null,
      isNew: false
    },
    {
      id: 11,
      name: "Lolito",
      description: "Luxury big sofa", 
      price: 7000000,
      originalPrice: 14000000,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
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
  ,
    // Duplicate products for grid demonstration
    // {
    //   id: 5,
    //   name: "Syltherine",
    //   description: "Stylish cafe chair",
    //   price: 2500000,
    //   originalPrice: 3500000,
    //   image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    //   discount: "-30%",
    //   isNew: false
    // },
    // {
    //   id: 6,
    //   name: "Leviosa", 
    //   description: "Stylish cafe chair",
    //   price: 2500000,
    //   originalPrice: null,
    //   image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400",
    //   discount: null,
    //   isNew: false
    // },
    // {
    //   id: 7,
    //   name: "Lolito",
    //   description: "Luxury big sofa", 
    //   price: 7000000,
    //   originalPrice: 14000000,
    //   image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    //   discount: "-50%",
    //   isNew: false
    // },
    // {
    //   id: 8,
    //   name: "Respira",
    //   description: "Outdoor bar table and stool",
    //   price: 500000,
    //   originalPrice: null,
    //   image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    //   discount: null,
    //   isNew: true
    // },
    // // More products for pagination
    // {
    //   id: 9,
    //   name: "Syltherine",
    //   description: "Stylish cafe chair",
    //   price: 2500000,
    //   originalPrice: 3500000,
    //   image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    //   discount: "-30%",
    //   isNew: false
    // },
    // {
    //   id: 10,
    //   name: "Leviosa", 
    //   description: "Stylish cafe chair",
    //   price: 2500000,
    //   originalPrice: null,
    //   image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400",
    //   discount: null,
    //   isNew: false
    // },
    // {
    //   id: 11,
    //   name: "Lolito",
    //   description: "Luxury big sofa", 
    //   price: 7000000,
    //   originalPrice: 14000000,
    //   image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    //   discount: "-50%",
    //   isNew: false
    // },
    // {
    //   id: 12,
    //   name: "Respira",
    //   description: "Outdoor bar table and stool",
    //   price: 500000,
    //   originalPrice: null,
    //   image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    //   discount: null,
    //   isNew: true
    // },
    // {
    //   id: 13,
    //   name: "Syltherine",
    //   description: "Stylish cafe chair",
    //   price: 2500000,
    //   originalPrice: 3500000,
    //   image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    //   discount: "-30%",
    //   isNew: false
    // },
    // {
    //   id: 14,
    //   name: "Leviosa", 
    //   description: "Stylish cafe chair",
    //   price: 2500000,
    //   originalPrice: null,
    //   image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400",
    //   discount: null,
    //   isNew: false
    // },
    // {
    //   id: 15,
    //   name: "Lolito",
    //   description: "Luxury big sofa", 
    //   price: 7000000,
    //   originalPrice: 14000000,
    //   image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    //   discount: "-50%",
    //   isNew: false
    // },
    // {
    //   id: 16,
    //   name: "Respira",
    //   description: "Outdoor bar table and stool",
    //   price: 500000,
    //   originalPrice: null,
    //   image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    //   discount: null,
    //   isNew: true
    // }
  ];

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString()}`;
  };

  const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        className="relative bg-white group h-[446px] w-[285px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover"
          />
  
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-6 right-6 bg-[#E97171] flex items-center justify-center h-12 w-12 text-white text-base font-medium px-3 py-2 rounded-full">
              {product.discount}
            </div>
          )}
  
          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-6 right-6 bg-[#2EC1AC] flex items-center justify-center h-12 w-12 text-white text-base font-medium px-3 py-2 rounded-full">
              New
            </div>
          )}
        </div>
  
        {/* Product Info */}
        <div className="p-6 bg-[#F4F5F7]">
          <h3 className="font-semibold text-[#3A3A3A] text-2xl mb-2">{product.name}</h3>
          <p className="text-[#898989] text-base font-medium mb-4">
            {product.description}
          </p>
  
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-[#3A3A3A] text-xl">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[#B0B0B0] line-through font-normal text-base">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
  
        {/* FULL CARD Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center space-y-6 transition-all duration-300">
            <button className="bg-white text-[#B88E2F] font-semibold px-12 py-3 text-base hover:bg-gray-50 transition-colors">
              Add to cart
            </button>
  
            <div className="flex items-center space-x-6 text-white font-medium">
              <button className="flex items-center space-x-2 hover:text-amber-300 transition-colors">
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-amber-300 transition-colors">
                <FaArrowRightArrowLeft  size={16} />
                <span>Compare</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-amber-300 transition-colors">
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
      <div className="bg-[#F9F1E7] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            
            {/* Left side - Filter and View options */}
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-2 text-gray-800 hover:text-black">
                <Filter size={20} />
                <span className="font-medium">Filter</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1 ${viewMode === 'grid' ? 'text-black' : 'text-gray-600'}`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1 ${viewMode === 'list' ? 'text-black' : 'text-gray-600'}`}
                >
                  <LayoutGrid size={20} />
                </button>
                <span className="h-8 ml-5 w-[2px] bg-gray-500"></span>
              </div>
              
              <div className="hidden sm:block text-gray-800 text-base  border-l-green-500 font-medium">
                Showing 1–16 of 32 results
              </div>
            </div>

            {/* Center - Add Product */}
            <div className="hidden sm:block">
              <button className="text-[#B88E2F] text-base h-12 w-52 bg-white hover:text-amber-700 font-semibold">
                Add Product
              </button>
            </div>

            {/* Right side - Show count and Sort */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center  space-x-3">
                <span className="text-black font-normal text-xl">Show</span>
                <select 
                  value={showCount}
                  
                  onChange={(e) => setShowCount(Number(e.target.value))}
                  className=" text-[#9F9F9F] text-xl  px-4 py-2 bg-white appearance-none font-normal"
                >
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                  <option value={48}>48</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-black font-normal text-xl">Sort by</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className=" px-4 py-2 bg-white font-medium text-[#9F9F9F] text-xl  appearance-none"
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
      <div className="max-w-screen-2xl  mx-auto px-4 sm:px-6 lg:px-28 py-12">
        {/* Product Grid - Show 16 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-7 space-x-2 mt-16">
          <button className="w-[60px] h-[60px] bg-[#B88E2F] text-white rounded-[10px] cursor-pointer flex items-center justify-center font-normal text-xl ">
            1
          </button>
          <button className="w-[60px] h-[60px] bg-[#F9F1E7] text-black  text-xl rounded-[10px] cursor-pointer flex items-center justify-center font-normal ">
            2
          </button>
          <button className="w-[60px] h-[60px] bg-[#F9F1E7] text-black  text-xl rounded-[10px] cursor-pointer flex items-center justify-center font-normal ">
            3
          </button>
          <button className="px-15  w-[60px] h-[60px] bg-[#F9F1E7] text-xl text-black rounded-[10px] cursor-pointer flex items-center justify-center font-normal ">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;