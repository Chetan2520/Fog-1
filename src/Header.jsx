import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navLinks = ["Home", "Shop", "About", "Contact"];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-12 sm:h-10 sm:w-[60px] flex items-center justify-center">
                <img src="/logo.png" alt="Furniro Logo" className="object-cover w-full h-full" />
              </div>
              <span className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-gray-900">Furniro</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm xl:text-base font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            {/* Desktop icons */}
            <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
              <button className="text-gray-600 hover:text-amber-600 transition-colors" aria-label="User Account">
                <User size={24} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
              </button>
              <button className="text-gray-600 hover:text-amber-600 transition-colors" aria-label="Search">
                <Search size={24} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
              </button>
              <button className="text-gray-600 hover:text-amber-600 transition-colors" aria-label="Wishlist">
                <Heart size={24} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
              </button>
              <button className="text-gray-600 hover:text-amber-600 transition-colors" aria-label="Shopping Cart">
                <IoCartOutline size={24} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-gray-600 hover:text-amber-600 transition-colors p-1"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-100 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-700 hover:text-amber-600 font-medium py-2 px-2 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link}
                </a>
              ))}
              
              {/* Mobile icons row */}
              <div className="flex items-center justify-center space-x-8 pt-4 border-t border-gray-100">
                <button className="text-gray-600 hover:text-amber-600 transition-colors p-2" aria-label="User Account">
                  <User size={20} strokeWidth={1.5} />
                </button>
                <button className="text-gray-600 hover:text-amber-600 transition-colors p-2" aria-label="Search">
                  <Search size={20} strokeWidth={1.5} />
                </button>
                <button className="text-gray-600 hover:text-amber-600 transition-colors p-2" aria-label="Wishlist">
                  <Heart size={20} strokeWidth={1.5} />
                </button>
                <button className="text-gray-600 hover:text-amber-600 transition-colors p-2" aria-label="Shopping Cart">
                  <ShoppingCart size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;