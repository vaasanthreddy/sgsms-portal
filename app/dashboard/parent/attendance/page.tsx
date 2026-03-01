"use client";

import { useState } from "react";

export default function AttendanceReportPage() {
  const [month, setMonth] = useState("February 2026");

  return (
    <div className="space-y-4 text-[13px]">

      {/* PAGE HEADER */}
      <div className="border-b pb-2">
        <h1 className="text-lg font-bold text-blue-900">
          Student Attendance Monitoring Register
        </h1>
        <p className="text-xs text-gray-600">
          Government Attendance Compliance & Academic Monitoring Record
        </p>
      </div>

      {/* INSTITUTION BLOCK */}
      <div className="border p-3 grid grid-cols-6 gap-2">
        <Info label="Student Name" value="Rahul Reddy" />
        <Info label="Roll No" value="23" />
        <Info label="Class / Section" value="6th - A" />
        <Info label="School Code" value="TS-SGSMS-0045" />
        <Info label="EMIS ID" value="EMIS-8899123" />
        <Info label="Academic Year" value="2025-2026" />
      </div>

      {/* MONTH CONTROL */}
      <div className="flex justify-between items-center">
        <div><strong>Monitoring Month:</strong> {month}</div>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-2 py-1"
        >
          <option>January 2026</option>
          <option>February 2026</option>
          <option>March 2026</option>
        </select>
      </div>

      {/* MONTHLY COMPLIANCE METRICS */}
      <div className="border p-3">
        <h2 className="font-semibold text-blue-800 mb-2">
          Monthly Attendance Compliance Metrics
        </h2>

        <div className="grid grid-cols-8 gap-2">
          <Metric label="Working Days" value="22" />
          <Metric label="Present" value="20" />
          <Metric label="Absent" value="2" />
          <Metric label="Medical Leave" value="1" />
          <Metric label="Personal Leave" value="1" />
          <Metric label="Late Entries" value="2" />
          <Metric label="Attendance %" value="90.91%" />
          <Metric label="Compliance Status" value="Within Norms" />
        </div>
      </div>

      {/* TERM + YEAR COMPARISON */}
      <div className="border p-3">
        <h2 className="font-semibold text-blue-800 mb-2">
          Term & Year Comparative Attendance
        </h2>

        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Term</th>
              <th className="border p-1">Working Days</th>
              <th className="border p-1">Present</th>
              <th className="border p-1">Absent</th>
              <th className="border p-1">%</th>
              <th className="border p-1">Trend</th>
              <th className="border p-1">Compliance Grade</th>
            </tr>
          </thead>
          <tbody>
            <TermRow term="Term 1" working="120" present="112" absent="8" percent="93%" trend="Stable" grade="A" />
            <TermRow term="Term 2" working="98" present="90" absent="8" percent="91%" trend="Slight Drop" grade="A-" />
            <TermRow term="Cumulative" working="218" present="202" absent="16" percent="92.66%" trend="Stable" grade="A" />
          </tbody>
        </table>
      </div>

      {/* DETAILED DAILY REGISTER */}
      <div className="border p-3">
        <h2 className="font-semibold text-blue-800 mb-2">
          Daily Attendance Register (Official Log)
        </h2>

        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Date</th>
              <th className="border p-1">Day</th>
              <th className="border p-1">Status</th>
              <th className="border p-1">Attendance Code</th>
              <th className="border p-1">Reason</th>
              <th className="border p-1">Marked By</th>
              <th className="border p-1">Verified By</th>
              <th className="border p-1">Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            <DailyRow date="01 Feb 2026" day="Mon" status="Present" code="P" reason="-" />
            <DailyRow date="02 Feb 2026" day="Tue" status="Present" code="P" reason="-" />
            <DailyRow date="03 Feb 2026" day="Wed" status="Absent" code="ML" reason="Medical Leave" />
            <DailyRow date="04 Feb 2026" day="Thu" status="Present" code="P" reason="-" />
            <DailyRow date="05 Feb 2026" day="Fri" status="Present" code="P" reason="-" />
            <DailyRow date="06 Feb 2026" day="Sat" status="Present" code="P" reason="-" />
            <DailyRow date="07 Feb 2026" day="Sun" status="Holiday" code="H" reason="Weekend Holiday" />
          </tbody>
        </table>
      </div>

      {/* AUDIT BLOCK */}
      <div className="border p-3">
        <h2 className="font-semibold text-blue-800 mb-2">
          Audit & Verification Record
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <Info label="Class Teacher Signature" value="Digitally Verified" />
          <Info label="School Head Approval" value="Approved" />
          <Info label="District Monitoring Status" value="Reviewed" />
          <Info label="Last System Sync" value="28 Feb 2026 | 02:05 PM" />
        </div>
      </div>

    </div>
  );
}

/* COMPONENTS */

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
    <div className="border p-2 text-center">
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className="font-bold text-blue-800">{value}</div>
    </div>
  );
}

function TermRow({ term, working, present, absent, percent, trend, grade }: any) {
  return (
    <tr>
      <td className="border p-1">{term}</td>
      <td className="border p-1">{working}</td>
      <td className="border p-1">{present}</td>
      <td className="border p-1">{absent}</td>
      <td className="border p-1 font-semibold">{percent}</td>
      <td className="border p-1">{trend}</td>
      <td className="border p-1">{grade}</td>
    </tr>
  );
}

function DailyRow({ date, day, status, code, reason }: any) {
  return (
    <tr>
      <td className="border p-1">{date}</td>
      <td className="border p-1">{day}</td>
      <td className="border p-1">{status}</td>
      <td className="border p-1">{code}</td>
      <td className="border p-1">{reason}</td>
      <td className="border p-1">Class Teacher</td>
      <td className="border p-1">School Head</td>
      <td className="border p-1">09:05 AM</td>
    </tr>
  );
}