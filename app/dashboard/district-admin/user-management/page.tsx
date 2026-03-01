"use client";

import { useState, useEffect, useMemo } from "react";

type SchoolRecord = {
  schoolId: string;
  schoolName: string;
  mandal: string;
  headMaster: string;
  students: number;
  foodReportDate: Date | null;
  lastActive: Date;
};

const mandals = ["North", "South", "East", "West", "Central"];

function generateMockData(): SchoolRecord[] {
  const now = new Date();
  const data: SchoolRecord[] = [];

  for (let i = 1; i <= 300; i++) {
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomFood = Math.random() > 0.3;

    data.push({
      schoolId: `HYD${i.toString().padStart(3, "0")}`,
      schoolName: `Govt School ${i}`,
      mandal: mandals[i % 5],
      headMaster: `Head Master ${i}`,
      students: 200 + (i % 700),
      foodReportDate: randomFood
        ? new Date(now.getTime() - Math.floor(Math.random() * 24) * 60 * 60000)
        : null,
      lastActive: new Date(now.getTime() - randomMinutes * 60000),
    });
  }

  return data;
}

export default function UserManagementPage() {
  const [data] = useState<SchoolRecord[]>(generateMockData());
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());

  const recordsPerPage = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((d) =>
      `${d.schoolId} ${d.schoolName} ${d.mandal} ${d.headMaster}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const getLoginStatus = (lastActive: Date) => {
    const diffMinutes =
      (currentTime.getTime() - lastActive.getTime()) / 60000;

    if (diffMinutes <= 10) return "Active";

    return `Last Active: ${lastActive.toLocaleString()}`;
  };

  const getFoodStatus = (date: Date | null) => {
    if (!date) return "Pending";

    const today = new Date();
    const isToday =
      date.toDateString() === today.toDateString();

    if (isToday) return `Submitted (${date.toLocaleDateString()})`;

    return `Late (${date.toLocaleDateString()})`;
  };

  return (
    <div className="px-6 py-6">

      {/* HEADER */}
      <div className="border-b border-gray-400 pb-3 mb-4">
        <h2 className="text-xl font-semibold">
          Head Masters Registry
        </h2>
        <p className="text-xs mt-1">
          Total Schools: {filteredData.length}
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search School ID / Name / Mandal / Head Master"
          className="border border-gray-400 px-3 py-1 text-xs w-96"
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="border border-gray-500 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200 font-semibold">
              <th className="border px-2 py-1 text-left">School ID</th>
              <th className="border px-2 py-1 text-left">School Name</th>
              <th className="border px-2 py-1 text-left">Mandal</th>
              <th className="border px-2 py-1 text-left">Head Master</th>
              <th className="border px-2 py-1 text-left">Total Students</th>
              <th className="border px-2 py-1 text-left">Daily Food Report</th>
              <th className="border px-2 py-1 text-left">Login Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.schoolId}>
                <td className="border px-2 py-1">{row.schoolId}</td>
                <td className="border px-2 py-1">{row.schoolName}</td>
                <td className="border px-2 py-1">{row.mandal}</td>
                <td className="border px-2 py-1">{row.headMaster}</td>
                <td className="border px-2 py-1">{row.students}</td>
                <td className="border px-2 py-1">
                  {getFoodStatus(row.foodReportDate)}
                </td>
                <td className="border px-2 py-1">
                  {getLoginStatus(row.lastActive)}
                </td>
              </tr>
            ))}
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