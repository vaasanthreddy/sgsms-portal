"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    // Role based redirect
    if (data.role === "district_admin") {
      router.push("/dashboard/district-admin");
    } else if (data.role === "school_head") {
      router.push("/dashboard/school-head");
    } else if (data.role === "teacher") {
      router.push("/dashboard/teacher");
    } else if (data.role === "parent") {
      router.push("/dashboard/parent");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/high-school-hd-8k-vector-illustration-wallpaper_915071-46578.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute top-0 left-0 w-full bg-blue-900 text-white text-center py-3 text-sm">
        Ministry of Education | Government of India | SGSMS Portal
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-10 text-white">

          <div className="flex justify-center mb-6">
            <img
              src="/sgsms-logo.png"
              alt="SGSMS Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">
            Smart Government School
            <br />
            Management System
          </h2>

          {/* Email */}
          <div className="relative mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-2 bg-transparent border-b border-white focus:outline-none"
            />
            <label className="absolute left-0 top-2 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-300 peer-valid:-top-4 peer-valid:text-xs">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative mb-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full p-2 bg-transparent border-b border-white focus:outline-none"
            />
            <label className="absolute left-0 top-2 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-300 peer-valid:-top-4 peer-valid:text-xs">
              Password
            </label>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-2 rounded-lg font-semibold"
          >
            LOGIN
          </button>

          <p className="text-xs text-center mt-6 text-white/70">
            © 2026 SGSMS | Government of India
          </p>
        </div>
      </div>
    </div>
  );
}