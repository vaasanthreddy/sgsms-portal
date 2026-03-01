"use client";

import { useState, useRef, ChangeEvent } from "react";

type Student = {
  name: string;
  status: string;
  breakfastPhoto: string;
  lunchPhoto: string;
  snacksPhoto: string;
  dinnerPhoto: string;
};

export default function MonitorSchoolData() {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [approvedClasses, setApprovedClasses] = useState<string[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  const classes: string[] = [
    "LKG","UKG","1st","2nd","3rd","4th","5th",
    "6th - A","6th - B",
    "7th - A","7th - B",
    "8th - A","8th - B",
    "9th - A","9th - B",
    "10th - A","10th - B",
  ];

  /* ================= TOP SUMMARY TABLE ================= */

  const todaySummary = classes.map((cls) => {
    const total = 35;
    const present = 32;
    return {
      class: cls,
      total,
      present,
      breakfast: 30,
      lunch: 31,
      snacks: 29,
      dinner: 30,
    };
  });

  /* ================= STUDENT DATA ================= */

  function generateStudents(className: string): Student[] {
    const students: Student[] = [];
    for (let i = 1; i <= 35; i++) {
      students.push({
        name: `${className} Student ${i}`,
        status: i % 5 === 0 ? "Absent" : "Present",
        breakfastPhoto: "/meal-proof.jpg",
        lunchPhoto: "/meal-proof.jpg",
        snacksPhoto: "/meal-proof.jpg",
        dinnerPhoto: "/meal-proof.jpg",
      });
    }
    return students;
  }

  const studentsData: Record<string, Student[]> = {};
  classes.forEach((cls) => {
    studentsData[cls] = generateStudents(cls);
  });

  /* ================= APPROVAL ================= */

  function approveClass(cls: string) {
    if (!approvedClasses.includes(cls)) {
      setApprovedClasses([...approvedClasses, cls]);
    }
  }

  const allApproved = approvedClasses.length === classes.length;

  /* ================= EXPORT FULL SCHOOL ================= */

  function exportFullSchoolPDF() {
    const originalContents = document.body.innerHTML;
    const printContents = printRef.current?.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  }

  return (
    <div className="space-y-8">

      {/* ================= TOP SUMMARY TABLE ================= */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-4">
          Today's Meal Summary (All Classes)
        </h2>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Class</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Present</th>
              <th className="border p-2">Breakfast</th>
              <th className="border p-2">Lunch</th>
              <th className="border p-2">Snacks</th>
              <th className="border p-2">Dinner</th>
            </tr>
          </thead>
          <tbody>
            {todaySummary.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{row.class}</td>
                <td className="border p-2 text-center">{row.total}</td>
                <td className="border p-2 text-center">{row.present}</td>
                <td className="border p-2 text-center">{row.breakfast}</td>
                <td className="border p-2 text-center">{row.lunch}</td>
                <td className="border p-2 text-center">{row.snacks}</td>
                <td className="border p-2 text-center">{row.dinner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CLASS SELECT ================= */}
      <div className="bg-white shadow rounded p-6">

        <label className="block mb-2 font-semibold text-gray-700">
          Select Class to Review Student Meal Records
        </label>

        <select
          value={selectedClass}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedClass(e.target.value)
          }
          className="border px-4 py-2 rounded w-64"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {/* ================= SELECTED CLASS TABLE ================= */}

      {selectedClass && studentsData[selectedClass] && (
        <div className="bg-white shadow rounded p-6">
          <div className="flex justify-between mb-4">
            <h3>{selectedClass} Records</h3>

            <button
              onClick={() => approveClass(selectedClass)}
              disabled={approvedClasses.includes(selectedClass)}
              className={`px-4 py-2 rounded ${
                approvedClasses.includes(selectedClass)
                  ? "bg-green-600 text-white"
                  : "bg-gray-600 text-white"
              }`}
            >
              {approvedClasses.includes(selectedClass)
                ? "Approved ✓"
                : "Approve Class"}
            </button>
          </div>

          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Breakfast</th>
                <th className="border p-2">Lunch</th>
                <th className="border p-2">Snacks</th>
                <th className="border p-2">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {studentsData[selectedClass].map(
                (student: Student, index: number) => (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.status}</td>
                    <td className="border p-2">
                      <img src={student.breakfastPhoto} className="w-10 h-10" />
                    </td>
                    <td className="border p-2">
                      <img src={student.lunchPhoto} className="w-10 h-10" />
                    </td>
                    <td className="border p-2">
                      <img src={student.snacksPhoto} className="w-10 h-10" />
                    </td>
                    <td className="border p-2">
                      <img src={student.dinnerPhoto} className="w-10 h-10" />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= FINAL EXPORT ================= */}

      {allApproved && (
        <div className="bg-green-100 p-6 rounded text-center">
          <h3 className="mb-4 font-semibold">
            All Classes Approved for Today ✅
          </h3>

          <button
            onClick={exportFullSchoolPDF}
            className="bg-green-700 text-white px-6 py-2 rounded"
          >
            Export Full School PDF
          </button>
        </div>
      )}

      {/* ================= HIDDEN FULL SCHOOL PRINT ================= */}

      <div ref={printRef} className="hidden">
        <h2>Smart Government School Management System (SGSMS)</h2>
        <h3>Daily Approval Report</h3>

        {classes.map((cls) => (
          <div key={cls}>
            <h4>{cls}</h4>
            <table border={1}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentsData[cls].map(
                  (student: Student, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.status}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ))}

        <h3>All Classes Approved for Today</h3>
      </div>
    </div>
  );
}