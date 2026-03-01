"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DistrictMealMonitoring() {

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [role, setRole] = useState("District");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [mandalFilter, setMandalFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 20;

  // 🔹 Generate 300 Schools
  const schools = useMemo(() => {
    return Array.from({ length: 300 }, (_, i) => {
      const totalStrength = 300 + (i % 150);
      const breakfast = 250 + (i % 30);
      const lunch = 270 + (i % 40);
      const snacks = 200 + (i % 20);
      const dinner = 150 + (i % 25);

      return {
        id: i + 1,
        code: `SCH-${1000 + i}`,
        name: `Government School ${i + 1}`,
        mandal: `Mandal-${(i % 10) + 1}`,
        totalStrength,
        meals: { breakfast, lunch, snacks, dinner },
        pdfSubmitted: i % 3 === 0,
      };
    });
  }, []);

  // 🔹 Role Restriction
  const roleFilteredSchools = schools.filter((school) => {
    if (role === "District") return true;
    if (role === "Mandal") return school.mandal === "Mandal-1";
    if (role === "School") return school.id === 1;
    return true;
  });

  // 🔹 Search + Filter + Mandal Filter
  const filteredSchools = roleFilteredSchools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All"
        ? true
        : filterStatus === "Verified"
        ? school.pdfSubmitted
        : !school.pdfSubmitted;

    const matchesMandal =
      mandalFilter === "All"
        ? true
        : school.mandal === mandalFilter;

    return matchesSearch && matchesStatus && matchesMandal;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage);
  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // 🔹 Summary Analytics
  const totalVerified = filteredSchools.filter(s => s.pdfSubmitted).length;
  const totalPending = filteredSchools.length - totalVerified;

  // 🔹 Generate Single School PDF
  const generatePDF = (school) => {
    const doc = new jsPDF();
    doc.text("School Meal Monitoring Report", 14, 15);
    doc.text(`School: ${school.name}`, 14, 25);
    doc.text(`School Code: ${school.code}`, 14, 32);
    doc.text(`Mandal: ${school.mandal}`, 14, 39);
    doc.text(`Date: ${selectedDate}`, 14, 46);

    autoTable(doc, {
      startY: 55,
      head: [["Meal Type", "Count"]],
      body: [
        ["Breakfast", school.meals.breakfast],
        ["Lunch", school.meals.lunch],
        ["Snacks", school.meals.snacks],
        ["Dinner", school.meals.dinner],
      ],
    });

    doc.save(`${school.code}_Meal_Report.pdf`);
  };

  // 🔹 Download All Verified PDFs
  const downloadAllVerified = () => {
    filteredSchools
      .filter((s) => s.pdfSubmitted)
      .forEach((school) => generatePDF(school));
  };

  // 🔹 Export CSV
  const exportCSV = () => {
    const header = "Code,Name,Mandal,Strength,Status\n";
    const rows = filteredSchools.map(
      (s) =>
        `${s.code},${s.name},${s.mandal},${s.totalStrength},${
          s.pdfSubmitted ? "Verified" : "Pending"
        }`
    );
    const blob = new Blob([header + rows.join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "district_meal_data.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          District Meal Monitoring Dashboard
        </h1>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="font-semibold">Verified Schools</h2>
          <p className="text-2xl text-green-600 font-bold">{totalVerified}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="font-semibold">Pending Schools</h2>
          <p className="text-2xl text-yellow-600 font-bold">{totalPending}</p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          ◀ Previous Week
        </button>

        <button
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Next Week ▶
        </button>

        <button
          onClick={() => setMonthOffset(monthOffset - 1)}
          className="bg-purple-500 text-white px-3 py-2 rounded"
        >
          ◀ Previous Month
        </button>

        <button
          onClick={() => setMonthOffset(monthOffset + 1)}
          className="bg-purple-500 text-white px-3 py-2 rounded"
        >
          Next Month ▶
        </button>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option>District</option>
          <option>Mandal</option>
          <option>School</option>
        </select>

        <select
          value={mandalFilter}
          onChange={(e) => setMandalFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All</option>
          {[...new Set(schools.map(s => s.mandal))].map(m => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search School..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All</option>
          <option>Verified</option>
          <option>Pending</option>
        </select>

        <button
          onClick={downloadAllVerified}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Download All Verified PDFs
        </button>

        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* TABLE (same as before, unchanged) */}
      <div className="bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
        <table className="min-w-full border border-collapse">
          <thead className="bg-green-200">
            <tr>
              <th className="border p-2">S.N.</th>
              <th className="border p-2">School Code</th>
              <th className="border p-2">School Name</th>
              <th className="border p-2">Mandal</th>
              <th className="border p-2">Total Strength</th>
              <th className="border p-2">Meals Breakdown</th>
              <th className="border p-2">Approved PDF</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedSchools.map((school, index) => (
              <tr key={school.id} className="text-center text-sm">
                <td className="border p-2">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="border p-2">{school.code}</td>
                <td className="border p-2 text-left pl-2">{school.name}</td>
                <td className="border p-2">{school.mandal}</td>
                <td className="border p-2">{school.totalStrength}</td>
                <td className="border p-2 text-left pl-3">
                  <div>Breakfast: {school.meals.breakfast}</div>
                  <div>Lunch: {school.meals.lunch}</div>
                  <div>Snacks: {school.meals.snacks}</div>
                  <div>Dinner: {school.meals.dinner}</div>
                </td>
                <td className="border p-2">
                  {school.pdfSubmitted ? (
                    <button
                      onClick={() => generatePDF(school)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View PDF
                    </button>
                  ) : (
                    <span className="text-red-500">Not Submitted</span>
                  )}
                </td>
                <td className="border p-2">
                  {school.pdfSubmitted ? (
                    <span className="text-green-600 font-bold">✔ Verified</span>
                  ) : (
                    <span className="text-yellow-600 font-bold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}