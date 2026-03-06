"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  FileText,
  User,
  Bell,
  Menu,
  LogOut,
  Utensils,        // ✅ Added
  Users,           // ✅ Added
  Building2        // ✅ Added
} from "lucide-react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [time, setTime] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString() + " | " + now.toLocaleTimeString()
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Detect mobile screen
useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => window.removeEventListener("resize", checkMobile);
}, []);

  // Close dropdown outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Home", path: "/dashboard/teacher", icon: LayoutDashboard },
    { name: "Meals Attendance", path: "/dashboard/teacher/meals-attendance", icon: ClipboardList },
    { name: "Today Meals", path: "/dashboard/teacher/today-meals", icon: Utensils },
    { name: "Student Overview", path: "/dashboard/teacher/student-overview", icon: Users },
    { name: "Contractor Details", path: "/dashboard/teacher/contractor-details", icon: Building2 },
    { name: "Raise Issue", path: "/dashboard/teacher/raise-issue", icon: AlertTriangle },
    { name: "Records", path: "/dashboard/teacher/records", icon: FileText },
    { name: "My Profile", path: "/dashboard/teacher/profile", icon: User },

    
    
    
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <div className="bg-blue-900 text-white shadow-xl px-6 py-3 flex justify-between items-center sticky top-0 z-50">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="hover:rotate-90 transition duration-300"
>
            <Menu size={26} />
          </button>

          <div className="flex items-center gap-3">
            <Image
              src="/sgsms-logo.png"
              alt="SGSMS Logo"
              width={40}
              height={40}
            />

            <div>
             <div className="font-bold text-sm md:text-lg">
                Smart Government School Management System
              </div>
              <div className="text-xs text-blue-200">
                (SGSMS)
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 relative">
          <div className="text-sm hidden md:block">
            {time}
          </div>

          <Bell />

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-medium"
            >
              K S VAASANTH REDDY ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded border text-sm">
                <Link
                  href="/dashboard/teacher/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1">

       {/* SIDEBAR */}
<div
  className={`fixed md:relative z-40 bg-white border-r shadow-lg h-full
  transform transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0 w-64`}
>

  <nav className="p-4 space-y-3">

    {menuItems.map((item) => {
      const Icon = item.icon;
      const active = pathname === item.path;

      return (
        <Link
          key={item.path}
          href={item.path}
          onClick={() => {
            if (window.innerWidth < 768) {
              setSidebarOpen(false);
            }
          }}
          className={`flex items-center gap-3 p-3 rounded transition ${
            active
              ? "bg-blue-700 text-white"
              : "text-gray-700 hover:bg-blue-200 hover:text-blue-900"
          }`}
        >
          <Icon size={22} />
          <span>{item.name}</span>
        </Link>
      );
    })}

  </nav>
</div>
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/40 md:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

        {/* CONTENT */}
        <div className="flex-1 p-4 md:p-6 max-w-[1400px] mx-auto w-full bg-white text-black dark:bg-gray-900 dark:text-white">
          {children}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white border-t text-center py-3 text-sm text-gray-500">
        © 2026 Smart Government School Management System (SGSMS) | Government of India
      </div>
    </div>
  );
}