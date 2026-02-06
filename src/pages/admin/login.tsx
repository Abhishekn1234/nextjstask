"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(res);
      const data = await res.json();
    console.log(data);
      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
        toast.success("Admin login successful ✅");
        router.push("/admin");
      } else if (res.status === 401) {
        toast.error("Unauthorized! Check your credentials ❌");
      } else {
        toast.error(data.message || "Login failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-white px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        />

        <button
          onClick={login}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-full transition"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
