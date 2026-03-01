"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [category, setCategory] = useState("Meal Quality");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const complaints = [
    {
      id: "CMP-2026-001",
      category: "Meal Quality",
      date: "12 Feb 2026",
      priority: "Medium",
      status: "Resolved",
      level: "School Level",
      action: "Vendor warned and corrected",
      resolution: "14 Feb 2026",
    },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 text-[13px]">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-lg font-bold text-blue-900">
          Parent Feedback & Grievance Cell
        </h1>
        <p className="text-xs text-gray-600">
          Government School Monitoring & Complaint Resolution System
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

      {/* ================= NEW FEEDBACK FORM ================= */}
      <div className="border p-4">
        <h2 className="font-semibold mb-3">Submit New Feedback / Complaint</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-600">Category</label>
            <select
              className="border w-full p-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Meal Quality</option>
              <option>Attendance Issue</option>
              <option>Staff Behaviour</option>
              <option>Infrastructure</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600">Priority</label>
            <select
              className="border w-full p-1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-600">
            Description of Issue
          </label>
          <textarea
            className="border w-full p-2 h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter detailed description of the issue..."
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-600">
            Attach Supporting Document (Optional)
          </label>
          <input type="file" className="border w-full p-1" />
        </div>

        <button
          onClick={handleSubmit}
          className="border px-4 py-2 bg-blue-800 text-white"
        >
          Submit Complaint
        </button>

        {submitted && (
          <div className="mt-3 text-green-600 font-semibold">
            Complaint Submitted Successfully. Tracking ID: CMP-2026-NEW
          </div>
        )}
      </div>

      {/* ================= COMPLAINT TRACKING TABLE ================= */}
      <div className="border p-4">
        <h2 className="font-semibold mb-3">
          Complaint Tracking & Resolution History
        </h2>

        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Complaint ID</th>
              <th className="border p-1">Category</th>
              <th className="border p-1">Date Raised</th>
              <th className="border p-1">Priority</th>
              <th className="border p-1">Status</th>
              <th className="border p-1">Current Level</th>
              <th className="border p-1">Action Taken</th>
              <th className="border p-1">Resolution Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, index) => (
              <tr key={index}>
                <td className="border p-1">{c.id}</td>
                <td className="border p-1">{c.category}</td>
                <td className="border p-1">{c.date}</td>
                <td className="border p-1">{c.priority}</td>
                <td className="border p-1">{c.status}</td>
                <td className="border p-1">{c.level}</td>
                <td className="border p-1">{c.action}</td>
                <td className="border p-1">{c.resolution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ESCALATION POLICY ================= */}
      <div className="border p-4">
        <h2 className="font-semibold mb-2">Escalation & SLA Policy</h2>
        <ul className="list-disc pl-5 text-xs space-y-1">
          <li>School Level Resolution Time: 3 Working Days</li>
          <li>District Level Escalation: After 3 Days</li>
          <li>State Monitoring Cell Escalation: After 7 Days</li>
          <li>All complaints are digitally logged and monitored</li>
        </ul>
      </div>

      {/* ===================== ADDED SECTIONS BELOW (NO CHANGES ABOVE) ===================== */}

      {/* REPORT METADATA */}
      <div className="border p-4">
        <h2 className="font-semibold mb-2">Report Metadata</h2>
        <div className="grid grid-cols-4 gap-4">
          <Info label="Report ID" value="FB-TS-2026-0456" />
          <Info label="Generated On" value="28 Feb 2026 | 11:30 AM" />
          <Info label="Generated By" value="SGSMS Parent Portal" />
          <Info label="System Reference" value="GRV-TRACK-2026" />
        </div>
      </div>

      {/* ESCALATION FLOW TABLE */}
      <div className="border p-4">
        <h2 className="font-semibold mb-2">Escalation Workflow Register</h2>
        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Level</th>
              <th className="border p-1">Responsible Authority</th>
              <th className="border p-1">Max Resolution Time</th>
              <th className="border p-1">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">Level 1</td>
              <td className="border p-1">School Head</td>
              <td className="border p-1">3 Days</td>
              <td className="border p-1">Completed</td>
            </tr>
            <tr>
              <td className="border p-1">Level 2</td>
              <td className="border p-1">District Education Officer</td>
              <td className="border p-1">7 Days</td>
              <td className="border p-1">Not Escalated</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DECLARATION BLOCK */}
      <div className="border p-4">
        <h2 className="font-semibold mb-3">Declaration & Digital Verification</h2>
        <div className="grid grid-cols-3 gap-8 text-center mt-6">
          <div>
            <div className="border-t pt-2">Parent Signature</div>
          </div>
          <div>
            <div className="border-t pt-2">School Head Signature</div>
          </div>
          <div>
            <div className="border-t pt-2">District Officer Seal</div>
          </div>
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