"use client"
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts"

import { useEffect,useState } from "react"

export default function ContractorDetails(){

  
const [contractors,setContractors]=useState<any[]>([])
const [selected,setSelected]=useState("")

const [contractor,setContractor]=useState<any>(null)
const [delivery,setDelivery]=useState<any[]>([])
const [complaints,setComplaints]=useState<any[]>([])
const [inspections,setInspections]=useState<any[]>([])
const [schools,setSchools]=useState<any[]>([])
const [ranking,setRanking]=useState<any[]>([])

const deliveryChart = delivery.map((d)=>({

date:new Date(d.date).toLocaleDateString(),
onTime:d.status==="On Time"?1:0

}))

const complaintChart = complaints.map((c)=>({

date:new Date(c.date).toLocaleDateString(),
count:1

}))


/* LOAD CONTRACTOR LIST */

useEffect(()=>{

const loadContractors = async ()=>{

try{

const res = await fetch("/api/contractor-list")
const data = await res.json()

setContractors(data)

}catch(err){

console.log("Contractor list error")

}

}

loadContractors()

},[])



/* LOAD CONTRACTOR DETAILS */

const loadContractor = async (id:string)=>{

setSelected(id)

const res = await fetch(`/api/contractor?id=${id}`)
const data = await res.json()

setContractor(data.contractor)

setDelivery(data.deliveries || [])
setComplaints(data.complaints || [])
setInspections(data.inspections || [])
setSchools(data.schools || [])
setRanking(data.ranking || [])

}



return(

<div className="p-8 space-y-10">

<h1 className="text-3xl font-bold text-blue-800">
Contractor Monitoring Dashboard
</h1>



{/* CONTRACTOR SELECT */}

<div className="bg-white shadow rounded p-6">

<h2 className="font-semibold mb-3">
Select Contractor
</h2>

<select
className="border p-3 rounded w-80"
value={selected}
onChange={(e)=>loadContractor(e.target.value)}
>

<option value="">Select Contractor</option>

{contractors.map((c)=>(
<option key={c.contractorId} value={c.contractorId}>
{c.contractorId} - {c.name}
</option>
))}

</select>

</div>



{/* SHOW DATA ONLY AFTER SELECTING CONTRACTOR */}

{selected && contractor && (

<>

{/* PERFORMANCE */}

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-green-100 p-8 rounded text-center shadow">

<h3 className="text-3xl font-bold text-green-800">
{contractor.deliveryPercent}%
</h3>

<p className="mt-2">On-Time Delivery</p>

</div>


<div className="bg-blue-100 p-8 rounded text-center shadow">

<h3 className="text-3xl font-bold text-blue-800">
{contractor.complaintsCount}
</h3>

<p className="mt-2">Complaints</p>

</div>


<div className="bg-yellow-100 p-8 rounded text-center shadow">

<h3 className="text-3xl font-bold text-yellow-700">
{contractor.feedbackRating}/5
</h3>

<p className="mt-2">Feedback Rating</p>

</div>

</div>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-green-200 p-6 rounded text-center">

<h3 className="font-bold text-green-800">
Food Safety
</h3>

<p>✔ Passed Inspection</p>

</div>


<div className="bg-yellow-200 p-6 rounded text-center">

<h3 className="font-bold text-yellow-800">
Complaint Status
</h3>

<p>{contractor?.complaintsCount} Issues Reported</p>

</div>


<div className="bg-green-200 p-6 rounded text-center">

<h3 className="font-bold text-green-800">
Delivery Compliance
</h3>

<p>{contractor?.deliveryPercent}% On Time</p>

</div>

</div>



{/* DELIVERY TABLE */}

<h2 className="text-xl font-semibold text-blue-700">
Meal Delivery Monitoring
</h2>

<div className="overflow-x-auto">

<table className="w-full text-sm border min-w-[900px]">

<thead className="bg-gray-100">

<tr>
<th className="p-3 border">Date</th>
<th className="p-3 border">Breakfast</th>
<th className="p-3 border">Lunch</th>
<th className="p-3 border">Snacks</th>
<th className="p-3 border">Dinner</th>
<th className="p-3 border">Status</th>
</tr>

</thead>

<tbody>

{delivery.map((d)=>(
<tr key={d.id} className="text-center border">

<td className="p-3">{new Date(d.date).toLocaleDateString()}</td>
<td className="p-3">{d.breakfast?"✔":"✖"}</td>
<td className="p-3">{d.lunch?"✔":"✖"}</td>
<td className="p-3">{d.snacks?"✔":"✖"}</td>
<td className="p-3">{d.dinner?"✔":"✖"}</td>
<td className="p-3">{d.status}</td>

</tr>
))}

</tbody>

</table>

</div>

<h2 className="text-xl font-semibold text-blue-700">
Delivery Performance Analytics
</h2>

<div className="bg-white shadow rounded p-6 h-[300px]">

<ResponsiveContainer width="100%" height="100%">

<BarChart data={deliveryChart}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="onTime" fill="#2563eb"/>

</BarChart>

</ResponsiveContainer>

</div>


{/* COMPLAINT TABLE */}

<h2 className="text-xl font-semibold text-blue-700">
Complaint Records
</h2>

<table className="w-full border text-sm">

<thead className="bg-gray-100">

<tr>
<th className="p-3 border">ID</th>
<th className="p-3 border">Date</th>
<th className="p-3 border">Issue</th>
<th className="p-3 border">Status</th>
</tr>

</thead>

<tbody>

{complaints.map((c)=>(
<tr key={c.id} className="text-center border">

<td className="p-3">{c.id}</td>
<td className="p-3">{new Date(c.date).toLocaleDateString()}</td>
<td className="p-3">{c.issue}</td>
<td className="p-3">{c.status}</td>

</tr>
))}

</tbody>

</table>

<h2 className="text-xl font-semibold text-blue-700">
Complaint Analytics
</h2>

<div className="bg-white shadow rounded p-6 h-[300px]">

<ResponsiveContainer width="100%" height="100%">

<BarChart data={complaintChart}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="count" fill="#dc2626"/>

</BarChart>

</ResponsiveContainer>

</div>


{/* INSPECTION */}

<h2 className="text-xl font-semibold text-blue-700">
Hygiene Inspection Records
</h2>

<table className="w-full border text-sm">

<thead className="bg-gray-100">

<tr>
<th className="p-3 border">Date</th>
<th className="p-3 border">Officer</th>
<th className="p-3 border">Grade</th>
<th className="p-3 border">Remarks</th>
</tr>

</thead>

<tbody>

{inspections.map((i)=>(
<tr key={i.id} className="text-center border">

<td className="p-3">{new Date(i.date).toLocaleDateString()}</td>
<td className="p-3">{i.officer}</td>
<td className="p-3">{i.grade}</td>
<td className="p-3">{i.remarks}</td>

</tr>
))}

</tbody>

</table>



{/* SCHOOL COVERAGE */}

<h2 className="text-xl font-semibold text-blue-700">
Schools Covered
</h2>

<table className="w-full border text-sm">

<thead className="bg-gray-100">

<tr>
<th className="p-3 border">School ID</th>
<th className="p-3 border">School Name</th>
<th className="p-3 border">Students</th>
</tr>

</thead>

<tbody>

{schools.map((s)=>(
<tr key={s.id} className="text-center border">

<td className="p-3">{s.schoolId}</td>
<td className="p-3">{s.schoolName}</td>
<td className="p-3">{s.students}</td>

</tr>
))}

</tbody>

</table>



{/* RANKING */}

<h2 className="text-xl font-semibold text-blue-700">
District Contractor Ranking
</h2>

<table className="w-full border text-sm">

<thead className="bg-gray-100">

<tr>
<th className="p-3 border">Rank</th>
<th className="p-3 border">Contractor</th>
<th className="p-3 border">Delivery %</th>
<th className="p-3 border">Rating</th>
<th className="p-3 border">Complaints</th>
</tr>

</thead>

<tbody>

{ranking.map((r,i)=>(
<tr key={i} className="text-center border">

<td className="p-3">{i+1}</td>
<td className="p-3">{r.name}</td>
<td className="p-3">{r.deliveryPercent}%</td>
<td className="p-3">{r.feedbackRating}</td>
<td className="p-3">{r.complaintsCount}</td>

</tr>
))}

</tbody>

</table>

</>

)}

</div>


)

}