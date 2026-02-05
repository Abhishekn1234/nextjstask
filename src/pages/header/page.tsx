"use client";

import React, { useState } from "react";

interface NavbarProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userName,
  userEmail,
  userAvatar = "https://via.placeholder.com/40",
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 -tracking-tight">
              Reppoo
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src={userAvatar}
                alt={userName}
                className="h-10 w-10 rounded-full border-2 border-gray-200 shadow-sm"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-800">{userName}</span>
                <span className="text-xs text-gray-500">{userEmail}</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
            >
              Logout
            </button>
          </div>

         
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar}
              alt={userName}
              className="h-10 w-10 rounded-full border-2 border-gray-200 shadow-sm"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">{userName}</span>
              <span className="text-xs text-gray-500">{userEmail}</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
