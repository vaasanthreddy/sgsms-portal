"use client";

import { Plus, Search } from "lucide-react";

export default function SchoolManagementPage() {
  return (
    <div className="bg-white border shadow-sm px-8 py-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-gray-300 pb-4 mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            School Management
          </h2>
          <p className="text-sm text-gray-700 font-medium mt-1 tracking-wide">
            Total Schools: 124 | Active: 118 | Under Inspection: 4 | Suspended: 2
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2 text-sm font-semibold shadow-sm hover:bg-blue-800 transition">
          <Plus size={16} />
          Add New School
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-4 mb-4 text-sm">

        <select className="border px-3 py-2 bg-white">
          <option>All Mandals</option>
          <option>Central</option>
          <option>East</option>
          <option>West</option>
        </select>

        <select className="border px-3 py-2 bg-white">
          <option>All Status</option>
          <option>Active</option>
          <option>Under Inspection</option>
          <option>Suspended</option>
        </select>

        <div className="flex items-center border px-2 bg-white">
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search School Name / Code"
            className="px-2 py-2 outline-none text-sm"
          />
        </div>

      </div>

      {/* TABLE */}
      <div className="border border-gray-400 bg-white">

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm font-semibold tracking-wide">
              <th className="border px-3 py-1.5 text-left">Code</th>
              <th className="border px-3 py-1.5 text-left">School Name</th>
              <th className="border px-3 py-1.5 text-left">Mandal</th>
              <th className="border px-3 py-1.5 text-left">Students</th>
              <th className="border px-3 py-1.5 text-left">Headmaster</th>
              <th className="border px-3 py-1.5 text-center">Status</th>
              <th className="border px-3 py-1.5 text-left">Last Updated</th>
              <th className="border px-3 py-1.5 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border px-3 py-1.5">HYD001</td>
              <td className="border px-3 py-1.5 font-medium">Govt HS Koti</td>
              <td className="border px-3 py-1.5">West</td>
              <td className="border px-3 py-1.5">820</td>
              <td className="border px-3 py-1.5">Mr. Ramesh</td>
              <td className="border px-3 py-1.5 text-center font-medium text-green-700">
                Active
              </td>
              <td className="border px-3 py-1.5">Today</td>
              <td className="border px-3 py-1.5 text-blue-900 font-semibold cursor-pointer hover:underline">
                View
              </td>
            </tr>

            <tr>
              <td className="border px-3 py-1.5">HYD045</td>
              <td className="border px-3 py-1.5 font-medium">MPPS Amberpet</td>
              <td className="border px-3 py-1.5">East</td>
              <td className="border px-3 py-1.5">540</td>
              <td className="border px-3 py-1.5">Ms. Lakshmi</td>
              <td className="border px-3 py-1.5 text-center font-medium text-yellow-700">
                Under Inspection
              </td>
              <td className="border px-3 py-1.5">Yesterday</td>
              <td className="border px-3 py-1.5 text-blue-900 font-semibold cursor-pointer hover:underline">
                View
              </td>
            </tr>

            <tr>
              <td className="border px-3 py-1.5">HYD078</td>
              <td className="border px-3 py-1.5 font-medium">ZPHS Begumpet</td>
              <td className="border px-3 py-1.5">Central</td>
              <td className="border px-3 py-1.5">690</td>
              <td className="border px-3 py-1.5">Mr. Prakash</td>
              <td className="border px-3 py-1.5 text-center font-medium text-red-700">
                Suspended
              </td>
              <td className="border px-3 py-1.5">2 Days Ago</td>
              <td className="border px-3 py-1.5 text-blue-900 font-semibold cursor-pointer hover:underline">
                View
              </td>
            </tr>
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-4 py-3 text-sm bg-gray-50 border-t">
          <span className="text-gray-700 font-medium">
            Showing 1–10 of 124
          </span>
          <div className="space-x-2">
            <button className="border px-4 py-1.5 bg-white hover:bg-gray-100 transition">
              Previous
            </button>
            <button className="border px-4 py-1.5 bg-white hover:bg-gray-100 transition">
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}