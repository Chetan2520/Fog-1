import React from "react";
import { PiGreaterThanBold } from "react-icons/pi";
export default function Hero() {
  return (
    <section
      className="relative w-full min-h-[220px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] flex items-center justify-center bg-center bg-cover"
      style={{
       backgroundImage: "url('/hero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-black mb-2 sm:mb-3">Shop</h1>
        <div className="text-xs sm:text-sm text-black mt-1 flex items-center justify-center">
          <span className="font-medium text-sm sm:text-base">Home</span>
           <span className="mx-1 sm:mx-2"><PiGreaterThanBold  /> </span>
           <span className="font-light text-sm sm:text-base">Shop</span>
        </div>
      </div>
    </section>
  );
}