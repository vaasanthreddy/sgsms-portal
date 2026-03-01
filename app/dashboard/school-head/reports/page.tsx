"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [view, setView] = useState("weekly");
  const [selectedClass, setSelectedClass] = useState("6th-A");
  const [selectedDate, setSelectedDate] = useState("");
  const [summaryDate, setSummaryDate] = useState("");

  /* ================= ADDED DAILY MEALS STATES ================= */

  const [dailyMode, setDailyMode] = useState("weekly");
  const [dailyDate, setDailyDate] = useState("");
  const [dailyMonth, setDailyMonth] = useState("");

  const weeklyMenuItems = {
    breakfast: 4,
    lunch: 3,
    snacks: 2,
    dinner: 3,
  };

  /* ============================================================= */

  const classes = [
    "LKG","UKG","1st","2nd","3rd",
    "4th","5th","6th-A","7th-A",
    "8th-A","9th-A","10th-A"
  ];

  const generateStudents = (cls: string) => {
    const list = [];
    for (let i = 1; i <= 10; i++) {
      list.push({
        name: `${cls} Student ${i}`,
      });
    }
    return list;
  };

  const students = generateStudents(selectedClass);

  const getWeekDates = (dateStr: string) => {
    if (!dateStr) return [];

    const date = new Date(dateStr);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));

    const week = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d.toLocaleDateString());
    }
    return week;
  };

  /* ================= DAILY FULL WEEK (7 DAYS) ================= */

  const getFullWeekDates = (dateStr: string) => {
    if (!dateStr) return [];
    const date = new Date(dateStr);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));

    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d.toLocaleDateString());
    }
    return week;
  };

  const getFullMonthDates = (monthStr: string) => {
    if (!monthStr) return [];
    const [year, month] = monthStr.split("-");
    const totalDays = new Date(Number(year), Number(month), 0).getDate();
    const dates = [];
    for (let i = 1; i <= totalDays; i++) {
      dates.push(`${i}/${month}/${year}`);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedDate);
  const summaryWeekDates = getWeekDates(summaryDate);

  const randomStatus = () => Math.random() > 0.2 ? "P" : "A";

  const changeSummaryWeek = (direction: number) => {
    if (!summaryDate) return;
    const date = new Date(summaryDate);
    date.setDate(date.getDate() + direction * 7);
    setSummaryDate(date.toISOString().split("T")[0]);
  };

  /* ================= DAILY NAVIGATION ================= */

  const changeDailyWeek = (dir: number) => {
    if (!dailyDate) return;
    const d = new Date(dailyDate);
    d.setDate(d.getDate() + dir * 7);
    setDailyDate(d.toISOString().split("T")[0]);
  };

  const changeDailyMonth = (dir: number) => {
    if (!dailyMonth) return;
    const [year, month] = dailyMonth.split("-");
    const d = new Date(Number(year), Number(month) - 1);
    d.setMonth(d.getMonth() + dir);
    setDailyMonth(d.toISOString().slice(0, 7));
  };

  const exportDailyMeals = () => {
    const dates =
      dailyMode === "weekly"
        ? getFullWeekDates(dailyDate)
        : getFullMonthDates(dailyMonth);

    let csv = "Date,Breakfast,Lunch,Snacks,Dinner\n";

    dates.forEach((date) => {
      csv += `${date},${weeklyMenuItems.breakfast},${weeklyMenuItems.lunch},${weeklyMenuItems.snacks},${weeklyMenuItems.dinner}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "daily_meals.csv";
    a.click();
  };

  const exportExcel = () => {
    let csv = "Student Name," + weekDates.join(",") + "\n";

    students.forEach((student) => {
      const row =
        student.name +
        "," +
        weekDates.map(() => randomStatus()).join(",");
      csv += row + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weekly_report.csv";
    a.click();
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">

      {/* ================= YOUR ORIGINAL CODE START ================= */}

      {/* FILTER SECTION */}
      <div className="bg-white shadow rounded p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Meal Attendance Reports
        </h2>

        <div className="flex gap-4 flex-wrap">

          <button
            onClick={() => setView("weekly")}
            className={`px-4 py-2 rounded ${
              view === "weekly"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            Weekly
          </button>

          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-2 rounded ${
              view === "monthly"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            Monthly
          </button>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            {classes.map((cls) => (
              <option key={cls}>{cls}</option>
            ))}
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-4 py-2 rounded"
          />

          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export Excel
          </button>

          <button
            onClick={exportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* WEEKLY VIEW */}
      {view === "weekly" && selectedDate && (
        <div className="bg-white shadow rounded p-6">

          <h3 className="font-semibold mb-4">
            Class: {selectedClass} | Weekly Report
          </h3>

          <div className="overflow-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Student</th>
                  <th className="border p-2">Attendance %</th>

                  {weekDates.map((date, index) => (
                    <th key={index} className="border p-2 text-center">
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {students.map((student, i) => {
                  const weeklyStatuses = weekDates.map(() => randomStatus());
                  const presentCount = weeklyStatuses.filter(s => s === "P").length;
                  const percent = ((presentCount / weekDates.length) * 100).toFixed(0);

                  return (
                    <tr key={i}>
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2">{student.name}</td>
                      <td className="border p-2 text-center font-semibold">
                        {percent}%
                      </td>

                      {weeklyStatuses.map((status, idx) => (
                        <td key={idx} className="border p-2 text-center">
                          {status === "P" ? (
                            <div className="grid grid-cols-2 gap-1">
                              <img src="/meal.jpg" className="w-10 h-10 rounded"/>
                              <img src="/meal.jpg" className="w-10 h-10 rounded"/>
                              <img src="/meal.jpg" className="w-10 h-10 rounded"/>
                              <img src="/meal.jpg" className="w-10 h-10 rounded"/>
                            </div>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              Absent
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHOOL WIDE SUMMARY */}
      <div className="bg-white shadow rounded p-6 mt-8">

        <h3 className="text-lg font-semibold mb-4">
          School Wide Weekly Meal Summary
        </h3>

        <div className="flex gap-4 mb-4 flex-wrap">
          <input
            type="date"
            value={summaryDate}
            onChange={(e) => setSummaryDate(e.target.value)}
            className="border px-4 py-2 rounded"
          />

          <button
            onClick={() => changeSummaryWeek(-1)}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            ◀ Previous Week
          </button>

          <button
            onClick={() => changeSummaryWeek(1)}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Next Week ▶
          </button>
        </div>

        {summaryDate && (
          <div className="overflow-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Total Strength</th>

                  {summaryWeekDates.map((date, index) => (
                    <th key={index} className="border p-2 text-center">
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {classes.map((cls, i) => {
                  const strength = 35 + (i % 10);
                  return (
                    <tr key={cls}>
                      <td className="border p-2 font-medium">{cls}</td>
                      <td className="border p-2 text-center">{strength}</td>

                      {summaryWeekDates.map((_, idx) => (
                        <td key={idx} className="border p-2 text-xs">
                          <div>Breakfast - {20 + (idx % 5)}</div>
                          <div>Lunch - {19 + (idx % 5)}</div>
                          <div>Snacks - {18 + (idx % 5)}</div>
                          <div>Dinner - {21 + (idx % 5)}</div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= DAILY MEALS SECTION ADDED ================= */}

      <div className="bg-white shadow rounded p-6 mt-8">

        <h3 className="text-lg font-semibold mb-4">
          Daily Meals Report
        </h3>

        <div className="flex gap-4 flex-wrap mb-4">

          <button
            onClick={() => setDailyMode("weekly")}
            className={`px-4 py-2 rounded ${
              dailyMode === "weekly" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Weekly
          </button>

          <button
            onClick={() => setDailyMode("monthly")}
            className={`px-4 py-2 rounded ${
              dailyMode === "monthly" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Monthly
          </button>

          {dailyMode === "weekly" && (
            <>
              <input
                type="date"
                value={dailyDate}
                onChange={(e) => setDailyDate(e.target.value)}
                className="border px-4 py-2 rounded"
              />
              <button onClick={() => changeDailyWeek(-1)} className="bg-gray-600 text-white px-3 py-2 rounded">◀</button>
              <button onClick={() => changeDailyWeek(1)} className="bg-gray-600 text-white px-3 py-2 rounded">▶</button>
            </>
          )}

          {dailyMode === "monthly" && (
            <>
              <input
                type="month"
                value={dailyMonth}
                onChange={(e) => setDailyMonth(e.target.value)}
                className="border px-4 py-2 rounded"
              />
              <button onClick={() => changeDailyMonth(-1)} className="bg-gray-600 text-white px-3 py-2 rounded">◀</button>
              <button onClick={() => changeDailyMonth(1)} className="bg-gray-600 text-white px-3 py-2 rounded">▶</button>
            </>
          )}

          <button
            onClick={exportDailyMeals}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export
          </button>

        </div>

        <div className="overflow-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Breakfast</th>
                <th className="border p-2">Lunch</th>
                <th className="border p-2">Snacks</th>
                <th className="border p-2">Dinner</th>
              </tr>
            </thead>

            <tbody>
              {(dailyMode === "weekly"
                ? getFullWeekDates(dailyDate)
                : getFullMonthDates(dailyMonth)
              ).map((date, index) => (
                <tr key={index}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{date}</td>

                  {(["breakfast", "lunch", "snacks", "dinner"] as const).map((meal) => (
  <td key={meal} className="border p-2">
    <div className="grid grid-cols-2 gap-1">
      {Array.from({
        length: weeklyMenuItems[meal]
      }).map((_, i) => (
        <img
          key={i}
          src="/meal.jpg"
          className="w-14 h-14 rounded object-cover"
        />
      ))}
    </div>
  </td>
))}

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}