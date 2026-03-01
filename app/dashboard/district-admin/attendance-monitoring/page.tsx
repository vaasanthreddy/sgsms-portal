"use client";

import { useState, useMemo } from "react";

type AttendanceRecord = {
  schoolId: string;
  schoolName: string;
  mandal: string;
  totalStudents: number;
  present: number;
};

const mandals = ["North", "South", "East", "West", "Central"];

function generateAttendanceData() {
  const data: AttendanceRecord[] = [];

  for (let i = 1; i <= 300; i++) {
    const total = 300 + (i % 500);
    const present = Math.floor(total * (0.6 + Math.random() * 0.4));

    data.push({
      schoolId: `HYD${i.toString().padStart(3, "0")}`,
      schoolName: `Govt School ${i}`,
      mandal: mandals[i % 5],
      totalStudents: total,
      present,
    });
  }

  return data;
}

export default function AttendanceMonitoringPage() {
  const [data] = useState(generateAttendanceData());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const recordsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter((d) =>
      d.schoolId.toLowerCase().includes(search.toLowerCase()) ||
      d.schoolName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const getStatus = (percentage: number) => {
    if (percentage >= 85) return "Good";
    if (percentage >= 70) return "Warning";
    return "Critical";
  };

  const districtSummary = useMemo(() => {
    const totalStudents = data.reduce((a, b) => a + b.totalStudents, 0);
    const totalPresent = data.reduce((a, b) => a + b.present, 0);
    const avg = ((totalPresent / totalStudents) * 100).toFixed(2);

    const criticalCount = data.filter(
      (d) => (d.present / d.totalStudents) * 100 < 70
    ).length;

    const highCount = data.filter(
      (d) => (d.present / d.totalStudents) * 100 >= 90
    ).length;

    return {
      totalStudents,
      totalPresent,
      avg,
      criticalCount,
      highCount,
    };
  }, [data]);

  const mandalSummary = useMemo(() => {
    return mandals.map((m) => {
      const filtered = data.filter((d) => d.mandal === m);
      const avg =
        filtered.reduce(
          (acc, curr) =>
            acc + (curr.present / curr.totalStudents) * 100,
          0
        ) / filtered.length;

      return {
        mandal: m,
        schools: filtered.length,
        average: avg.toFixed(2),
      };
    });
  }, [data]);

  const criticalSchools = useMemo(() => {
    return data
      .filter((d) => (d.present / d.totalStudents) * 100 < 70)
      .sort(
        (a, b) =>
          a.present / a.totalStudents -
          b.present / b.totalStudents
      )
      .slice(0, 5);
  }, [data]);

  return (
    <div className="px-6 py-6">

      {/* HEADER */}
      <div className="border-b border-gray-400 pb-3 mb-4">
        <h2 className="text-xl font-semibold">
          Attendance Monitoring
        </h2>
        <p className="text-xs mt-1">
          Total Schools: {filteredData.length}
        </p>
      </div>

      {/* DATE SELECTOR */}
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-400 px-3 py-1 text-xs"
        />
      </div>

      {/* DISTRICT SUMMARY */}
      <div className="border border-gray-600 mb-4 p-3 text-xs bg-gray-50">
        <div className="flex flex-wrap gap-6">
          <div>Total Students: <strong>{districtSummary.totalStudents}</strong></div>
          <div>Total Present: <strong>{districtSummary.totalPresent}</strong></div>
          <div>District Avg: <strong>{districtSummary.avg}%</strong></div>
          <div>Schools &lt; 70%: <strong className="text-red-700">{districtSummary.criticalCount}</strong></div>
          <div>Schools ≥ 90%: <strong className="text-green-700">{districtSummary.highCount}</strong></div>
        </div>
      </div>

      {/* MANDAL SUMMARY */}
      <div className="border border-gray-500 mb-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200 font-semibold">
              <th className="border px-2 py-1 text-left">Mandal</th>
              <th className="border px-2 py-1 text-left">Total Schools</th>
              <th className="border px-2 py-1 text-left">Average Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {mandalSummary.map((m) => (
              <tr key={m.mandal}>
                <td className="border px-2 py-1">{m.mandal}</td>
                <td className="border px-2 py-1">{m.schools}</td>
                <td className="border px-2 py-1">{m.average}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CRITICAL SCHOOLS */}
      <div className="border border-red-500 mb-4">
        <div className="bg-red-100 px-2 py-1 text-xs font-semibold">
          Schools Below 70% Attendance
        </div>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1 text-left">School</th>
              <th className="border px-2 py-1 text-left">Mandal</th>
              <th className="border px-2 py-1 text-left">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {criticalSchools.map((d) => (
              <tr key={d.schoolId}>
                <td className="border px-2 py-1">{d.schoolName}</td>
                <td className="border px-2 py-1">{d.mandal}</td>
                <td className="border px-2 py-1 text-red-700">
                  {((d.present / d.totalStudents) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SEARCH ABOVE MAIN TABLE */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search School ID or School Name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-400 px-3 py-1 text-xs w-80"
        />
      </div>

      {/* MAIN SCHOOL TABLE */}
      <div className="border border-gray-500 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200 font-semibold">
              <th className="border px-2 py-1 text-left">School ID</th>
              <th className="border px-2 py-1 text-left">School Name</th>
              <th className="border px-2 py-1 text-left">Mandal</th>
              <th className="border px-2 py-1 text-left">Total Students</th>
              <th className="border px-2 py-1 text-left">Present</th>
              <th className="border px-2 py-1 text-left">Absent</th>
              <th className="border px-2 py-1 text-left">Attendance %</th>
              <th className="border px-2 py-1 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row) => {
              const percentage =
                (row.present / row.totalStudents) * 100;

              const invalid =
                row.present > row.totalStudents ||
                row.totalStudents === 0;

              const status = getStatus(percentage);

              return (
                <tr key={row.schoolId}>
                  <td className="border px-2 py-1">{row.schoolId}</td>
                  <td className="border px-2 py-1">{row.schoolName}</td>
                  <td className="border px-2 py-1">{row.mandal}</td>
                  <td className="border px-2 py-1">{row.totalStudents}</td>
                  <td className="border px-2 py-1">{row.present}</td>
                  <td className="border px-2 py-1">{row.totalStudents - row.present}</td>
                  <td className="border px-2 py-1">{percentage.toFixed(2)}%</td>
                  <td className={`border px-2 py-1 ${
                      invalid
                        ? "text-purple-700"
                        : status === "Good"
                        ? "text-green-700"
                        : status === "Warning"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }`}>
                    {invalid ? "Data Error" : status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-3 py-2 text-xs border-t border-gray-400 bg-gray-100">
          <span>
            Page {currentPage} of {totalPages}
          </span>

          <div className="space-x-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="border px-2 py-1 bg-white disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`border px-2 py-1 ${
                  currentPage === i + 1
                    ? "bg-blue-900 text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="border px-2 py-1 bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}