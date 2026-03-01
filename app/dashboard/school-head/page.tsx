"use client";

import { useState } from "react";

export default function SchoolHeadDashboard() {
  return (
    <div className="space-y-6">

      {/* ===== WEEKLY FOOD MENU (EXACT TEACHER STYLE) ===== */}
      <div className="bg-white shadow rounded">

        <div className="bg-green-700 text-white px-4 py-3 font-semibold text-lg">
          WEEKLY FOOD MENU
        </div>

        <div className="p-4">
          <table className="w-full border text-sm">
            <thead>
              <tr>
                <th className="border p-2">Day</th>
                <th className="border p-2">Breakfast</th>
                <th className="border p-2">Lunch</th>
                <th className="border p-2">Snacks</th>
                <th className="border p-2">Dinner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Monday</td>
                <td className="border p-2">Idli, Sambar, Coconut Chutney</td>
                <td className="border p-2">Rice, Dal, Vegetable Curry, Curd</td>
                <td className="border p-2">Banana & Milk</td>
                <td className="border p-2">Chapati, Egg Curry / Veg Kurma</td>
              </tr>
              <tr>
                <td className="border p-2">Tuesday</td>
                <td className="border p-2">Upma, Peanut Chutney</td>
                <td className="border p-2">Sambar Rice, Beans Poriyal, Buttermilk</td>
                <td className="border p-2">Groundnut Chikki</td>
                <td className="border p-2">Vegetable Pulao, Raita</td>
              </tr>
              <tr>
                <td className="border p-2">Wednesday</td>
                <td className="border p-2">Dosa, Tomato Chutney</td>
                <td className="border p-2">Khichdi, Boiled Egg / Sprouts Salad</td>
                <td className="border p-2">Boiled Corn</td>
                <td className="border p-2">Rice, Dal Fry, Cabbage Curry</td>
              </tr>
              <tr>
                <td className="border p-2">Thursday</td>
                <td className="border p-2">Pongal, Sambar</td>
                <td className="border p-2">Rice, Rajma Curry, Carrot Poriyal</td>
                <td className="border p-2">Milk & Biscuit</td>
                <td className="border p-2">Chapati, Mixed Veg Kurma</td>
              </tr>
              <tr>
                <td className="border p-2">Friday</td>
                <td className="border p-2">Bread, Jam, Boiled Egg / Banana</td>
                <td className="border p-2">Vegetable Pulao, Dal, Curd</td>
                <td className="border p-2">Seasonal Fruit</td>
                <td className="border p-2">Rice, Sambar, Potato Fry</td>
              </tr>
              <tr>
                <td className="border p-2">Saturday</td>
                <td className="border p-2">Poha, Chutney</td>
                <td className="border p-2">Rice, Dal Tadka, Beans Curry</td>
                <td className="border p-2">Milk</td>
                <td className="border p-2">Chapati, Sweet Pongal / Kesari</td>
              </tr>
              <tr>
                <td className="border p-2">Sunday</td>
                <td className="border p-2">Poori, Chole</td>
                <td className="border p-2">Chicken Curry / Paneer Curry, Rice</td>
                <td className="border p-2">Fruit Juice</td>
                <td className="border p-2">Vegetable Fried Rice, Curd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SECOND SECTION (UNCHANGED STRUCTURE) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= NOTIFICATIONS (UNCHANGED) ================= */}
        <div className="bg-white shadow rounded">
          <div className="bg-red-600 text-white px-4 py-3 font-semibold text-lg">
            NOTIFICATIONS
          </div>

          <div className="p-4 space-y-4 text-sm">
            <div className="border-b pb-3">
              <p className="font-semibold">Midday Meal Audit</p>
              <p className="text-gray-600">
                Government inspection scheduled on 25th Feb.
              </p>
            </div>

            <div className="border-b pb-3">
              <p className="font-semibold">Monthly Attendance Report</p>
              <p className="text-gray-600">
                Upload attendance report before month end.
              </p>
            </div>

            <div>
              <p className="font-semibold">Scheme Compliance Update</p>
              <p className="text-gray-600">
                Submit compliance verification document.
              </p>
            </div>
          </div>
        </div>

        {/* ================= ONLY CALENDAR UPGRADED ================= */}
        <CalendarSection />

      </div>
    </div>
  );
}


/* ================= ADVANCED CALENDAR (ONLY THIS CHANGED) ================= */

function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [month, setMonth] = useState(1);
  const year = 2026;

  const monthNames = [
    "January","February","March","April",
    "May","June","July","August",
    "September","October","November","December"
  ];

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const events: Record<number, string[]> = {
    5: ["Parent Meeting"],
    25: ["School Inspection"],
    26: ["Government Holiday"],
  };

  return (
    <div className="bg-white shadow rounded">
      <div className="bg-teal-600 text-white px-4 py-3 font-semibold text-lg flex justify-between items-center">
        <span>HOLIDAYS & EVENTS - {monthNames[month]} {year}</span>

        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setMonth(prev => (prev === 0 ? 11 : prev - 1))}
            className="px-2 py-1 bg-white text-teal-700 rounded"
          >
            ◀
          </button>
          <button
            onClick={() => setMonth(prev => (prev === 11 ? 0 : prev + 1))}
            className="px-2 py-1 bg-white text-teal-700 rounded"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-3 text-center text-sm font-semibold mb-3">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3 text-center text-sm">
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const isToday = isCurrentMonth && today.getDate() === day;

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`border rounded py-3 cursor-pointer hover:bg-gray-100 ${
                  isToday ? "bg-green-100 font-bold" : ""
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="font-semibold mb-4">
              Events on {selectedDate} {monthNames[month]} {year}
            </h2>

            {events[selectedDate]?.length ? (
              events[selectedDate].map((event, index) => (
                <div key={index} className="mb-2 text-sm">
                  • {event}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No Events</p>
            )}

            <button
              onClick={() => setSelectedDate(null)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}