"use client";

import { useMemo } from "react";

export default function TeacherHomePage() {

  /* -------------------------
     CALENDAR LOGIC
  --------------------------*/

  const today = new Date();

  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  const { daysArray } = useMemo(() => {
    const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();
    const firstDay = new Date(year, today.getMonth(), 1).getDay();

    const arr: (number | string)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push("");
    for (let i = 1; i <= daysInMonth; i++) arr.push(i);

    return { daysArray: arr };
  }, [today, year]);

  return (
    <div className="space-y-8">

      {/* ================= WEEKLY FOOD MENU ================= */}

      <div className="bg-white shadow-md rounded-lg">
        <div className="bg-green-700 text-white px-6 py-4 rounded-t-lg font-semibold text-lg">
          WEEKLY FOOD MENU
        </div>

        <div className="p-6 overflow-x-auto text-sm">
          <table className="w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Day</th>
                <th className="border p-3">Breakfast</th>
                <th className="border p-3">Lunch</th>
                <th className="border p-3">Snacks</th>
                <th className="border p-3">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Monday","Idli, Sambar, Coconut Chutney","Rice, Dal, Vegetable Curry, Curd","Banana & Milk","Chapati, Egg Curry / Veg Kurma"],
                ["Tuesday","Upma, Peanut Chutney","Sambar Rice, Beans Poriyal, Buttermilk","Groundnut Chikki","Vegetable Pulao, Raita"],
                ["Wednesday","Dosa, Tomato Chutney","Khichdi, Boiled Egg / Sprouts Salad","Boiled Corn","Rice, Dal Fry, Cabbage Curry"],
                ["Thursday","Pongal, Sambar","Rice, Rajma Curry, Carrot Poriyal","Milk & Biscuit","Chapati, Mixed Veg Kurma"],
                ["Friday","Bread, Jam, Boiled Egg / Banana","Vegetable Pulao, Dal, Curd","Seasonal Fruit","Rice, Sambar, Potato Fry"],
                ["Saturday","Poha, Chutney","Rice, Dal Tadka, Beans Curry","Milk","Chapati, Sweet Pongal / Kesari"],
                ["Sunday","Poori, Chole","Chicken Curry / Paneer Curry, Rice","Fruit Juice","Vegetable Fried Rice, Curd"]
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border p-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= STATS + CALENDAR ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Attendance Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Attendance Summary
          </h3>
          <p>Total Students Present: 312</p>
          <p>Meals Served Today: 312</p>
        </div>

        {/* Calendar */}
        <div className="bg-white shadow-md rounded-lg lg:col-span-2">
          <div className="bg-teal-600 text-white px-6 py-4 rounded-t-lg font-semibold">
            HOLIDAYS & EVENTS - {month} {year}
          </div>

          <div className="p-6 grid grid-cols-7 gap-2 text-center text-sm">

            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
              <div key={day} className="font-semibold">
                {day}
              </div>
            ))}

            {daysArray.map((day, index) => (
              <div
                key={index}
                className={`p-2 border rounded ${
                  day === today.getDate() ? "bg-yellow-200" : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}

      <div className="bg-white shadow-md rounded-lg">
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-lg font-semibold">
          NOTIFICATIONS
        </div>

        <div className="p-6 text-sm space-y-3">
          <div>Mid-Day Meal inspection on 25th February.</div>
          <div>District Officer visit next week.</div>
          <div>Nutrition audit submission pending.</div>
        </div>
      </div>

    </div>
  );
}
