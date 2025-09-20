import React from "react";
import { PiGreaterThanBold } from "react-icons/pi";
export default function Hero() {
  return (
    <section
      className="relative w-full h-79 flex items-center justify-center bg-center bg-cover"
      style={{
       backgroundImage: "url('/hero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-5xl font-medium text-black mb-3">Shop</h1>
        <div className="text-sm text-black mt-1 flex items-center justify-center">
          <span className="font-medium text-base">Home</span>
           <span className="mx-1"><PiGreaterThanBold  /> </span>
           <span className="font-light text-base">Shop</span>
        </div>
      </div>
    </section>
  );
}