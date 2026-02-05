"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    const res = await fetch("/api/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("customer_token", data.token);
      localStorage.setItem("customer", JSON.stringify(data.user));
      router.push("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-white px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Customer Login</h2>

        <input
          type="email"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={login}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}
