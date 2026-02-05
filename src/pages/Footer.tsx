"use client";

import React from "react";

interface FooterProps {
  scrollToSection?: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (scrollToSection) scrollToSection(id);
  };

  return (
    <footer className="bg-white border-t border-gray-200 font-inter text-gray-800 px-6 sm:px-10 lg:px-20 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid gap-10 sm:gap-8 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-12">
          
          
          <div className="max-w-xs">
            <div className="flex items-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="3" stroke="#3B82F6" strokeWidth="2" />
              </svg>
              <span className="text-2xl font-bold text-gray-900">Reppoo</span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-3">
              Innovative health assistant app leveraging AI for personalized wellness recommendations.
            </p>
            <a
              href="mailto:hello@reppoo.com"
              className="text-gray-800 text-sm sm:text-base font-medium hover:underline"
            >
              hello@reppoo.com
            </a>
          </div>

       
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {["hero", "about", "testimonials", "faq"].map((section) => (
                <li key={section}>
                  <button
                    onClick={(e) => handleNavClick(e, section)}
                    className="text-gray-500 text-sm sm:text-base hover:text-gray-900 transition-colors"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-4">App</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm sm:text-base hover:text-gray-900 transition-colors"
                >
                  Download For iOS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm sm:text-base hover:text-gray-900 transition-colors"
                >
                  Download For Android
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-4">Legal Pages</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm sm:text-base hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm sm:text-base hover:text-gray-900 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

     
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6 gap-4 sm:gap-0">
          <div className="text-gray-500 text-sm sm:text-base">© {new Date().getFullYear()} Reppoo</div>
          <div className="flex flex-wrap gap-3">
            {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
              <SocialIcon key={platform} platform={platform} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ platform }: { platform: string }) => (
  <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
  
    <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
  </div>
);
