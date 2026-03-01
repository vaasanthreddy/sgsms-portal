"use client";

import { useState } from "react";

export default function ParentProfilePage() {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="space-y-6 text-[13px]">

      {/* ================= EXISTING CONTENT ABOVE (UNCHANGED) ================= */}

      <div>
        <h1 className="text-lg font-bold text-blue-900">
          Parent Profile & Account Information
        </h1>
        <p className="text-xs text-gray-600">
          Government School Monitoring System – Registered Guardian Details
        </p>
      </div>

      <div className="border p-4">
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">Basic Information</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="border px-3 py-1 text-xs"
          >
            {editMode ? "Cancel Edit" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Full Name" value="K S Vaasaanth Reddy" edit={editMode} />
          <Field label="Parent ID" value="PRT-TS-2026-0456" />
          <Field label="Aadhaar (Masked)" value="XXXX-XXXX-4587" />
          <Field label="Mobile Number" value="+91 9876543210" edit={editMode} />
          <Field label="Email ID" value="parent@email.com" edit={editMode} />
          <Field label="Address" value="Sarojini Devi Road, Hyderabad" edit={editMode} />
        </div>
      </div>

      <div className="border p-4">
        <h2 className="font-semibold mb-3">Authentication & Security Status</h2>
        <div className="grid grid-cols-3 gap-4">
          <Info label="Last Login" value="28 Feb 2026 | 09:45 AM" />
          <Info label="Account Status" value="Active" />
          <Info label="Two-Factor Authentication" value="Enabled" />
          <Info label="Mobile Verified" value="Yes" />
          <Info label="Email Verified" value="Yes" />
          <Info label="Password Last Updated" value="15 Jan 2026" />
        </div>
      </div>

      <div className="border p-4">
        <h2 className="font-semibold mb-3">Linked Student Information</h2>
        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Student Name</th>
              <th className="border p-1">Roll No</th>
              <th className="border p-1">Class</th>
              <th className="border p-1">School Code</th>
              <th className="border p-1">Academic Year</th>
              <th className="border p-1">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">Rahul Reddy</td>
              <td className="border p-1">23</td>
              <td className="border p-1">6th - A</td>
              <td className="border p-1">TS-SGSMS-0045</td>
              <td className="border p-1">2025-2026</td>
              <td className="border p-1">Active</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border p-4">
        <h2 className="font-semibold mb-3">Emergency Contact Details</h2>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Emergency Contact Name" value="Ramesh Reddy" edit={editMode} />
          <Field label="Relation" value="Father" edit={editMode} />
          <Field label="Emergency Phone" value="+91 9123456780" edit={editMode} />
        </div>
      </div>

      <div className="border p-4">
        <h2 className="font-semibold mb-3">Scholarship / Bank Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <Info label="Scholarship Scheme" value="Mid-Day Meal Beneficiary" />
          <Info label="Bank Name" value="State Bank of India" />
          <Info label="Account (Masked)" value="XXXXXX4587" />
        </div>
      </div>

      <div className="border p-4">
        <h2 className="font-semibold mb-3">Digital Verification & Compliance</h2>
        <div className="grid grid-cols-3 gap-6 text-center mt-6">
          <div>
            <div className="border-t pt-2">Parent Digital Signature</div>
          </div>
          <div>
            <div className="border-t pt-2">School Head Verification</div>
          </div>
          <div>
            <div className="border-t pt-2">District Authority Seal</div>
          </div>
        </div>
      </div>

      {/* ================= NEWLY ADDED SECTIONS BELOW ================= */}

      {/* PROFILE PHOTO UPLOAD */}
      <div className="border p-4">
        <h2 className="font-semibold mb-3">Profile Photo</h2>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 border flex items-center justify-center">
            Photo
          </div>
          <input type="file" className="border p-1" />
        </div>
      </div>

      {/* DOCUMENT UPLOAD */}
      <div className="border p-4">
        <h2 className="font-semibold mb-3">Document Upload</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Upload Aadhaar Copy</label>
            <input type="file" className="border w-full p-1 mt-1" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Upload Address Proof</label>
            <input type="file" className="border w-full p-1 mt-1" />
          </div>
        </div>
      </div>

      {/* ACCOUNT ACTIVITY LOG */}
      <div className="border p-4">
        <h2 className="font-semibold mb-3">Account Activity Log</h2>
        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Date</th>
              <th className="border p-1">Activity</th>
              <th className="border p-1">IP Address</th>
              <th className="border p-1">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">28 Feb 2026</td>
              <td className="border p-1">Login</td>
              <td className="border p-1">192.168.0.1</td>
              <td className="border p-1">Successful</td>
            </tr>
            <tr>
              <td className="border p-1">15 Jan 2026</td>
              <td className="border p-1">Password Updated</td>
              <td className="border p-1">192.168.0.1</td>
              <td className="border p-1">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DOWNLOAD PROFILE BUTTON */}
      <div className="border p-4 text-center">
        <button className="border px-4 py-2 bg-blue-800 text-white">
          Download Profile Report (PDF)
        </button>
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

function Field({ label, value, edit }: any) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      {edit ? (
        <input defaultValue={value} className="border w-full p-1 mt-1" />
      ) : (
        <div className="font-semibold">{value}</div>
      )}
    </div>
  );
}