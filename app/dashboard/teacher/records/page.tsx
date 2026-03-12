"use client"

import { useEffect, useState } from "react"

type MealPhoto={
 present:boolean
 photo:string | null
}

type StudentMeal={
 name:string
 breakfast:MealPhoto
 lunch:MealPhoto
 snacks:MealPhoto
 dinner:MealPhoto
 completed:boolean
}

type MealSummary={
 meal:string
 eligible:number
 ate:number
 missed:number
 percent:string
}

export default function RecordsPage(){

const [selectedDate,setSelectedDate]=useState("")
const [selectedClass,setSelectedClass]=useState("LKG")

const [students,setStudents]=useState<StudentMeal[]>([])
const [summary,setSummary]=useState<MealSummary[]>([])
const [totalStudents,setTotalStudents]=useState(0)

/* -------------------------
LOAD REPORT DATA
-------------------------- */

useEffect(()=>{

 async function loadReport(){

  const res=await fetch(
   `/api/reports?date=${selectedDate}&class=${selectedClass}`
  )

  const data=await res.json()

  setStudents(data.students || [])
  setSummary(data.summary || [])
  setTotalStudents(data.totalStudents || 0)

 }

 if(selectedDate){
  loadReport()
 }

},[selectedDate,selectedClass])


/* -------------------------
COMPLETION CALCULATION
-------------------------- */

const fullCompletion=students.filter(
 s=>s.completed
).length

const completionRate= totalStudents
 ? ((fullCompletion/totalStudents)*100).toFixed(1)
 : "0"

/* -------------------------
CHART DATA
-------------------------- */

const breakfastSummary=summary.find(
 s=>s.meal==="Breakfast"
)

const chartPercentage= breakfastSummary
 ? (breakfastSummary.ate / totalStudents)*100
 : 0

return(

<div className="max-w-7xl mx-auto space-y-10">

<h1 className="text-2xl font-semibold">
Daily Meal History Report
</h1>

{/* FILTERS */}

<div className="bg-white p-5 border rounded shadow flex gap-6 flex-wrap">

<div>

<label className="block text-sm font-medium">
Select Date
</label>

<input
type="date"
value={selectedDate}
onChange={(e)=>setSelectedDate(e.target.value)}
className="border p-2 rounded"
/>

</div>

<div>

<label className="block text-sm font-medium">
Select Class
</label>

<select
value={selectedClass}
onChange={(e)=>setSelectedClass(e.target.value)}
className="border p-2 rounded"
>

{[
"LKG","UKG",
"1st","2nd","3rd","4th","5th",
"6th","7th","8th","9th","10th"
].map(cls=>(
<option key={cls}>{cls}</option>
))}

</select>

</div>

</div>


{/* MEAL SUMMARY */}

<div className="bg-white border rounded shadow">

<div className="p-4 border-b font-semibold">
Meal Summary
</div>

<table className="w-full text-sm">

<thead className="bg-gray-100">

<tr>
<th className="p-3 border">Meal</th>
<th className="p-3 border">Eligible</th>
<th className="p-3 border text-green-600">Ate</th>
<th className="p-3 border text-red-600">Missed</th>
<th className="p-3 border">%</th>
</tr>

</thead>

<tbody>

{summary.map((m,i)=>(
<tr key={i}>

<td className="p-3 border capitalize">
{m.meal}
</td>

<td className="p-3 border">
{m.eligible}
</td>

<td className="p-3 border text-green-600">
{m.ate}
</td>

<td className="p-3 border text-red-600">
{m.missed}
</td>

<td className="p-3 border">
{m.percent}%
</td>

</tr>
))}

</tbody>

</table>

</div>


{/* BREAKFAST CHART */}

<div className="bg-white p-6 border rounded shadow">

<h3 className="font-semibold mb-3">
Breakfast Consumption Chart
</h3>

<div className="w-full bg-gray-200 h-6 rounded">

<div
className="bg-green-600 h-6 rounded"
style={{width:`${chartPercentage}%`}}
/>

</div>

<p className="mt-2 text-sm">
{chartPercentage.toFixed(1)}% Students Ate Breakfast
</p>

</div>


{/* STUDENT TABLE */}

<div className="bg-white border rounded shadow">

<div className="p-4 border-b font-semibold">
Student Meal Completion
</div>

<table className="w-full text-sm">

<thead className="bg-gray-100">

<tr>
<th className="p-3 border">Student</th>
<th className="p-3 border">Breakfast</th>
<th className="p-3 border">Lunch</th>
<th className="p-3 border">Snacks</th>
<th className="p-3 border">Dinner</th>
<th className="p-3 border">4/4 Completed</th>
</tr>

</thead>

<tbody>

{students.map((s,i)=>{

return(

<tr key={i}>

<td className="p-3 border">
{s.name}
</td>

<td className="p-3 border text-center">
{s.breakfast?.present && s.breakfast.photo ? (
<img
 src={s.breakfast.photo ?? ""}
 className="w-24 h-24 object-cover mx-auto rounded-lg border shadow cursor-pointer hover:scale-110 transition"
 onClick={()=>window.open(s.breakfast.photo ?? "", "_blank")}
/>
):(
<span className="text-red-600">Absent</span>
)}
</td>

<td className="p-3 border text-center">
{s.lunch?.present && s.lunch.photo ? (
<img
  src={s.lunch.photo ?? ""}
  className="w-24 h-24 object-cover mx-auto rounded cursor-pointer"
  onClick={()=>window.open(s.lunch.photo ?? "", "_blank")}
/>
):(
<span className="text-red-600">Absent</span>
)}
</td>

<td className="p-3 border text-center">
{s.snacks?.present && s.snacks.photo ? (
<img
 src={s.snacks.photo ?? ""}
 className="w-24 h-24 object-cover mx-auto rounded-lg border shadow cursor-pointer hover:scale-110 transition"
onClick={()=>window.open(s.snacks.photo ?? "", "_blank")}
/>
):(
<span className="text-red-600">Absent</span>
)}
</td>

<td className="p-3 border text-center">
{s.dinner?.present && s.dinner.photo ? (
<img
 src={s.dinner.photo ?? ""}
 className="w-24 h-24 object-cover mx-auto rounded-lg border shadow cursor-pointer hover:scale-110 transition"
onClick={()=>window.open(s.dinner.photo ?? "", "_blank")}
/>
):(
<span className="text-red-600">Absent</span>
)}
</td>

<td className={`p-3 border font-medium ${
s.completed
? "text-green-600"
: "text-red-600"
}`}>
{s.completed ? "Yes":"No"}
</td>

</tr>

)

})}

</tbody>

</table>

</div>


{/* COMPLETION SUMMARY */}

<div className="bg-white border rounded shadow p-6">

<p>Total Students: {totalStudents}</p>

<p>Fully Completed: {fullCompletion}</p>

<p>Completion Rate: {completionRate}%</p>

</div>

</div>

)
}