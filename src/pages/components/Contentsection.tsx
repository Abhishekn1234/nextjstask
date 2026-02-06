"use client";

import React, { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
}

export default function ContentSection({ title, children }: ContentSectionProps) {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20 bg-white font-inter px-5 sm:px-10 lg:px-20 py-16">

     
      <div className="flex-1 text-left max-w-full lg:max-w-[45%]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-gray-900 leading-tight -tracking-[1px] mb-5">
          {title}
        </h1>

        <div className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 text-justify">
          {children}
        </div>

        <button className="px-9 py-3 sm:px-10 sm:py-4 rounded-full border border-gray-200 bg-white text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200">
          Read More
        </button>
      </div>

   
      <div className="flex-1 flex justify-center lg:justify-end w-full">
        <div className="bg-gray-100 rounded-[32px] p-8 max-w-[500px] w-full flex justify-center">
          <div className="bg-white rounded-[20px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.04)] w-full">

           
            <div className="flex justify-between mb-5 text-xs text-gray-500 font-semibold">
              <span>⏱ Time Tracker</span>
              <span>History</span>
            </div>

         
            <div className="bg-blue-50 p-5 rounded-lg flex justify-between items-center mb-5">
              <div className="text-left">
                <p className="text-xs text-gray-600 mb-1">Design System</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">10:34:00</h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer text-sm hover:bg-blue-700 transition-colors">
                ▶
              </div>
            </div>

          
            <div className="text-left text-xs text-gray-600">
              <p className="mb-2 font-semibold text-gray-800">Previous Tasks</p>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-700 text-justify">Loom UI Design System</span>
              </div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-700 text-justify">Wireframe Review</span>
              </div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="text-gray-700 text-justify">Prototype Testing</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
