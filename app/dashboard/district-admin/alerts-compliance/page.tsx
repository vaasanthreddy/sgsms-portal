"use client";

import { useState, useMemo } from "react";

export default function AlertsCompliance() {

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );
  const [typeFilter, setTypeFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const rowsPerPage = 20;

  // ------------------ DATA ------------------

  const alerts = useMemo(() => {
    const types = ["Financial", "Meal", "Attendance", "Infrastructure"];
    const severities = ["Critical", "High", "Medium", "Low"];
    const statuses = ["Open", "Under Review", "Resolved"];

    return Array.from({ length: 300 }, (_, i) => ({
      id: i + 1,
      alertId: `ALT-${1000 + i}`,
      schoolCode: `SCH-${1000 + (i % 300)}`,
      schoolName: `Government School ${i + 1}`,
      mandal: `Mandal-${(i % 10) + 1}`,
      type: types[i % 4],
      description: "Compliance issue detected in submitted report.",
      severity: severities[i % 4],
      status: statuses[i % 3],
    }));
  }, []);

  // ------------------ FILTER ------------------

  const filteredAlerts = alerts.filter((alert) => {

    const matchesSearch =
      alert.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.schoolCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "All" || alert.type === typeFilter;

    const matchesSeverity =
      severityFilter === "All" || alert.severity === severityFilter;

    const matchesStatus =
      statusFilter === "All" || alert.status === statusFilter;

    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  // ------------------ PAGINATION ------------------

  const totalPages = Math.ceil(filteredAlerts.length / rowsPerPage);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ------------------ SUMMARY ------------------

  const totalAlerts = filteredAlerts.length;
  const criticalAlerts = filteredAlerts.filter(a => a.severity === "Critical").length;
  const pendingCompliance = filteredAlerts.filter(a => a.status !== "Resolved").length;
  const resolvedCases = filteredAlerts.filter(a => a.status === "Resolved").length;

  const resolutionRate =
    totalAlerts === 0 ? 0 :
    Math.round((resolvedCases / totalAlerts) * 100);

  const pendingRate =
    totalAlerts === 0 ? 0 :
    Math.round((pendingCompliance / totalAlerts) * 100);

  // ------------------ UI ------------------

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Alerts & Compliance Dashboard
        </h1>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard title="Total Alerts" value={totalAlerts} color="blue" />
        <SummaryCard title="Critical Alerts" value={criticalAlerts} color="red" />
        <SummaryCard title="Pending Compliance" value={pendingCompliance} color="yellow" />
        <SummaryCard title="Resolved Cases" value={resolvedCases} color="green" />
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />

        <select value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded">
          <option>All</option>
          <option>Financial</option>
          <option>Meal</option>
          <option>Attendance</option>
          <option>Infrastructure</option>
        </select>

        <select value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="border p-2 rounded">
          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded">
          <option>All</option>
          <option>Open</option>
          <option>Under Review</option>
          <option>Resolved</option>
        </select>

        <input
          type="text"
          placeholder="Search School..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
        <table className="min-w-full border border-collapse text-sm">
          <thead className="bg-red-100 sticky top-0">
            <tr>
              <th className="border p-2">S.N.</th>
              <th className="border p-2">Alert ID</th>
              <th className="border p-2">School Code</th>
              <th className="border p-2">School Name</th>
              <th className="border p-2">Mandal</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Severity</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAlerts.map((alert, index) => (
              <tr key={alert.id} className="text-center">
                <td className="border p-2">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="border p-2">{alert.alertId}</td>
                <td className="border p-2">{alert.schoolCode}</td>
                <td className="border p-2 text-left pl-2">
                  {alert.schoolName}
                </td>
                <td className="border p-2">{alert.mandal}</td>
                <td className="border p-2">{alert.type}</td>
                <td className="border p-2">
                  <SeverityBadge severity={alert.severity} />
                </td>
                <td className="border p-2">
                  <StatusBadge status={alert.status} />
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => setSelectedAlert(alert)}
                    className="bg-blue-600 text-white px-3 py-1 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
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

      {/* ===================== ADVANCED ANALYTICS ===================== */}

      {/* SEVERITY DISTRIBUTION */}
      <div className="bg-white shadow-xl rounded-xl p-6 mt-10">
        <h2 className="text-xl font-bold text-purple-700 mb-6">
          Severity Distribution Overview
        </h2>

        {["Critical", "High", "Medium", "Low"].map((level) => {
          const count = alerts.filter(a => a.severity === level).length;
          const percent = Math.round((count / alerts.length) * 100);

          return (
            <div key={level} className="mb-4">
              <div className="flex justify-between text-sm font-medium">
                <span>{level}</span>
                <span>{count} Alerts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                <div
                  className="bg-purple-600 h-3 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TOP 5 SCHOOLS */}
      <div className="bg-white shadow-xl rounded-xl p-6 mt-10 mb-10">
        <h2 className="text-xl font-bold text-red-700 mb-6">
          Top 5 Schools with Highest Alerts
        </h2>

        {Object.entries(
          alerts.reduce((acc, alert) => {
            acc[alert.schoolName] = (acc[alert.schoolName] || 0) + 1;
            return acc;
          }, {})
        )
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([school, count]) => (
            <div key={school} className="flex justify-between border-b py-2">
              <span className="font-medium">{school}</span>
              <span className="text-red-600 font-bold">{count} Alerts</span>
            </div>
          ))}
      </div>

      {/* MODAL */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="font-bold mb-4">Alert Details</h2>
            <p><b>School:</b> {selectedAlert.schoolName}</p>
            <p><b>Type:</b> {selectedAlert.type}</p>
            <p><b>Severity:</b> {selectedAlert.severity}</p>
            <p><b>Status:</b> {selectedAlert.status}</p>
            <p className="mt-2">{selectedAlert.description}</p>

            <button
              onClick={() => setSelectedAlert(null)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* COMPONENTS */

function SummaryCard({ title, value, color }) {
  const colorMap = {
    blue: "text-blue-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="font-semibold">{title}</h2>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>
        {value}
      </p>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const map = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[severity]}`}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    Open: "bg-red-100 text-red-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
      {status}
    </span>
  );
}