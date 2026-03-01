"use client";

import { useState } from "react";

export default function StudentOverview() {

  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState<any>(null);

  // ✅ FULL STUDENT DATA (No Empty Fields)
  const studentsDB: any = {
    "STU101": {
      name: "Rahul Kumar",
      class: "8th Class",
      section: "A",
      rollNo: "23",
      academicYear: "2025-2026",
      classTeacher: "Mrs. Kavitha",
      medium: "English",
      schoolName: "ZPHS Government School",
      district: "Hyderabad",
      father: "Ramesh Kumar",
      mother: "Sita Devi",
      contact: "9876543210"
    }
  };

  const handleSearch = () => {
    if (studentsDB[studentId]) {
      setStudentData(studentsDB[studentId]);
    } else {
      alert("Student not found");
      setStudentData(null);
    }
  };

  const today = new Date();
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // 🔵 WEEKLY
  const getWeekDates = (baseDate: Date) => {
    const start = new Date(baseDate);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      week.push(d);
    }
    return week;
  };

  // 🔵 MONTHLY
  const getMonthDates = (year: number, month: number) => {
    const dates = [];
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= totalDays; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedDate);
  const monthDates = getMonthDates(selectedYear, selectedMonth);

  const changeWeek = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  // ✅ NEW: Change Month Buttons
  const changeMonth = (direction: number) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Student Overview
      </h1>

      {/* Search */}
      <div className="bg-white shadow p-6 rounded mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-900 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {studentData && (
        <>
         {/* Student Details */}
<div className="bg-white shadow p-6 rounded mb-6">
  <h2 className="text-xl font-semibold text-blue-900 mb-4">
    Student Details
  </h2>

  <div className="flex items-start gap-8">

    {/* 🔵 Student Photo Section */}
    <div className="flex flex-col items-center">

      <img
        src={studentData.photo || "/default-user.png"}
        alt="Student"
        className="w-32 h-36 object-cover rounded shadow border mb-3"
      />

      {/* Upload Button */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const imageUrl = URL.createObjectURL(file);

          setStudentData({
            ...studentData,
            photo: imageUrl
          });
        }}
        className="text-sm"
      />

    </div>

    {/* 🔵 Student Info */}
    <div className="grid md:grid-cols-2 gap-4 flex-1">
      <div><strong>Name:</strong> {studentData.name}</div>
      <div><strong>Father Name:</strong> {studentData.father}</div>
      <div><strong>Mother Name:</strong> {studentData.mother}</div>
      <div><strong>Contact:</strong> {studentData.contact}</div>
    </div>

  </div>
</div>

          {/* Class Details */}
          <div className="bg-white shadow p-6 rounded mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Class Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div><strong>Class:</strong> {studentData.class}</div>
              <div><strong>Section:</strong> {studentData.section}</div>
              <div><strong>Roll No:</strong> {studentData.rollNo}</div>
              <div><strong>Academic Year:</strong> {studentData.academicYear}</div>
              <div><strong>Class Teacher:</strong> {studentData.classTeacher}</div>
              <div><strong>Medium:</strong> {studentData.medium}</div>
              <div><strong>School Name:</strong> {studentData.schoolName}</div>
              <div><strong>District:</strong> {studentData.district}</div>
            </div>
          </div>

          {/* Meal Consumption */}
          <div className="bg-white shadow rounded p-4 overflow-x-auto">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Meal Consumption
            </h2>

            {/* View Controls */}
            <div className="flex items-center gap-4 mb-4">
              <select
                value={viewMode}
                onChange={(e) =>
                  setViewMode(e.target.value as "weekly" | "monthly")
                }
                className="border p-2 rounded"
              >
                <option value="weekly">Weekly Consumption</option>
                <option value="monthly">Monthly Consumption</option>
              </select>

              {viewMode === "weekly" && (
                <>
                  <button onClick={() => changeWeek(-1)} className="bg-gray-300 px-3 py-1 rounded">
                    Previous Week
                  </button>
                  <button onClick={() => changeWeek(1)} className="bg-gray-300 px-3 py-1 rounded">
                    Next Week
                  </button>
                </>
              )}

              {viewMode === "monthly" && (
                <>
                  <button onClick={() => changeMonth(-1)} className="bg-gray-300 px-3 py-1 rounded">
                    Previous Month
                  </button>
                  <button onClick={() => changeMonth(1)} className="bg-gray-300 px-3 py-1 rounded">
                    Next Month
                  </button>
                </>
              )}
            </div>

            <table className="w-full border text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Breakfast</th>
                  <th className="border p-2">Lunch</th>
                  <th className="border p-2">Snacks</th>
                  <th className="border p-2">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {(viewMode === "weekly" ? weekDates : monthDates).map(
                  (dateObj, index) => (
                    <tr key={index}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">
                        {dateObj.toLocaleDateString()}
                      </td>

                      {["Breakfast", "Lunch", "Snacks", "Dinner"].map(
                        (meal, i) => (
                          <td key={i} className="border p-2">
                            <img
                              src="/sample-meal.jpg"
                              className="w-20 h-16 mx-auto rounded"
                              alt="meal"
                            />
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className="text-right mt-6">
              <button
                onClick={exportPDF}
                className="bg-blue-900 text-white px-6 py-2 rounded"
              >
                Export PDF
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}