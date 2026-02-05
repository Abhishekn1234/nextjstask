"use client";

import React from "react";

export default function HealthHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden font-inter px-5 sm:px-10">
    
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute border border-gray-200 rounded-full w-[400px] h-[400px]" />
        <div className="absolute border border-gray-200 rounded-full w-[700px] h-[700px]" />
        <div className="absolute border border-gray-100 rounded-full w-[1000px] h-[1000px]" />
      </div>

   
      <FloatingIcon className="top-[25%] left-[25%] -translate-x-12" />
      <FloatingIcon className="top-[25%] right-[25%] translate-x-12" />
      <FloatingIcon className="bottom-[25%] left-[25%] -translate-x-16" />
      <FloatingIcon className="bottom-[25%] right-[25%] translate-x-16" />

      
      <div className="relative z-10 text-center max-w-xl sm:max-w-3xl px-4">
        <p className="uppercase tracking-widest text-[10px] sm:text-[12px] font-semibold text-gray-400 mb-6">
          Special Launch Offer
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 leading-snug mb-6">
          Your journey to better <br />
          health starts now
        </h1>

        <p className="text-gray-500 text-sm sm:text-lg mb-10">
          Get 50% off your first 3 months when you start your trial today!
        </p>

     
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-white border border-gray-200 rounded-full shadow hover:shadow-md transition duration-200 text-sm sm:text-base font-semibold cursor-pointer">
            <img src="/apple-logo.svg" alt="Apple" className="w-5 h-5 sm:w-6 sm:h-6" />
            Download
          </button>
          <button className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-white border border-gray-200 rounded-full shadow hover:shadow-md transition duration-200 text-sm sm:text-base font-semibold cursor-pointer">
            <img src="/playstore-logo.svg" alt="Google Play" className="w-5 h-5 sm:w-6 sm:h-6" />
            Download
          </button>
        </div>
      </div>
    </section>
  );
}

const FloatingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`absolute p-4 bg-white rounded-xl shadow border border-gray-200 ${className || ""}`}
  >
    
    <svg
      className="w-6 h-6 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  </div>
);
