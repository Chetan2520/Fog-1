import { useState } from "react";
import { Heart, Share2, Edit, Trash2 } from "lucide-react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const ProductCard = ({ 
  product, 
  setSelectedProduct, 
  setShowUpdatePopup, 
  handleDeleteProduct, 
  formatPrice 
}) => {
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
            -{product.discount}%
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-[#2EC1AC] flex items-center justify-center h-8 w-8 sm:h-12 sm:w-12 text-white text-xs sm:text-base font-medium rounded-full">
            New
          </div>
        )}

        {/* Update/Delete Icons - Show on hover (desktop) */}
        {isHovered && (
          <div className="absolute top-3 z-1 left-3 sm:top-6 sm:left-6 flex space-x-2">
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
                handleDeleteProduct(product._id || product.id);
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
            {formatPrice(product.newPrice || product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[#B0B0B0] line-through font-normal text-sm sm:text-base">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Mobile actions visible (since hover is not available) */}
        <div className="mt-4 flex sm:hidden items-center justify-between">
          <button className="bg-white text-[#B88E2F] font-semibold px-4 py-2 text-sm rounded-md border border-[#B88E2F] hover:bg-gray-50 transition-colors">
            Add to cart
          </button>
          <div className="flex items-center space-x-4 text-gray-700">
            <button className="hover:text-amber-600 transition-colors">
              <Share2 size={16} />
            </button>
            <button className="hover:text-amber-600 transition-colors">
              <FaArrowRightArrowLeft size={16} />
            </button>
            <button className="hover:text-amber-600 transition-colors">
              <Heart size={16} />
            </button>
          </div>
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

export default ProductCard;
