"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LandingContent } from "../types/content";

export default function Testimonials({
  testimonials,
}: {
  testimonials: LandingContent["testimonials"];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="bg-[#F8F9FA] w-full py-16 px-4 sm:px-6 lg:px-8 text-center">
     
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#1A1C1E] mb-4">
          Our Users Feel the <br className="hidden sm:block" /> Transformation
        </h2>
        <p className="text-gray-400 text-lg max-w-lg mx-auto leading-tight">
          Real Stories from People Empowered by Personalized Wellness
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto flex items-center justify-center gap-4">
      
        <button 
          onClick={prevSlide}
          className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

      
        <div className="w-full max-w-3xl bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-50">
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-10 italic">
            "{current.text}"
          </p>

          <div className="flex flex-col items-center">
           
            <div className="w-16 h-16 bg-[#D4A383] rounded-full mb-4" />
            <div>
              <h4 className="text-[#1A1C1E] font-bold text-lg">
                {current.name}, <span className="font-normal text-gray-500">{current.role}</span>
              </h4>
              <p className="text-gray-300 text-sm mt-1 uppercase tracking-wider">
                Empowered by AI Wellness Journeys
              </p>
            </div>
          </div>
        </div>

    
        <button 
          onClick={nextSlide}
          className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#3B82F6] text-white shadow-lg hover:bg-blue-600 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    
      <div className="flex justify-center gap-4 mt-12 overflow-x-auto pb-4">
        {testimonials.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`flex items-center gap-3 p-4 rounded-2xl transition-all min-w-[200px] text-left ${
              activeIndex === i ? "bg-white shadow-md border-transparent" : "bg-transparent opacity-50"
            }`}
          >
            <div className={`w-10 h-10 rounded-full ${i % 2 === 0 ? 'bg-[#D4A383]' : 'bg-[#E3C6B4]'}`} />
            <div>
              <div className="font-bold text-gray-900 text-sm">{t.name}</div>
              <div className="text-xs text-gray-500">5 Star Rated</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
