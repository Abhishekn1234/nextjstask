"use client";

import { useEffect, useState } from "react";

export default function AdminNavbar() {
  const [adminEmail, setAdminEmail] = useState<string>("");

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);
        setAdminEmail(parsed.email || "");
      } catch {
        setAdminEmail("");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  return (
    <nav className="top-0 z-50 bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center h-24">
      <strong className="text-lg font-semibold">🛠 Admin Panel</strong>

      <div className="flex items-center gap-4">
        {adminEmail && (
          <span className="text-sm text-gray-600 truncate max-w-xs">
            {adminEmail}
          </span>
        )}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
