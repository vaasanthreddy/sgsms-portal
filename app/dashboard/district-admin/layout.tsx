"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  School,
  ClipboardList,
  IndianRupee,
  FileText,
  BarChart3,
  AlertTriangle,
  User,
  Key,
  LogOut,
  Bell,
  Menu,
} from "lucide-react";

export default function DistrictAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [time, setTime] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // ✅ UPDATED SIDEBAR ELEMENTS ONLY
  const menuItems = [
    { name: "Dashboard", path: "/dashboard/district-admin", icon: LayoutDashboard },
    { name: "School Management", path: "/dashboard/district-admin/school-management", icon: School },
    { name: "User Management", path: "/dashboard/district-admin/user-management", icon: User },
    { name: "Attendance Monitoring", path: "/dashboard/district-admin/attendance-monitoring", icon: ClipboardList },
    { name: "Meal Monitoring", path: "/dashboard/district-admin/meal-monitoring", icon: ClipboardList },
    { name: "Fund Management", path: "/dashboard/district-admin/fund-management", icon: IndianRupee },
    { name: "Alerts & Compliance", path: "/dashboard/district-admin/alerts-compliance", icon: AlertTriangle },
    { name: "Reports & Analytics", path: "/dashboard/district-admin/reports-analytics", icon: BarChart3 },
    { name: "Administration", path: "/dashboard/district-admin/administration", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER (EXACT SAME AS SCHOOL HEAD) */}
      <div className="sticky top-0 z-50 bg-blue-900 text-white shadow-xl px-6 py-3 flex justify-between items-center">

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
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
              className="rounded shadow"
            />

            <div>
              <div className="font-bold text-lg">
                Smart Government School Management System
              </div>
              <div className="text-xs text-blue-200">
                (SGSMS)
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 relative">
          <div className="text-sm hidden md:block">
            {time}
          </div>

          <div className="relative cursor-pointer">
            <Bell />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </div>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-medium hover:underline"
            >
              DISTRICT ADMIN ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-xl rounded border text-sm">
                <Link href="/dashboard/district-admin/profile" className="block px-4 py-2 hover:bg-gray-100">
                  My Profile
                </Link>
                <Link href="/dashboard/district-admin/password" className="block px-4 py-2 hover:bg-gray-100">
                  Change Password
                </Link>
                <Link href="/login" className="block px-4 py-2 text-red-600 hover:bg-gray-100">
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR (EXACT SAME STYLE) */}
        <div
          className={`bg-white border-r shadow-lg transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <nav className="p-4 space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group relative flex items-center gap-3 p-2 rounded transition-all duration-200 ${
                    active
                      ? "bg-blue-700 text-white border-l-4 border-blue-900"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                  }`}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.name}</span>}

                  {collapsed && (
                    <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/login"
              className="group relative flex items-center gap-3 p-2 rounded text-red-600 hover:bg-red-100"
            >
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </Link>
          </nav>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 transition-all duration-300">
          {children}
        </div>
      </div>

      {/* FOOTER (EXACT SAME) */}
      <div className="bg-white border-t text-center py-3 text-sm text-gray-500 shadow-inner">
        © 2026 Smart Government School Management System (SGSMS) | Government of India
      </div>
    </div>
  );
}