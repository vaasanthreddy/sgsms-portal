"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function FundManagement() {

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [role, setRole] = useState("District");
  const [mandalFilter, setMandalFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionSchool, setTransactionSchool] = useState(null);

  const rowsPerPage = 20;

  // 🔹 300 Schools Data
  const schools = useMemo(() => {
    return Array.from({ length: 300 }, (_, i) => {
      const allocated = 100000 + i * 1000;
      const released = allocated - (i % 20000);
      const utilized = released - (i % 15000);
      const balance = released - utilized;
      const utilizationPercent = ((utilized / released) * 100).toFixed(1);

      return {
        id: i + 1,
        code: `SCH-${1000 + i}`,
        name: `Government School ${i + 1}`,
        mandal: `Mandal-${(i % 10) + 1}`,
        strength: 300 + (i % 150),
        allocated,
        released,
        utilized,
        balance,
        utilizationPercent,
      };
    });
  }, []);

  // 🔹 Role Filter
  const roleFiltered = schools.filter((school) => {
    if (role === "District") return true;
    if (role === "Mandal") return school.mandal === "Mandal-1";
    if (role === "School") return school.id === 1;
    return true;
  });

  // 🔹 Filters
  const filteredSchools = roleFiltered.filter((school) => {

    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMandal =
      mandalFilter === "All" || school.mandal === mandalFilter;

    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Over Utilized"
        ? school.utilizationPercent > 100
        : statusFilter === "Under Utilized"
        ? school.utilizationPercent < 50
        : school.utilizationPercent >= 50 &&
          school.utilizationPercent <= 100;

    return matchesSearch && matchesMandal && matchesStatus;
  });

  // 🔹 Pagination (Same Style As Before)
  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage);
  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // 🔹 Summary
  const totalAllocated = filteredSchools.reduce((sum, s) => sum + s.allocated, 0);
  const totalReleased = filteredSchools.reduce((sum, s) => sum + s.released, 0);
  const totalUtilized = filteredSchools.reduce((sum, s) => sum + s.utilized, 0);
  const totalBalance = filteredSchools.reduce((sum, s) => sum + s.balance, 0);

  // 🔹 PDF
  const generatePDF = (school) => {
    const doc = new jsPDF();
    doc.text("Fund Management Report", 14, 15);
    doc.text(`School: ${school.name}`, 14, 25);
    doc.text(`Financial Year: ${financialYear}`, 14, 32);

    autoTable(doc, {
      startY: 40,
      head: [["Field", "Amount"]],
      body: [
        ["Allocated", school.allocated],
        ["Released", school.released],
        ["Utilized", school.utilized],
        ["Balance", school.balance],
        ["Utilization %", school.utilizationPercent + "%"],
      ],
    });

    doc.save(`${school.code}_Fund_Report.pdf`);
  };

  const downloadAllReports = () => {
    filteredSchools.forEach((school) => generatePDF(school));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          District Fund Management Dashboard
        </h1>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <Card title="Allocated" value={totalAllocated} />
        <Card title="Released" value={totalReleased} />
        <Card title="Utilized" value={totalUtilized} />
        <Card title="Balance" value={totalBalance} />
      </div>

      {/* CONTROLS (UNCHANGED) */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">

        <input type="date" value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded" />

        <select value={financialYear}
          onChange={(e) => setFinancialYear(e.target.value)}
          className="border p-2 rounded">
          <option>2024-2025</option>
          <option>2025-2026</option>
        </select>

        <select value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded">
          <option>District</option>
          <option>Mandal</option>
          <option>School</option>
        </select>

        <select value={mandalFilter}
          onChange={(e) => setMandalFilter(e.target.value)}
          className="border p-2 rounded">
          <option>All</option>
          {[...new Set(schools.map(s => s.mandal))].map(m => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded">
          <option>All</option>
          <option>Over Utilized</option>
          <option>Normal</option>
          <option>Under Utilized</option>
        </select>

        <input type="text"
          placeholder="Search School..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded" />

        <button onClick={downloadAllReports}
          className="bg-purple-600 text-white px-4 py-2 rounded">
          Download All Reports
        </button>
      </div>

      {/* TABLE (UNCHANGED STRUCTURE) */}
      <div className="bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
        <table className="min-w-full border border-collapse text-sm">
          <thead className="bg-blue-200 sticky top-0">
            <tr>
              <th className="border p-2">S.N.</th>
              <th className="border p-2">Code</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Mandal</th>
              <th className="border p-2">Allocated</th>
              <th className="border p-2">Released</th>
              <th className="border p-2">Utilized</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2">Utilization %</th>
              <th className="border p-2">Transactions</th>
              <th className="border p-2">PDF</th>
            </tr>
          </thead>

          <tbody>
            {paginatedSchools.map((school, index) => (
              <tr key={school.id} className="text-center">
                <td className="border p-2">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="border p-2">{school.code}</td>
                <td className="border p-2 text-left pl-2">
                  {school.name}
                </td>
                <td className="border p-2">{school.mandal}</td>
                <td className="border p-2">₹ {school.allocated.toLocaleString()}</td>
                <td className="border p-2">₹ {school.released.toLocaleString()}</td>
                <td className="border p-2">₹ {school.utilized.toLocaleString()}</td>
                <td className="border p-2">₹ {school.balance.toLocaleString()}</td>
                <td className="border p-2">{school.utilizationPercent}%</td>
                <td className="border p-2">
                  <button
                    onClick={() => setTransactionSchool(school)}
                    className="bg-gray-600 text-white px-2 py-1 rounded">
                    View
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => generatePDF(school)}
                    className="bg-blue-600 text-white px-3 py-1 rounded">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SAME PAGINATION STYLE AS BEFORE */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50">
            Prev
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-2xl font-bold text-blue-600">
        ₹ {value.toLocaleString()}
      </p>
    </div>
  );
}