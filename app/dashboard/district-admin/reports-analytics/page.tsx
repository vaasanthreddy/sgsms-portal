"use client";

import { useState, useMemo } from "react";

export default function ReportsAnalytics() {

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [expandedSchool, setExpandedSchool] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMandalAnalytics, setSelectedMandalAnalytics] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // ---------------- SCHOOL DATA ----------------

  const schools = useMemo(() => {
    return Array.from({ length: 300 }, (_, i) => {

      const hasLower = i % 2 === 0;

      const classes = hasLower
        ? ["LKG","UKG","1","2","3","4","5","6","7","8","9","10"]
        : ["6","7","8","9","10"];

      const satisfaction = 60 + (i % 40);
      const compliance = 65 + (i % 30);

      return {
        id: i + 1,
        code: `SCH-${1000 + i}`,
        name: `Government School ${i + 1}`,
        mandal: `Mandal-${(i % 10) + 1}`,
        strength: 400 + (i % 120),
        classes,
        satisfaction,
        compliance,
      };
    });
  }, []);

  // ---------------- FILTERED MAIN TABLE ----------------

  const filteredSchools = schools
    .filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchMandal =
        selectedMandal === "All" || s.mandal === selectedMandal;

      return matchSearch && matchMandal;
    })
    .sort((a, b) => b.satisfaction - a.satisfaction);

  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage);

  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ---------------- STUDENT GENERATOR ----------------

  const generateStudents = (className) => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: `${className}-STU-${i + 1}`,
      name: `Student ${i + 1}`,
      photo: "https://via.placeholder.com/50",
    }));
  };

  // ---------------- MANDAL ANALYTICS ----------------

  const mandalAnalytics = useMemo(() => {

    const grouped = {};

    schools.forEach((s) => {
      if (!grouped[s.mandal]) grouped[s.mandal] = [];
      grouped[s.mandal].push(s.satisfaction);
    });

    return Object.keys(grouped)
      .map((m) => ({
        mandal: m,
        avg:
          grouped[m].reduce((a, b) => a + b, 0) /
          grouped[m].length,
      }))
      .sort((a, b) => b.avg - a.avg);

  }, [schools]);

  const mandalSchools =
    selectedMandalAnalytics &&
    schools
      .filter((s) => s.mandal === selectedMandalAnalytics)
      .sort((a, b) => b.satisfaction - a.satisfaction);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Reports & Analytics
        </h1>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">

        <input
          type="text"
          placeholder="Search School Name / ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={selectedMandal}
          onChange={(e) => setSelectedMandal(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Mandals</option>
          {[...new Set(schools.map((s) => s.mandal))].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <button
          onClick={() =>
            setSelectedDate(
              new Date(
                new Date(selectedDate).setDate(
                  new Date(selectedDate).getDate() - 1
                )
              )
                .toISOString()
                .split("T")[0]
            )
          }
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ◀ Previous
        </button>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={() =>
            setSelectedDate(
              new Date(
                new Date(selectedDate).setDate(
                  new Date(selectedDate).getDate() + 1
                )
              )
                .toISOString()
                .split("T")[0]
            )
          }
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Next ▶
        </button>
      </div>

      {/* MAIN SCHOOL TABLE */}
      <div className="bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
        <table className="min-w-full border border-collapse text-sm">
          <thead className="bg-blue-200">
            <tr>
              <th className="border p-2">S.N.</th>
              <th className="border p-2">Code</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Mandal</th>
              <th className="border p-2">Strength</th>
              <th className="border p-2">Satisfaction %</th>
              <th className="border p-2">Compliance %</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedSchools.map((school, index) => (
              <>
                <tr key={school.id} className="text-center">
                  <td className="border p-2">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="border p-2">{school.code}</td>
                  <td className="border p-2 text-left pl-2">
                    {school.name}
                  </td>
                  <td className="border p-2">{school.mandal}</td>
                  <td className="border p-2">{school.strength}</td>
                  <td className="border p-2 text-green-700 font-bold">
                    {school.satisfaction}%
                  </td>
                  <td className="border p-2 text-blue-700 font-bold">
                    {school.compliance}%
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() =>
                        setExpandedSchool(
                          expandedSchool === school.id ? null : school.id
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View School Report
                    </button>
                  </td>
                </tr>

                {/* EXPAND ROW */}
                {expandedSchool === school.id && (
                  <tr>
                    <td colSpan="8" className="border p-4 bg-gray-50">

                      <div className="mb-4">
                        <label className="mr-2 font-semibold">
                          Select Class:
                        </label>
                        <select
                          value={selectedClass}
                          onChange={(e) =>
                            setSelectedClass(e.target.value)
                          }
                          className="border p-2 rounded"
                        >
                          <option value="">-- Select Class --</option>
                          {school.classes.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      {selectedClass && (
                        <table className="min-w-full border text-sm">
                          <thead className="bg-green-200">
                            <tr>
                              <th className="border p-2">Student ID</th>
                              <th className="border p-2">Name</th>
                              <th className="border p-2">Breakfast</th>
                              <th className="border p-2">Lunch</th>
                              <th className="border p-2">Snacks</th>
                              <th className="border p-2">Dinner</th>
                              <th className="border p-2">PDF</th>
                            </tr>
                          </thead>
                          <tbody>
                            {generateStudents(selectedClass).map((stu) => (
                              <tr key={stu.id} className="text-center">
                                <td className="border p-2">{stu.id}</td>
                                <td className="border p-2">{stu.name}</td>
                                <td className="border p-2">
                                  <img src={stu.photo} />
                                </td>
                                <td className="border p-2">
                                  <img src={stu.photo} />
                                </td>
                                <td className="border p-2">
                                  <img src={stu.photo} />
                                </td>
                                <td className="border p-2">
                                  <img src={stu.photo} />
                                </td>
                                <td className="border p-2">
                                  <button className="bg-purple-600 text-white px-2 py-1 rounded">
                                    View PDF
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* MANDAL ANALYTICS TABLE */}
      <div className="bg-white shadow-xl rounded-xl p-6 mt-10">
        <h2 className="text-xl font-bold text-purple-700 mb-6">
          Mandal Performance Ranking (Healthy Meal Satisfaction)
        </h2>

        <table className="min-w-full border text-sm">
          <thead className="bg-purple-200">
            <tr>
              <th className="border p-2">Rank</th>
              <th className="border p-2">Mandal</th>
              <th className="border p-2">Average Satisfaction %</th>
            </tr>
          </thead>
          <tbody>
            {mandalAnalytics.map((m, i) => (
              <tr
                key={m.mandal}
                onClick={() =>
                  setSelectedMandalAnalytics(m.mandal)
                }
                className="text-center cursor-pointer hover:bg-gray-50"
              >
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{m.mandal}</td>
                <td className="border p-2 text-green-700 font-bold">
                  {m.avg.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MANDAL SCHOOL TABLE */}
      {selectedMandalAnalytics && (
        <div className="bg-white shadow-xl rounded-xl p-6 mt-6">
          <h2 className="text-lg font-bold mb-4">
            Schools in {selectedMandalAnalytics}
          </h2>

          <table className="min-w-full border text-sm">
            <thead className="bg-green-200">
              <tr>
                <th className="border p-2">School</th>
                <th className="border p-2">Satisfaction %</th>
              </tr>
            </thead>
            <tbody>
              {mandalSchools.map((s) => (
                <tr key={s.id} className="text-center">
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2 text-green-700 font-bold">
                    {s.satisfaction}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}