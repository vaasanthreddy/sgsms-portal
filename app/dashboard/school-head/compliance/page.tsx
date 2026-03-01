"use client";

import { useState } from "react";

export default function CompliancePage() {
  const today = new Date().toLocaleDateString();

  /* ================= SECTION STATES ================= */
  const [mealChecks, setMealChecks] = useState({
    classesSubmitted: false,
    photosUploaded: false,
    noMismatch: false,
    menuFollowed: false,
  });

  const [attendanceChecks, setAttendanceChecks] = useState({
    attendanceSubmitted: false,
    verifiedData: false,
    noDuplicates: false,
  });

  const [schemeChecks, setSchemeChecks] = useState({
    normsFollowed: false,
    hygieneMaintained: false,
    documentationStored: false,
  });

  const [mealVerified, setMealVerified] = useState(false);
  const [attendanceVerified, setAttendanceVerified] = useState(false);
  const [schemeVerified, setSchemeVerified] = useState(false);
  const [finalApproved, setFinalApproved] = useState(false);

  /* ================= CHECK CONDITIONS ================= */
  const allMealChecked = Object.values(mealChecks).every(Boolean);
  const allAttendanceChecked = Object.values(attendanceChecks).every(Boolean);
  const allSchemeChecked = Object.values(schemeChecks).every(Boolean);

  const allSectionsVerified =
    mealVerified && attendanceVerified && schemeVerified;

  /* ================= EXPORT ================= */
  function exportCompliancePDF() {
    window.print();
  }

  /* ================= REUSABLE CHECKBOX ================= */
  const Checkbox = ({ label, checked, onChange }: any) => (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={finalApproved}
        className="w-4 h-4"
      />
      {label}
    </label>
  );

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-2">
          Daily Compliance Verification
        </h2>
        <p className="text-gray-600 text-sm">
          Date: {today}
        </p>
      </div>

      {/* ================= MEAL COMPLIANCE ================= */}
      <div className="bg-white shadow rounded p-6 space-y-4">
        <h3 className="text-lg font-semibold">
          1. Meal Distribution Compliance
        </h3>

        <Checkbox
          label="All classes submitted meal attendance"
          checked={mealChecks.classesSubmitted}
          onChange={() =>
            setMealChecks({ ...mealChecks, classesSubmitted: !mealChecks.classesSubmitted })
          }
        />
        <Checkbox
          label="4 meal photos uploaded per student"
          checked={mealChecks.photosUploaded}
          onChange={() =>
            setMealChecks({ ...mealChecks, photosUploaded: !mealChecks.photosUploaded })
          }
        />
        <Checkbox
          label="No data mismatch found"
          checked={mealChecks.noMismatch}
          onChange={() =>
            setMealChecks({ ...mealChecks, noMismatch: !mealChecks.noMismatch })
          }
        />
        <Checkbox
          label="Weekly food menu followed"
          checked={mealChecks.menuFollowed}
          onChange={() =>
            setMealChecks({ ...mealChecks, menuFollowed: !mealChecks.menuFollowed })
          }
        />

        <button
          disabled={!allMealChecked || mealVerified}
          onClick={() => setMealVerified(true)}
          className={`mt-3 px-4 py-2 rounded text-sm ${
            mealVerified
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          {mealVerified ? "Meal Compliance Verified ✓" : "Verify Meal Compliance"}
        </button>
      </div>

      {/* ================= ATTENDANCE COMPLIANCE ================= */}
      <div className="bg-white shadow rounded p-6 space-y-4">
        <h3 className="text-lg font-semibold">
          2. Attendance Policy Compliance
        </h3>

        <Checkbox
          label="Attendance submitted for all classes"
          checked={attendanceChecks.attendanceSubmitted}
          onChange={() =>
            setAttendanceChecks({
              ...attendanceChecks,
              attendanceSubmitted: !attendanceChecks.attendanceSubmitted,
            })
          }
        />
        <Checkbox
          label="Present & Absent verified"
          checked={attendanceChecks.verifiedData}
          onChange={() =>
            setAttendanceChecks({
              ...attendanceChecks,
              verifiedData: !attendanceChecks.verifiedData,
            })
          }
        />
        <Checkbox
          label="No duplicate or missing records"
          checked={attendanceChecks.noDuplicates}
          onChange={() =>
            setAttendanceChecks({
              ...attendanceChecks,
              noDuplicates: !attendanceChecks.noDuplicates,
            })
          }
        />

        <button
          disabled={!allAttendanceChecked || attendanceVerified}
          onClick={() => setAttendanceVerified(true)}
          className={`mt-3 px-4 py-2 rounded text-sm ${
            attendanceVerified
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          {attendanceVerified
            ? "Attendance Compliance Verified ✓"
            : "Verify Attendance Compliance"}
        </button>
      </div>

      {/* ================= SCHEME COMPLIANCE ================= */}
      <div className="bg-white shadow rounded p-6 space-y-4">
        <h3 className="text-lg font-semibold">
          3. Government Scheme Compliance
        </h3>

        <Checkbox
          label="Midday Meal norms followed"
          checked={schemeChecks.normsFollowed}
          onChange={() =>
            setSchemeChecks({
              ...schemeChecks,
              normsFollowed: !schemeChecks.normsFollowed,
            })
          }
        />
        <Checkbox
          label="Hygiene maintained"
          checked={schemeChecks.hygieneMaintained}
          onChange={() =>
            setSchemeChecks({
              ...schemeChecks,
              hygieneMaintained: !schemeChecks.hygieneMaintained,
            })
          }
        />
        <Checkbox
          label="Proper documentation stored"
          checked={schemeChecks.documentationStored}
          onChange={() =>
            setSchemeChecks({
              ...schemeChecks,
              documentationStored: !schemeChecks.documentationStored,
            })
          }
        />

        <button
          disabled={!allSchemeChecked || schemeVerified}
          onClick={() => setSchemeVerified(true)}
          className={`mt-3 px-4 py-2 rounded text-sm ${
            schemeVerified
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          {schemeVerified
            ? "Scheme Compliance Verified ✓"
            : "Verify Scheme Compliance"}
        </button>
      </div>

      {/* ================= FINAL APPROVAL ================= */}
      {allSectionsVerified && (
        <div className="bg-green-100 border border-green-400 rounded p-6 text-center space-y-4">
          <h3 className="text-lg font-semibold">
            All Compliance Sections Verified ✅
          </h3>

          <button
            disabled={finalApproved}
            onClick={() => setFinalApproved(true)}
            className="bg-green-700 text-white px-6 py-2 rounded"
          >
            {finalApproved
              ? "Daily Compliance Approved ✓"
              : "Approve Daily Compliance"}
          </button>

          {finalApproved && (
            <>
              <div className="text-sm text-gray-700 mt-4">
                Approved By: School Head  
                <br />
                Digital Signature: ______________________
              </div>

              <button
                onClick={exportCompliancePDF}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
              >
                Export Compliance Report PDF
              </button>
            </>
          )}
        </div>
      )}

      <div className="bg-white shadow rounded p-4 text-sm text-gray-600">
        Note: Compliance must be completed before end of working day.
      </div>
    </div>
  );
}