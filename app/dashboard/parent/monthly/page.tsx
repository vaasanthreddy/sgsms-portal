"use client";

import { useState } from "react";

export default function MonthlySummaryPage() {
  const [month, setMonth] = useState("February 2026");

  return (
    <div className="space-y-4 text-[13px]">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-lg font-bold text-blue-900">
          Monthly Attendance & Mid-Day Meal Consolidated Report
        </h1>
        <p className="text-xs text-gray-600">
          Government School Monitoring System – Parent View
        </p>
      </div>

      {/* ================= STUDENT INFO ================= */}
      <div className="border p-3 grid grid-cols-6 gap-4">
        <Info label="Student Name" value="Rahul Reddy" />
        <Info label="Roll No" value="23" />
        <Info label="Class / Section" value="6th - A" />
        <Info label="School Code" value="TS-SGSMS-0045" />
        <Info label="District" value="Hyderabad" />
        <Info label="Academic Year" value="2025-2026" />
      </div>

      {/* ================= MONTH SELECTOR ================= */}
      <div className="flex justify-between items-center border p-2">
        <div><strong>Selected Month:</strong> {month}</div>
        <select
          className="border px-2 py-1"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option>January 2026</option>
          <option>February 2026</option>
          <option>March 2026</option>
        </select>
      </div>

      {/* ================= ATTENDANCE SUMMARY ================= */}
      <div className="border p-3">
        <h2 className="font-semibold text-blue-800 mb-2">
          Attendance Monthly Summary
        </h2>

        <div className="grid grid-cols-6 gap-3 text-center">
          <Metric label="Working Days" value="22" />
          <Metric label="Days Present" value="20" />
          <Metric label="Days Absent" value="2" />
          <Metric label="Medical Leave" value="1" />
          <Metric label="Late Entries" value="2" />
          <Metric label="Attendance %" value="90.91%" />
        </div>

        <table className="w-full border mt-3 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Term</th>
              <th className="border p-1">Working Days</th>
              <th className="border p-1">Present</th>
              <th className="border p-1">Absent</th>
              <th className="border p-1">Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">Term 1</td>
              <td className="border p-1">120</td>
              <td className="border p-1">112</td>
              <td className="border p-1">8</td>
              <td className="border p-1">93%</td>
            </tr>
            <tr>
              <td className="border p-1">Term 2</td>
              <td className="border p-1">98</td>
              <td className="border p-1">90</td>
              <td className="border p-1">8</td>
              <td className="border p-1">91%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= MEAL SUMMARY ================= */}
      <div className="border p-3">
        <h2 className="font-semibold text-blue-800 mb-2">
          Mid-Day Meal Monthly Summary
        </h2>

        <div className="grid grid-cols-6 gap-3 text-center">
          <Metric label="Meals Planned" value="22" />
          <Metric label="Meals Availed" value="20" />
          <Metric label="Missed Meals" value="2" />
          <Metric label="Avg Calories" value="720 kcal" />
          <Metric label="Protein Avg" value="18g" />
          <Metric label="Compliance Status" value="Within Norms" />
        </div>

        <table className="w-full border mt-3 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Week</th>
              <th className="border p-1">Meals Served</th>
              <th className="border p-1">Quality Rating</th>
              <th className="border p-1">Issues Reported</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">Week 1</td>
              <td className="border p-1">5</td>
              <td className="border p-1">Good</td>
              <td className="border p-1">None</td>
            </tr>
            <tr>
              <td className="border p-1">Week 2</td>
              <td className="border p-1">5</td>
              <td className="border p-1">Good</td>
              <td className="border p-1">None</td>
            </tr>
            <tr>
              <td className="border p-1">Week 3</td>
              <td className="border p-1">5</td>
              <td className="border p-1">Average</td>
              <td className="border p-1">Low Salt Complaint</td>
            </tr>
            <tr>
              <td className="border p-1">Week 4</td>
              <td className="border p-1">5</td>
              <td className="border p-1">Good</td>
              <td className="border p-1">None</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= NUTRITION COMPLIANCE ================= */}
      <div className="border p-3">
        <h2 className="font-semibold text-blue-800 mb-2">
          Nutrition Compliance Summary
        </h2>

        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Nutrient</th>
              <th className="border p-1">Required</th>
              <th className="border p-1">Provided Avg</th>
              <th className="border p-1">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">Calories</td>
              <td className="border p-1">700 kcal</td>
              <td className="border p-1">720 kcal</td>
              <td className="border p-1">Compliant</td>
            </tr>
            <tr>
              <td className="border p-1">Protein</td>
              <td className="border p-1">20g</td>
              <td className="border p-1">18g</td>
              <td className="border p-1">Marginal</td>
            </tr>
            <tr>
              <td className="border p-1">Iron</td>
              <td className="border p-1">12mg</td>
              <td className="border p-1">12mg</td>
              <td className="border p-1">Compliant</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= VENDOR & FEEDBACK ================= */}
      <div className="border p-3">
        <h2 className="font-semibold text-blue-800 mb-2">
          Vendor & Feedback Summary
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <Info label="Vendor Name" value="Sri Lakshmi Catering Services" />
          <Info label="Last Inspection" value="20 Feb 2026" />
          <Info label="Inspection Rating" value="4.5 / 5" />
          <Info label="Parent Feedback Submitted" value="1 (Resolved)" />
        </div>
      </div>

    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div className="border p-2">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold text-blue-800">{value}</div>
    </div>
  );
}