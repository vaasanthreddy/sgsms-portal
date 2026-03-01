"use client";

import { useState } from "react";

export default function ParentDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("February 2026");

  const todayMeals = [
    { name: "Breakfast", image: "/meals/breakfast.jpg" },
    { name: "Lunch", image: "/meals/lunch.jpg" },
    { name: "Snacks", image: "/meals/snacks.jpg" },
    { name: "Dinner", image: "/meals/dinner.jpg" },
  ];

  const notifications = [
    "Tomorrow is declared as School Holiday.",
    "Parent-Teacher Meeting on 10th February.",
    "Milk supply added to breakfast menu from next week.",
  ];

  const holidays = [5, 16, 26];
  const events = [10, 21];

  const daysInMonth = 28;

  return (
    <div className="space-y-8">

      {/* ================= TODAY MEALS ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          Today's Meals
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {todayMeals.map((meal, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 text-center hover:shadow-md transition"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 font-semibold text-gray-700">
                {meal.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= WEEKLY FOOD MENU (EXACT STYLE) ================= */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="bg-green-700 text-white px-6 py-3 font-bold text-lg">
          WEEKLY FOOD MENU
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full border text-sm text-center">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border p-3">Day</th>
                <th className="border p-3">Breakfast</th>
                <th className="border p-3">Lunch</th>
                <th className="border p-3">Snacks</th>
                <th className="border p-3">Dinner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">Monday</td>
                <td className="border p-3">Idli, Sambar, Coconut Chutney</td>
                <td className="border p-3">Rice, Dal, Vegetable Curry, Curd</td>
                <td className="border p-3">Banana & Milk</td>
                <td className="border p-3">Chapati, Egg Curry / Veg Kurma</td>
              </tr>
              <tr>
                <td className="border p-3">Tuesday</td>
                <td className="border p-3">Upma, Peanut Chutney</td>
                <td className="border p-3">Sambar Rice, Beans Poriyal, Buttermilk</td>
                <td className="border p-3">Groundnut Chikki</td>
                <td className="border p-3">Vegetable Pulao, Raita</td>
              </tr>
              <tr>
                <td className="border p-3">Wednesday</td>
                <td className="border p-3">Dosa, Tomato Chutney</td>
                <td className="border p-3">Khichdi, Boiled Egg / Sprouts Salad</td>
                <td className="border p-3">Boiled Corn</td>
                <td className="border p-3">Rice, Dal Fry, Cabbage Curry</td>
              </tr>
              <tr>
                <td className="border p-3">Thursday</td>
                <td className="border p-3">Pongal, Sambar</td>
                <td className="border p-3">Rice, Rajma Curry, Carrot Poriyal</td>
                <td className="border p-3">Milk & Biscuit</td>
                <td className="border p-3">Chapati, Mixed Veg Kurma</td>
              </tr>
              <tr>
                <td className="border p-3">Friday</td>
                <td className="border p-3">Bread, Jam, Boiled Egg / Banana</td>
                <td className="border p-3">Vegetable Pulao, Dal, Curd</td>
                <td className="border p-3">Seasonal Fruit</td>
                <td className="border p-3">Rice, Sambar, Potato Fry</td>
              </tr>
              <tr>
                <td className="border p-3">Saturday</td>
                <td className="border p-3">Poha, Chutney</td>
                <td className="border p-3">Rice, Dal Tadka, Beans Curry</td>
                <td className="border p-3">Milk</td>
                <td className="border p-3">Chapati, Sweet Pongal / Kesari</td>
              </tr>
              <tr>
                <td className="border p-3">Sunday</td>
                <td className="border p-3">Poori, Chole</td>
                <td className="border p-3">Chicken Curry / Paneer Curry, Rice</td>
                <td className="border p-3">Fruit Juice</td>
                <td className="border p-3">Vegetable Fried Rice, Curd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= NOTIFICATIONS + CALENDAR ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            Notifications
          </h2>
          <ul className="space-y-3 text-sm">
            {notifications.map((note, index) => (
              <li key={index} className="bg-blue-50 p-3 rounded border">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Holidays & Events Calendar */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-teal-700 text-white px-6 py-3 font-bold">
            HOLIDAYS & EVENTS - {selectedMonth}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-3">
              <div>Sun</div><div>Mon</div><div>Tue</div>
              <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isHoliday = holidays.includes(day);
                const isEvent = events.includes(day);

                return (
                  <div
                    key={day}
                    className={`p-3 rounded border
                      ${isHoliday ? "bg-red-200 text-red-800" : ""}
                      ${isEvent ? "bg-yellow-200 text-yellow-800" : ""}
                      ${!isHoliday && !isEvent ? "bg-gray-50" : ""}
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 border"></div>
                Holiday
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 border"></div>
                Event
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}