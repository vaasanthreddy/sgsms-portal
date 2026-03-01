"use client";

import { useState } from "react";

export default function DistrictAdminProfile() {

  const [admin] = useState({
    name: "Vaasanth Reddy",
    employeeId: "DA-1001",
    email: "districtadmin@sgsms.gov.in",
    phone: "9876543210",
    district: "Hyderabad",
    joiningDate: "01 April 2024",
    role: "District Education Officer",
    officeAddress: "District Education Office, Hyderabad",
    qualification: "M.Tech (Information Technology), MBA (Public Administration)",
    experience: "12 Years Administrative Experience",
    photo: "https://via.placeholder.com/150",
  });

  return (
    <div className="min-h-screen bg-gray-100">

      {/* OFFICIAL HEADER */}
      <div className="bg-blue-900 text-white py-6 px-8 shadow-lg">
        <h1 className="text-2xl font-semibold">
          District Administration Profile
        </h1>
        <p className="text-sm opacity-80">
          Smart Government School Management System (SGSMS)
        </p>
      </div>

      <div className="p-8">

        {/* PROFILE SECTION */}
        <div className="bg-white shadow-md border rounded-lg p-6 mb-8 flex flex-col md:flex-row gap-8">

          <div className="flex flex-col items-center">
            <img
              src={admin.photo}
              alt="Profile"
              className="w-40 h-40 rounded border border-gray-400"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

            <div><strong>Name:</strong> {admin.name}</div>
            <div><strong>Employee ID:</strong> {admin.employeeId}</div>
            <div><strong>Designation:</strong> {admin.role}</div>
            <div><strong>District:</strong> {admin.district}</div>
            <div><strong>Email:</strong> {admin.email}</div>
            <div><strong>Phone:</strong> {admin.phone}</div>
            <div><strong>Joining Date:</strong> {admin.joiningDate}</div>
            <div><strong>Experience:</strong> {admin.experience}</div>
            <div className="md:col-span-2">
              <strong>Office Address:</strong> {admin.officeAddress}
            </div>
            <div className="md:col-span-2">
              <strong>Qualification:</strong> {admin.qualification}
            </div>

          </div>
        </div>

        {/* ADMINISTRATIVE STATISTICS */}
        <div className="bg-white shadow-md border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-6">
            Administrative Overview
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <div className="border p-4 rounded">
              <p className="text-xl font-bold text-blue-700">300</p>
              <p>Total Schools</p>
            </div>

            <div className="border p-4 rounded">
              <p className="text-xl font-bold text-blue-700">10</p>
              <p>Total Mandals</p>
            </div>

            <div className="border p-4 rounded">
              <p className="text-xl font-bold text-blue-700">1,500+</p>
              <p>Total Teaching Staff</p>
            </div>

            <div className="border p-4 rounded">
              <p className="text-xl font-bold text-blue-700">1,20,000+</p>
              <p>Total Students</p>
            </div>

          </div>
        </div>

        {/* PROFESSIONAL ACHIEVEMENTS */}
        <div className="bg-white shadow-md border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            Professional Achievements
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-sm">
            <li>Successfully implemented District-wide Digital Meal Monitoring System.</li>
            <li>Improved student meal compliance rate from 72% to 88% within one academic year.</li>
            <li>Achieved 100% fund utilization transparency under central audit review.</li>
            <li>Led digital transformation initiatives across 300 government schools.</li>
            <li>Received State Excellence Award for Administrative Leadership (2025).</li>
          </ul>
        </div>

        {/* OFFICIAL RESPONSIBILITIES */}
        <div className="bg-white shadow-md border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            Official Responsibilities
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-sm">
            <li>Supervision of all government schools within the district.</li>
            <li>Monitoring implementation of mid-day meal and nutrition programs.</li>
            <li>Approval of district-level financial allocations and reports.</li>
            <li>Ensuring compliance with state and central educational policies.</li>
            <li>Conducting periodic performance audits and school inspections.</li>
          </ul>
        </div>

        {/* CERTIFICATIONS & TRAINING */}
        <div className="bg-white shadow-md border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            Certifications & Training
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-sm">
            <li>Certified Government Administrative Officer – State Public Service Commission.</li>
            <li>Training in Digital Governance & Public Policy.</li>
            <li>Advanced Workshop on Education Fund Management & Compliance.</li>
            <li>Leadership Development Program – National Institute of Governance.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}