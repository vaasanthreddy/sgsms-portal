"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("Teacher");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // Role Based Routing
    if (role === "Teacher") {
      router.push("/dashboard/teacher");
    } else if (role === "School head") {
      router.push("/dashboard/school-head");
    } else if (role === "District Admin") {
      router.push("/dashboard/district-admin");
    } else if (role === "Parent") {
      router.push("/dashboard/parent");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/high-school-hd-8k-vector-illustration-wallpaper_915071-46578.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Government Top Strip */}
      <div className="absolute top-0 left-0 w-full bg-blue-900 text-white text-center py-3 text-sm">
        Ministry of Education | Government of India | SGSMS Portal
      </div>

      {/* Login Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        <div className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-10 text-white">

          {/* Logo */}
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

          {/* Role */}
          <div className="mb-4">
            <label className="text-sm">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-white/20 border border-white/40 text-white"
            >
              <option className="text-black">Teacher</option>
              <option className="text-black">School head</option>
              <option className="text-black">District Admin</option>
              <option className="text-black">Parent</option>
            </select>
          </div>

          {/* Username */}
          <div className="relative mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="peer w-full p-2 bg-transparent border-b border-white focus:outline-none"
            />
            <label className="absolute left-0 top-2 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-300 peer-valid:-top-4 peer-valid:text-xs">
              Username
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

          {/* Button */}
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
