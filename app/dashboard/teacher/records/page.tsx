"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

type StudentMeal = {
  name: string;
  breakfast: boolean;
  lunch: boolean;
  snacks: boolean;
  dinner: boolean;
};

export default function RecordsPage() {
  const [selectedDate, setSelectedDate] = useState("2026-02-25");
  const [selectedClass, setSelectedClass] = useState("LKG");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState<StudentMeal[]>([]);
  const totalStudents = 30;

  /* ===============================
     LOAD / GENERATE DATA PER DATE
  =============================== */

  useEffect(() => {
    const key = `${selectedDate}-${selectedClass}-${selectedSection}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      setStudents(JSON.parse(saved));
    } else {
      const newData = Array.from({ length: 10 }, (_, i) => ({
        name: `Student ${i + 1}`,
        breakfast: Math.random() > 0.2,
        lunch: Math.random() > 0.2,
        snacks: Math.random() > 0.2,
        dinner: Math.random() > 0.2,
      }));
      setStudents(newData);
      localStorage.setItem(key, JSON.stringify(newData));
    }
  }, [selectedDate, selectedClass, selectedSection]);

  /* ===============================
     SUMMARY CALCULATIONS
  =============================== */

  const mealSummary = [
    {
      name: "Breakfast",
      menu: "Idli, Sambar",
      count: students.filter((s) => s.breakfast).length,
    },
    {
      name: "Lunch",
      menu: "Rice, Dal",
      count: students.filter((s) => s.lunch).length,
    },
    {
      name: "Snacks",
      menu: "Banana & Milk",
      count: students.filter((s) => s.snacks).length,
    },
    {
      name: "Dinner",
      menu: "Chapati",
      count: students.filter((s) => s.dinner).length,
    },
  ];

  const fullCompletion = students.filter(
    (s) => s.breakfast && s.lunch && s.snacks && s.dinner
  ).length;

  const completionRate = (
    (fullCompletion / totalStudents) *
    100
  ).toFixed(1);

  /* ===============================
     EXPORT TO EXCEL
  =============================== */

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meal Report");
    XLSX.writeFile(
      workbook,
      `Meal_Report_${selectedDate}.xlsx`
    );
  };

  /* ===============================
     PRINT REPORT
  =============================== */

  const printReport = () => {
    window.print();
  };

  /* ===============================
     CHART DATA
  =============================== */

  const chartPercentage =
    (mealSummary[0].count / totalStudents) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      <h1 className="text-2xl font-semibold">
        Daily Meal History Report
      </h1>

      {/* FILTER CONTROLS */}
      <div className="bg-white p-5 border rounded shadow flex flex-wrap gap-6">

        <div>
          <label className="block text-sm font-medium">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Select Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedSection("");
            }}
            className="border p-2 rounded"
          >
            {[
              "LKG","UKG","1","2","3","4","5",
              "6","7","8","9","10"
            ].map((cls) => (
              <option key={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {["6","7","8","9","10"].includes(
          selectedClass
        ) && (
          <div>
            <label className="block text-sm font-medium">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) =>
                setSelectedSection(e.target.value)
              }
              className="border p-2 rounded"
            >
              <option value="">Select</option>
              <option>Sec A</option>
              <option>Sec B</option>
            </select>
          </div>
        )}

        <div className="flex items-end gap-4">
          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export Excel
          </button>

          <button
            onClick={printReport}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Print Report
          </button>
        </div>

      </div>

      {/* MEAL SUMMARY TABLE */}
      <div className="bg-white border rounded shadow">
        <div className="p-4 font-semibold border-b">
          Meal Summary - {selectedDate} | Class {selectedClass} {selectedSection}
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Meal</th>
              <th className="p-3 border">Menu</th>
              <th className="p-3 border">Eligible</th>
              <th className="p-3 border text-green-600">Ate</th>
              <th className="p-3 border text-red-600">Missed</th>
              <th className="p-3 border">%</th>
            </tr>
          </thead>
          <tbody>
            {mealSummary.map((meal, i) => {
              const percentage = (
                (meal.count / totalStudents) * 100
              ).toFixed(1);

              return (
                <tr key={i}>
                  <td className="p-3 border">{meal.name}</td>
                  <td className="p-3 border">{meal.menu}</td>
                  <td className="p-3 border">{totalStudents}</td>
                  <td className="p-3 border text-green-600">{meal.count}</td>
                  <td className="p-3 border text-red-600">
                    {totalStudents - meal.count}
                  </td>
                  <td className="p-3 border">{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SIMPLE INTERACTIVE BAR */}
      <div className="bg-white p-6 border rounded shadow">
        <h3 className="font-semibold mb-3">
          Breakfast Consumption Chart
        </h3>

        <div className="w-full bg-gray-200 h-6 rounded">
          <div
            className="bg-green-600 h-6 rounded"
            style={{ width: `${chartPercentage}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm">
          {chartPercentage.toFixed(1)}% Students Ate Breakfast
        </p>
      </div>

      {/* STUDENT COMPLETION TABLE */}
      <div className="bg-white border rounded shadow">
        <div className="p-4 font-semibold border-b">
          Student Meal Completion
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Student</th>
              <th className="p-3 border">Breakfast</th>
              <th className="p-3 border">Lunch</th>
              <th className="p-3 border">Snacks</th>
              <th className="p-3 border">Dinner</th>
              <th className="p-3 border">4/4 Completed</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const completed =
                s.breakfast &&
                s.lunch &&
                s.snacks &&
                s.dinner;

              return (
                <tr key={i}>
                  <td className="p-3 border">{s.name}</td>
                  <td className="p-3 border text-center">{s.breakfast ? "✔" : "✖"}</td>
                  <td className="p-3 border text-center">{s.lunch ? "✔" : "✖"}</td>
                  <td className="p-3 border text-center">{s.snacks ? "✔" : "✖"}</td>
                  <td className="p-3 border text-center">{s.dinner ? "✔" : "✖"}</td>
                  <td className={`p-3 border font-medium ${completed ? "text-green-600" : "text-red-600"}`}>
                    {completed ? "Yes" : "No"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* COMPLETION SUMMARY */}
      <div className="bg-white border rounded shadow p-6">
        <p>Total Students: {totalStudents}</p>
        <p>Fully Completed: {fullCompletion}</p>
        <p>Completion Rate: {completionRate}%</p>
      </div>

    </div>
  );
}
