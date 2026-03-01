"use client";

import { useState, useMemo } from "react";

export default function Administration() {

  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [newYear, setNewYear] = useState("");
  const [searchSchool, setSearchSchool] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("All");
  const [notification, setNotification] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const [schools, setSchools] = useState(
    Array.from({ length: 300 }, (_, i) => ({
      id: i + 1,
      code: `SCH-${1000 + i}`,
      name: `Government School ${i + 1}`,
      mandal: `Mandal-${(i % 10) + 1}`,
      status: "Active",
    }))
  );

  // ---------------- FILTER ----------------

  const filteredSchools = schools.filter(
    (s) =>
      (s.name.toLowerCase().includes(searchSchool.toLowerCase()) ||
        s.code.toLowerCase().includes(searchSchool.toLowerCase())) &&
      (selectedMandal === "All" || s.mandal === selectedMandal)
  );

  // ---------------- ACTIONS ----------------

  const toggleSchoolStatus = (id: number) => {
    setSchools((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );
  };

  const addSchool = () => {
    const newId = schools.length + 1;
    setSchools([
      ...schools,
      {
        id: newId,
        code: `SCH-${1000 + newId}`,
        name: `New Government School ${newId}`,
        mandal: "Mandal-1",
        status: "Active",
      },
    ]);
  };

  const removeSchool = (id: number) => {
    setSchools((prev) => prev.filter((s) => s.id !== id));
  };

  const transferMandal = (id: number) => {
    setSchools((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              mandal:
                s.mandal === "Mandal-1"
                  ? "Mandal-2"
                  : "Mandal-1",
            }
          : s
      )
    );
  };

  const sendNotification = () => {
    alert("Notification Sent: " + notification);
    setNotification("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Administration Panel
        </h1>
      </div>

      {/* ACADEMIC YEAR */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Academic Year Setup</h2>

        <div className="flex gap-4 items-center flex-wrap">
          <span className="font-semibold">
            Current Year: {academicYear}
          </span>

          <input
            type="text"
            placeholder="Add New Year"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={() => {
              if (newYear) {
                setAcademicYear(newYear);
                setNewYear("");
              }
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Activate Year
          </button>
        </div>
      </div>

      {/* ROLE MANAGEMENT */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Role Management</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {["District Admin", "Mandal Admin", "School Head", "Teacher"].map((role) => (
            <div
              key={role}
              className="border p-4 rounded-xl text-center shadow"
            >
              <p className="font-semibold">{role}</p>
              <button
                onClick={() => setSelectedRole(role)}
                className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
              >
                Manage
              </button>
            </div>
          ))}

        </div>

        {selectedRole && (
          <div className="mt-6 border p-4 rounded bg-gray-50">
            <h3 className="font-bold mb-2">
              Permission Matrix - {selectedRole}
            </h3>
            <ul className="list-disc ml-6 text-sm">
              <li>Access Dashboard</li>
              <li>View Reports</li>
              <li>Approve Data</li>
              <li>Edit Records</li>
            </ul>
          </div>
        )}
      </div>

      {/* NOTIFICATION CONTROL */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">
          System Notification Control
        </h2>

        <input
          type="text"
          placeholder="Enter Notification Message"
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          className="border p-2 rounded mr-4"
        />

        <button
          onClick={sendNotification}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Send Notification
        </button>
      </div>

      {/* SCHOOL CONFIGURATION */}
      <div className="bg-white shadow-xl rounded-xl p-6">

        <h2 className="text-lg font-bold mb-4">
          School Configuration
        </h2>

        <div className="flex gap-4 mb-4 flex-wrap">

          <input
            type="text"
            placeholder="Search School Name / Code"
            value={searchSchool}
            onChange={(e) => setSearchSchool(e.target.value)}
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
            onClick={addSchool}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add School
          </button>

        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-blue-200">
              <tr>
                <th className="border p-2">S.N.</th>
                <th className="border p-2">Code</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Mandal</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSchools.map((school, index) => (
                <tr key={school.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{school.code}</td>
                  <td className="border p-2 text-left pl-2">
                    {school.name}
                  </td>
                  <td className="border p-2">{school.mandal}</td>
                  <td
                    className={`border p-2 font-bold ${
                      school.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {school.status}
                  </td>
                  <td className="border p-2 flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => toggleSchoolStatus(school.id)}
                      className="bg-purple-600 text-white px-2 py-1 rounded"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => transferMandal(school.id)}
                      className="bg-yellow-600 text-white px-2 py-1 rounded"
                    >
                      Transfer
                    </button>

                    <button
                      onClick={() => removeSchool(school.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}