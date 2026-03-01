"use client";

import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function DistrictAdminDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-8">

        {/* District Operational Summary */}
        <div className="bg-white border shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            District Operational Summary
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">

            <div>
              <p className="text-gray-500">Total Schools</p>
              <p className="text-lg font-semibold">124</p>
              <p className="text-xs text-gray-400">Across 8 Mandals</p>
            </div>

            <div>
              <p className="text-gray-500">Data Submitted Today</p>
              <p className="text-lg font-semibold text-green-600">118</p>
              <p className="text-xs text-gray-400">95% submission rate</p>
            </div>

            <div>
              <p className="text-gray-500">Data Not Submitted</p>
              <p className="text-lg font-semibold text-red-600">6</p>
              <p className="text-xs text-gray-400">Requires follow-up</p>
            </div>

            <div>
              <p className="text-gray-500">Schools Under Inspection</p>
              <p className="text-lg font-semibold">4</p>
              <p className="text-xs text-gray-400">Ongoing field verification</p>
            </div>

            <div>
              <p className="text-gray-500">Schools Flagged</p>
              <p className="text-lg font-semibold text-yellow-600">3</p>
              <p className="text-xs text-gray-400">Compliance deviation detected</p>
            </div>

            <div>
              <p className="text-gray-500">Weekly Approval Pending</p>
              <p className="text-lg font-semibold">7</p>
              <p className="text-xs text-gray-400">Awaiting district review</p>
            </div>

          </div>
        </div>

        {/* Mandal Compliance Overview */}
        <div className="bg-white border shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Mandal Compliance Overview
          </h3>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Mandal</th>
                <th className="p-3 border">Total Schools</th>
                <th className="p-3 border">Submitted</th>
                <th className="p-3 border">Pending</th>
                <th className="p-3 border">Compliance %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border">Central</td>
                <td className="p-3 border">25</td>
                <td className="p-3 border">25</td>
                <td className="p-3 border">0</td>
                <td className="p-3 border text-green-600">100%</td>
              </tr>
              <tr>
                <td className="p-3 border">East</td>
                <td className="p-3 border">30</td>
                <td className="p-3 border">27</td>
                <td className="p-3 border text-red-600">3</td>
                <td className="p-3 border text-yellow-600">90%</td>
              </tr>
              <tr>
                <td className="p-3 border">West</td>
                <td className="p-3 border">22</td>
                <td className="p-3 border">18</td>
                <td className="p-3 border text-red-600">4</td>
                <td className="p-3 border text-red-600">82%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Schools Requiring Immediate Intervention */}
        <div className="bg-white border shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Schools Requiring Immediate Intervention
          </h3>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-red-50 text-left">
                <th className="p-3 border">School</th>
                <th className="p-3 border">Mandal</th>
                <th className="p-3 border">Issue</th>
                <th className="p-3 border">Days Pending</th>
                <th className="p-3 border">Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border">Govt HS Koti</td>
                <td className="p-3 border">West</td>
                <td className="p-3 border text-red-600">
                  Attendance below 70%
                </td>
                <td className="p-3 border">3 Days</td>
                <td className="p-3 border text-red-600 font-medium">
                  High
                </td>
              </tr>
              <tr>
                <td className="p-3 border">MPPS Amberpet</td>
                <td className="p-3 border">East</td>
                <td className="p-3 border text-yellow-600">
                  Low Rice Stock
                </td>
                <td className="p-3 border">1 Day</td>
                <td className="p-3 border text-yellow-600 font-medium">
                  Moderate
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* RIGHT SIDE (UNCHANGED STRUCTURE) */}
      <div className="space-y-6">

        <div className="bg-white border shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} />
            Critical Alerts
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="text-red-600">
              3 Schools below 70% attendance
            </li>
            <li className="text-yellow-600">
              2 Schools low stock (Rice)
            </li>
            <li className="text-red-600">
              1 School not submitted data today
            </li>
          </ul>
        </div>

        <div className="bg-white border shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Pending Approvals
          </h3>
          <div className="text-sm space-y-2">
            <p>Weekly Reports Pending: <strong>7</strong></p>
            <p>Verification Required: <strong>3</strong></p>
            <p>Audit Flags Raised: <strong>2</strong></p>
          </div>
          <div className="mt-4 space-y-2">
            <button className="w-full bg-blue-900 text-white py-2 rounded text-sm">
              Review Approvals
            </button>
            <button className="w-full bg-gray-700 text-white py-2 rounded text-sm">
              Lock Weekly Data
            </button>
          </div>
        </div>

        <div className="bg-white border shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            System Status
          </h3>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <ShieldCheck size={16} />
            All district systems operational
          </div>
        </div>

      </div>
    </div>
  );
}