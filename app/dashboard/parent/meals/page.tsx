"use client";

import { useState } from "react";
import Image from "next/image";

export default function MealReportPage() {
  const [week, setWeek] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  const weeklyMenu: any = {
    Monday: {
      Breakfast: "Idli, Sambar, Coconut Chutney",
      Lunch: "Rice, Dal, Vegetable Curry, Curd",
      Snacks: "Banana & Milk",
      Dinner: "Chapati, Egg Curry / Veg Kurma",
    },
    Tuesday: {
      Breakfast: "Upma, Peanut Chutney",
      Lunch: "Sambar Rice, Beans Poriyal, Buttermilk",
      Snacks: "Groundnut Chikki",
      Dinner: "Vegetable Pulao, Raita",
    },
    Wednesday: {
      Breakfast: "Dosa, Tomato Chutney",
      Lunch: "Khichdi, Boiled Egg / Sprouts Salad",
      Snacks: "Boiled Corn",
      Dinner: "Rice, Dal Fry, Cabbage Curry",
    },
    Thursday: {
      Breakfast: "Pongal, Sambar",
      Lunch: "Rice, Rajma Curry, Carrot Poriyal",
      Snacks: "Milk & Biscuit",
      Dinner: "Chapati, Mixed Veg Kurma",
    },
    Friday: {
      Breakfast: "Bread, Jam, Boiled Egg / Banana",
      Lunch: "Vegetable Pulao, Dal, Curd",
      Snacks: "Seasonal Fruit",
      Dinner: "Rice, Sambar, Potato Fry",
    },
    Saturday: {
      Breakfast: "Poha, Chutney",
      Lunch: "Rice, Dal Tadka, Beans Curry",
      Snacks: "Milk",
      Dinner: "Chapati, Sweet Pongal / Kesari",
    },
    Sunday: {
      Breakfast: "Poori, Chole",
      Lunch: "Chicken Curry / Paneer Curry, Rice",
      Snacks: "Fruit Juice",
      Dinner: "Vegetable Fried Rice, Curd",
    },
  };

  const days = Object.keys(weeklyMenu);

  return (
    <div className="space-y-6 text-[13px]">

      {/* ===== EXISTING HEADER SECTIONS (UNCHANGED) ===== */}

      <div>
        <h1 className="text-lg font-bold text-blue-900">
          Mid-Day Meal Monitoring & Nutrition Compliance Report
        </h1>
        <p className="text-xs text-gray-600">
          Government Meal Distribution, Attendance & Quality Control Register
        </p>
      </div>

      <div className="border p-3 grid grid-cols-6 gap-4">
        <Info label="Student Name" value="Rahul Reddy" />
        <Info label="Roll No" value="23" />
        <Info label="Class / Section" value="6th - A" />
        <Info label="School Code" value="TS-SGSMS-0045" />
        <Info label="District" value="Hyderabad" />
        <Info label="Academic Year" value="2025-2026" />
      </div>

      <div className="flex justify-between items-center">
        <div><strong>Monitoring Month:</strong> February 2026</div>
      </div>

      <div className="border p-4">
        <h2 className="font-semibold text-blue-800 mb-3">
          Monthly Meal Distribution Summary
        </h2>
        <div className="grid grid-cols-8 gap-3 text-center">
          <Metric label="Working Days" value="22" />
          <Metric label="Meals Planned" value="22" />
          <Metric label="Meals Served" value="20" />
          <Metric label="Missed Meals" value="2" />
          <Metric label="Meal Attendance %" value="90.91%" />
          <Metric label="Avg Calories / Day" value="720 kcal" />
          <Metric label="Protein Intake Avg" value="18g" />
          <Metric label="Compliance Status" value="Within Norms" />
        </div>
      </div>

      {/* ===== NEW CONTROLS ADDED (ONLY THIS SECTION ADDED) ===== */}

      <div className="border p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <strong>Select Date:</strong>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-2 py-1"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setWeek((prev) => Math.max(prev - 1, 1))}
            className="border px-3 py-1"
          >
            Previous Week
          </button>

          <button
            onClick={() => setWeek((prev) => prev + 1)}
            className="border px-3 py-1"
          >
            Next Week
          </button>
        </div>
      </div>

      {/* ===== WEEKLY REGISTER TABLE (UNCHANGED) ===== */}

      <div>
        <h2 className="text-lg font-bold text-blue-900">
          Weekly Meal Distribution Register (Week {week})
        </h2>
      </div>

      <table className="w-full border text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-1">Date (Day)</th>
            <th className="border p-1">Meal Type</th>
            <th className="border p-1">Menu Items</th>
            <th className="border p-1">Image</th>
            <th className="border p-1">Quality Rating</th>
            <th className="border p-1">Inspection Remarks</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) =>
            Object.keys(weeklyMenu[day]).map((meal, mealIndex) => (
              <tr key={`${index}-${mealIndex}`}>
                {mealIndex === 0 && (
                  <td
                    rowSpan={4}
                    className="border p-2 font-semibold text-center align-middle"
                  >
                    0{index + 1} Feb 2026 ({day})
                  </td>
                )}
                <td className="border p-2">{meal}</td>
                <td className="border p-2">{weeklyMenu[day][meal]}</td>
                <td className="border p-2">
                  <div className="flex justify-center">
                    <div className="w-14 h-14 relative border">
                      <Image
                        src="/meal.jpg"
                        alt="Meal"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td className="border p-2">Good</td>
                <td className="border p-2">No Issues Observed</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===== EXISTING VENDOR / ADMIN / NUTRITION SECTIONS (UNCHANGED) ===== */}

      <div className="border p-4">
        <h2 className="font-semibold text-blue-800 mb-2">
          Vendor & Inspection Monitoring
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <Info label="Vendor Name" value="Sri Lakshmi Catering Services" />
          <Info label="Contract ID" value="MDM-TS-2026-045" />
          <Info label="Last Inspection Date" value="20 Feb 2026" />
          <Info label="Inspection Rating" value="4.5 / 5" />
        </div>
      </div>

      <div className="border p-4">
        <h2 className="font-semibold text-blue-800 mb-2">
          Administrative Verification
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <Info label="Class Teacher Verified" value="Yes" />
          <Info label="School Head Approved" value="Approved" />
          <Info label="District Officer Review" value="Completed" />
          <Info label="Last System Sync" value="28 Feb 2026 | 02:10 PM" />
        </div>
      </div>

      <div className="border p-4">
        <h2 className="font-semibold text-blue-800 mb-2">
          Nutrition Standard Compliance (As per Government Guidelines)
        </h2>

        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Nutrient</th>
              <th className="border p-1">Required Standard</th>
              <th className="border p-1">Provided Avg</th>
              <th className="border p-1">Compliance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">Calories</td>
              <td className="border p-1">700 kcal</td>
              <td className="border p-1">720 kcal</td>
              <td className="border p-1">Compliant</td>
            </tr>
            <tr>
              <td className="border p-1">Protein</td>
              <td className="border p-1">20g</td>
              <td className="border p-1">18g</td>
              <td className="border p-1">Marginal</td>
            </tr>
            <tr>
              <td className="border p-1">Iron</td>
              <td className="border p-1">12mg</td>
              <td className="border p-1">12mg</td>
              <td className="border p-1">Compliant</td>
            </tr>
            <tr>
              <td className="border p-1">Vitamin A</td>
              <td className="border p-1">300 mcg</td>
              <td className="border p-1">320 mcg</td>
              <td className="border p-1">Compliant</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div className="border p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold text-blue-800">{value}</div>
    </div>
  );
}