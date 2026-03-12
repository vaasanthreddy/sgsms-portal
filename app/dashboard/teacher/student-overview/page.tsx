"use client"

import { useEffect,useState } from "react"

type Student={
 id:string
 name:string
 class:string
 parentContact:string
}

type MealRecord={
 meal:string
 date:string
 photo?:string
 status?:string
}

export default function StudentOverviewPage(){

/* -----------------------------
STATE
----------------------------- */

const [className,setClassName]=useState("1st")
const [search,setSearch]=useState("")
const [students,setStudents]=useState<Student[]>([])
const [selected,setSelected]=useState<Student|null>(null)

const [records,setRecords]=useState<MealRecord[]>([])

/* -----------------------------
VIEW MODE
----------------------------- */

const [viewMode,setViewMode]=useState<"week"|"month">("week")
const [month,setMonth]=useState(new Date().getMonth())
const [year]=useState(new Date().getFullYear())

const weekDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
const meals=["Breakfast","Lunch","Snacks","Dinner"]

/* -----------------------------
LOAD STUDENTS
----------------------------- */

useEffect(()=>{
 loadStudents()
},[className])

async function loadStudents(){

 try{

  const res=await fetch(`/api/students?class=${className}`)
  const data=await res.json()

  if(Array.isArray(data)) setStudents(data)
  else if(Array.isArray(data.students)) setStudents(data.students)
  else setStudents([])

 }catch(err){
  console.error(err)
 }

}

/* -----------------------------
OPEN STUDENT
----------------------------- */

async function openStudent(s:Student){

 setSelected(s)

 try{

  const res=await fetch(`/api/student-history?studentId=${s.id}`)
  const data=await res.json()

  setRecords(data || [])

 }catch(err){
  console.error(err)
 }

}

/* -----------------------------
FILTER STUDENTS
----------------------------- */

const filtered=students.filter(s=>

 s.name?.toLowerCase().includes(search.toLowerCase()) ||
 s.id?.toLowerCase().includes(search.toLowerCase())

)

/* -----------------------------
DATE HELPERS
----------------------------- */

function getDaysInMonth(){

 return new Date(year,month+1,0).getDate()

}

function getWeekDates(){

 const today=new Date()
 const first=new Date(today)

 const day=today.getDay()

 const diff=today.getDate()-day+1

 first.setDate(diff)

 const arr=[]

 for(let i=0;i<7;i++){

  const d=new Date(first)
  d.setDate(first.getDate()+i)

  arr.push(d)

 }

 return arr

}

function getMonthDates(){

 const total=getDaysInMonth()

 const arr=[]

 for(let i=1;i<=total;i++){

  arr.push(new Date(year,month,i))

 }

 return arr

}

/* -----------------------------
GET MEAL
----------------------------- */

function getMeal(date:Date,meal:string){

 const rec=records.find(r=>

  r.meal===meal &&
  new Date(r.date).toDateString()===date.toDateString()

 )

 return rec

}

/* -----------------------------
MEAL CELL
----------------------------- */

function MealCell({record}:{record:any}){

 if(!record) return <span className="text-red-600 text-xs">Absent</span>

 if(record.photo){

  return(
   <img
    src={record.photo}
    className="w-14 h-14 rounded border object-cover mx-auto"
   />
  )

 }

 return <span className="text-green-600 text-xs">Present</span>

}

/* -----------------------------
CHANGE MONTH
----------------------------- */

function prevMonth(){

 if(month===0) return

 setMonth(month-1)

}

function nextMonth(){

 if(month===11) return

 setMonth(month+1)

}

/* -----------------------------
UI
----------------------------- */

return(

<div className="p-6 space-y-6">

{/* ============================
SEARCH + CLASS FILTER
============================ */}

<div className="flex gap-4 items-center">

<input
className="border p-2 rounded w-80"
placeholder="Search by student name or ID"
value={search}
onChange={e=>setSearch(e.target.value)}
/>

<select
className="border p-2 rounded"
value={className}
onChange={e=>setClassName(e.target.value)}
>

{[
"LKG","UKG","1st","2nd","3rd","4th",
"5th","6th","7th","8th","9th","10th"
].map(c=>(
<option key={c}>{c}</option>
))}

</select>

</div>

{/* ============================
STUDENT LIST
============================ */}

{!selected && (

<div className="border rounded shadow bg-white w-[520px]">

<table className="w-full text-sm">

<thead className="bg-gray-100">

<tr>
<th className="p-2">ID</th>
<th>Name</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{filtered.map(s=>(
<tr key={s.id} className="border-t">

<td className="p-2">{s.id}</td>
<td>{s.name}</td>

<td>
<button
onClick={()=>openStudent(s)}
className="bg-blue-600 text-white px-3 py-1 rounded"
>
View
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>

)}

{/* ============================
STUDENT PROFILE
============================ */}

{selected && (

<div className="border rounded shadow bg-white p-6 space-y-8">

{/* HEADER */}

<div className="flex justify-between">

<div>

<h2 className="text-xl font-bold">
{selected.name} ({selected.id})
</h2>

<p className="text-gray-600">
Class {selected.class}
</p>

</div>

<button
className="border px-4 py-1 rounded"
onClick={()=>setSelected(null)}
>
Back
</button>

</div>

{/* BASIC INFO */}

<div className="grid grid-cols-3 gap-6 text-sm">

<div>

<h3 className="font-semibold mb-2">Basic Info</h3>

<p><b>ID:</b> {selected.id}</p>
<p><b>Name:</b> {selected.name}</p>
<p><b>Class:</b> {selected.class}</p>
<p><b>Gender:</b> -</p>
<p><b>DOB:</b> -</p>
<p><b>Aadhaar:</b> -</p>

</div>

<div>

<h3 className="font-semibold mb-2">Family</h3>

<p><b>Parent Contact:</b> {selected.parentContact}</p>
<p><b>Father Name:</b> -</p>
<p><b>Mother Name:</b> -</p>
<p><b>Guardian:</b> -</p>
<p><b>Annual Income:</b> -</p>

</div>

<div>

<h3 className="font-semibold mb-2">Address</h3>

<p><b>Village:</b> -</p>
<p><b>Mandal:</b> -</p>
<p><b>District:</b> -</p>
<p><b>State:</b> -</p>
<p><b>Pincode:</b> -</p>

</div>

</div>

{/* ACADEMIC */}

<div className="border p-4 rounded">

<h3 className="font-semibold mb-3">
Academic Details
</h3>

<div className="grid grid-cols-4 gap-4 text-sm">

<p><b>Admission No:</b> -</p>
<p><b>Admission Date:</b> -</p>
<p><b>Roll No:</b> -</p>
<p><b>Section:</b> -</p>

<p><b>Medium:</b> English</p>
<p><b>Attendance %:</b> -</p>
<p><b>Last Rank:</b> -</p>
<p><b>Class Teacher:</b> -</p>

</div>

</div>

{/* HEALTH */}

<div className="border p-4 rounded">

<h3 className="font-semibold mb-3">
Health Information
</h3>

<div className="grid grid-cols-4 gap-4 text-sm">

<p><b>Blood Group:</b> -</p>
<p><b>Height:</b> -</p>
<p><b>Weight:</b> -</p>
<p><b>Medical Notes:</b> -</p>

</div>

</div>

{/* GOVERNMENT SCHEMES */}

<div className="border p-4 rounded">

<h3 className="font-semibold mb-3">
Government Schemes
</h3>

<div className="grid grid-cols-3 gap-4 text-sm">

<p>Midday Meal ✔</p>
<p>Free Uniform ✔</p>
<p>Scholarship ✔</p>
<p>Free Books ✔</p>
<p>Transport -</p>
<p>Hostel -</p>

</div>

</div>

{/* ============================
MEAL MONITORING CONTROLS
============================ */}

<div className="flex gap-4 items-center">

<select
className="border p-2 rounded"
value={viewMode}
onChange={e=>setViewMode(e.target.value as any)}
>
<option value="week">Weekly</option>
<option value="month">Monthly</option>
</select>

<select
className="border p-2 rounded"
value={month}
onChange={e=>setMonth(Number(e.target.value))}
>

{[
"Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"
].map((m,i)=>(
<option key={i} value={i}>{m}</option>
))}

</select>

<button
className="border px-3 py-1 rounded"
onClick={prevMonth}
>
Prev
</button>

<button
className="border px-3 py-1 rounded"
onClick={nextMonth}
>
Next
</button>

</div>

{/* ============================
MEAL TABLE
============================ */}

<div className="overflow-x-auto border rounded">

<table className="min-w-[1200px] text-sm border">

<thead className="bg-gray-100">

<tr>

<th className="p-2">Meal</th>

{(viewMode==="week" ? getWeekDates() : getMonthDates()).map(d=>(

<th key={d.toDateString()} className="p-2">

{d.getDate()}
<br/>
<span className="text-xs text-gray-500">
{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]}
</span>

</th>

))}

</tr>

</thead>

<tbody>

{meals.map(meal=>(

<tr key={meal} className="border-t">

<td className="p-2 font-semibold">
{meal}
</td>

{(viewMode==="week" ? getWeekDates() : getMonthDates()).map(date=>(

<td
key={date.toDateString()}
className="p-2 text-center"
>

<MealCell
record={getMeal(date,meal)}
/>

</td>

))}

</tr>

))}

</tbody>

</table>

</div>

</div>

)}

</div>

)

}