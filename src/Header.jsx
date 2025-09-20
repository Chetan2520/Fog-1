import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { IoCartOutline } from "react-icons/io5";
const Header = () => {
  // Just one state for mobile menu - keeping it simple
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navLinks = ["Home", "Shop", "About", "Contact"];

  return (
    <header className="bg-whte border-b h-[100px] py-4   border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              {/* Triangle logo */}
              <div className="relative h-10 w-[60px] flex items-center justify-center ">
              <img src="/logo.png" className="object-cover"></img>
              </div>
              <span className="text-[34px] font-bold text-gray-900">Furniro</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className=" text-base font-medium transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {/* Desktop icons */}
            <div className="hidden sm:flex items-center space-x-6">
              <button className=" hover:text-amber-600 transition-colors">
                <User size={28} strokeWidth={1.5} />
              </button>
              <button className=" hover:text-amber-600 transition-colors">
                <Search size={28} strokeWidth={1.5} />
              </button>
              <button className=" hover:text-amber-600 transition-colors">
                <Heart size={28} strokeWidth={1.5} />
              </button>
              <button className=" hover:text-amber-600 transition-colors">
                <IoCartOutline size={28} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden  hover:text-amber-600"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu - simple toggle without fancy animations */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-700 hover:text-amber-600 font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link}
                </a>
              ))}
              
              {/* Mobile icons row */}
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                <button className="text-gray-700 hover:text-amber-600">
                  <User size={22} strokeWidth={1.5} />
                </button>
                <button className="text-gray-700 hover:text-amber-600">
                  <Search size={22} strokeWidth={1.5} />
                </button>
                <button className="text-gray-700 hover:text-amber-600">
                  <Heart size={22} strokeWidth={1.5} />
                </button>
                <button className="text-gray-700 hover:text-amber-600">
                  <ShoppingCart size={22} strokeWidth={1.5} />
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