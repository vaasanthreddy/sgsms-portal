"use client";

import Image from "next/image";

export default function ChildProfilePage() {
  return (
    <div className="space-y-6">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-xl font-bold text-blue-800">
          Child Profile Record
        </h1>
        <p className="text-xs text-gray-500">
          Comprehensive academic, attendance and activity information
        </p>
      </div>

      {/* BASIC INFORMATION */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">
          Basic Information
        </h2>

        <div className="grid grid-cols-5 gap-6 text-sm">

          <div className="col-span-1 flex flex-col items-center">
            <div className="w-32 h-40 relative border rounded overflow-hidden">
              <Image
                src="/student-photo.jpg"
                alt="Student"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 font-semibold">Rahul Reddy</p>
            <p className="text-xs text-gray-500">Roll No: 23</p>
          </div>

          <div className="col-span-4 grid grid-cols-4 gap-4">

            <Field label="Class" value="6th - A" />
            <Field label="Section" value="A" />
            <Field label="School ID" value="SCH-4567" />
            <Field label="Admission No" value="2021-0456" />

            <Field label="Date of Birth" value="12 June 2014" />
            <Field label="Gender" value="Male" />
            <Field label="Blood Group" value="O+" />
            <Field label="Category" value="General" />

            <Field label="Aadhar No" value="XXXX-XXXX-1234" />
            <Field label="EMIS Code" value="EMIS-8899123" />
            <Field label="Medium" value="English" />
            <Field label="Academic Year" value="2025-2026" />

          </div>
        </div>
      </div>

      {/* ACADEMIC PERFORMANCE TABLE */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">
          Academic Performance (Latest Term)
        </h2>

        <table className="w-full border text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Max Marks</th>
              <th className="border p-2">Obtained</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <Row subject="Mathematics" max="100" marks="92" grade="A+" />
            <Row subject="Science" max="100" marks="85" grade="A" />
            <Row subject="English" max="100" marks="78" grade="B+" />
            <Row subject="Social Studies" max="100" marks="81" grade="A" />
            <Row subject="Hindi" max="100" marks="75" grade="B+" />
          </tbody>
        </table>
      </div>

      {/* ATTENDANCE & MEAL SUMMARY */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white border rounded p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-blue-800 mb-4">
            Attendance Summary (2026)
          </h2>

          <Summary label="Total Working Days" value="22" />
          <Summary label="Days Present" value="20" />
          <Summary label="Days Absent" value="2" />
          <Summary label="Attendance Percentage" value="91%" />
        </div>

        <div className="bg-white border rounded p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-blue-800 mb-4">
            Mid-Day Meal Record
          </h2>

          <Summary label="Meals Served" value="20" />
          <Summary label="Missed Meals" value="2" />
          <Summary label="Quality Rating" value="Good" />
          <Summary label="Last Feedback" value="05 Feb 2026" />
        </div>

      </div>

      {/* SPORTS DETAILS */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">
          Sports Participation
        </h2>

        <div className="grid grid-cols-4 gap-4 text-sm">
          <Field label="Primary Sport" value="Cricket" />
          <Field label="Secondary Sport" value="Athletics" />
          <Field label="Position" value="Opening Batsman" />
          <Field label="District Participation" value="Yes" />
        </div>
      </div>

      {/* AWARDS */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">
          Awards & Achievements
        </h2>

        <ul className="text-sm list-disc pl-6 space-y-1">
          <li>Best Student Award - 2025</li>
          <li>1st Prize - Inter School Cricket Tournament</li>
          <li>Attendance Excellence Certificate</li>
          <li>Mathematics Olympiad Participant</li>
        </ul>
      </div>

      {/* PARENT DETAILS */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">
          Parent / Guardian Details
        </h2>

        <div className="grid grid-cols-4 gap-4 text-sm">
          <Field label="Father Name" value="Ramesh Reddy" />
          <Field label="Mother Name" value="Lakshmi Reddy" />
          <Field label="Contact Number" value="+91 9876543210" />
          <Field label="Email" value="parent@email.com" />
          <Field label="Address" value="Sarojini Devi Road, Hyderabad" />
        </div>
      </div>

      {/* ================= NEW ADDITIONS BELOW (Nothing Above Changed) ================= */}

      {/* DISCIPLINARY RECORD */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">
          Disciplinary Record
        </h2>
        <table className="w-full border text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Issue</th>
              <th className="border p-2">Action Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">10 Jan 2026</td>
              <td className="border p-2">Late to School</td>
              <td className="border p-2">Warning Issued</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* HEALTH RECORD */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">
          Health Record
        </h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <Field label="Height" value="145 cm" />
          <Field label="Weight" value="38 kg" />
          <Field label="BMI" value="Normal" />
          <Field label="Medical Condition" value="None" />
          <Field label="Last Health Checkup" value="01 Jan 2026" />
        </div>
      </div>

      {/* DOCUMENTS */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">
          Uploaded Documents
        </h2>
        <ul className="text-sm list-disc pl-6 space-y-1">
          <li>Birth Certificate</li>
          <li>Aadhar Card</li>
          <li>Previous Academic Report</li>
        </ul>
      </div>

    </div>
  );
}

/* COMPONENTS */

function Field({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Summary({ label, value }: any) {
  return (
    <div className="flex justify-between border-b py-2 text-sm">
      <span>{label}</span>
      <span className="font-medium text-blue-700">{value}</span>
    </div>
  );
}

function Row({ subject, max, marks, grade }: any) {
  return (
    <tr>
      <td className="border p-2">{subject}</td>
      <td className="border p-2">{max}</td>
      <td className="border p-2">{marks}</td>
      <td className="border p-2">{grade}</td>
      <td className="border p-2">Satisfactory</td>
    </tr>
  );
}