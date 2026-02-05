"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      try {
        const customer = JSON.parse(storedCustomer);
        setEmail(customer.email || "");
      } catch {
        setEmail("");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("customer_token");
    setMenuOpen(false);
    router.push("/login");
  };

  return (
    <nav className="top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between relative">
     
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
          R
        </div>
        <span className="text-xl font-bold text-gray-800">Reppoo</span>
      </div>

     
      <div className="hidden sm:flex items-center gap-4">
        <span className="text-sm text-gray-500 max-w-[140px] truncate">{email || "Guest"}</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 border border-blue-200 rounded-full hover:bg-blue-200 transition"
        >
          Logout
        </button>
      </div>

      
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden text-3xl bg-transparent border-none cursor-pointer"
      >
        ☰
      </button>

      {menuOpen && (
        <div className="absolute top-24 right-4 w-56 bg-white rounded-xl p-4 shadow-xl z-50 flex flex-col gap-3 sm:hidden">
          <div className="text-sm text-gray-800 break-words">{email || "Guest"}</div>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
