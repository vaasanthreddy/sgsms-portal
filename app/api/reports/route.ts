export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req:Request){

 try{

 const {searchParams} = new URL(req.url)

 const date = searchParams.get("date")
 const className = searchParams.get("class")

 if(!date || !className){
  return NextResponse.json({
   summary:[],
   students:[],
   totalStudents:0
  })
 }

 const start = new Date(date)
 start.setHours(0,0,0,0)

 const end = new Date(date)
 end.setHours(23,59,59,999)

 const students = await prisma.student.findMany({
  where:{ class:className }
 })

 const attendance = await prisma.attendance.findMany({
  where:{
   className,
   date:{
    gte:start,
    lte:end
   }
  }
 })

 const meals=["Breakfast","Lunch","Snacks","Dinner"]

 const summary = meals.map(meal=>{

  const ate = attendance.filter(
   a=>a.meal===meal && a.status==="Present"
  ).length

  const eligible = students.length

  return{
   meal,
   eligible,
   ate,
   missed: eligible-ate,
   percent: eligible ? ((ate/eligible)*100).toFixed(1) : "0"
  }

 })

 const studentTable = students.map(student => {

  const getMeal = (meal:string) => {

    const rec = attendance.find(
      a => a.studentId === student.id && a.meal === meal
    )

    if(!rec){
      return {
        present:false,
        photo:null
      }
    }

    return {
      present: rec.status === "Present",
      photo: rec.photo || null
    }
  }

  const breakfast = getMeal("Breakfast")
  const lunch = getMeal("Lunch")
  const snacks = getMeal("Snacks")
  const dinner = getMeal("Dinner")

  return {
    name: student.name,
    breakfast,
    lunch,
    snacks,
    dinner,
    completed:
      breakfast.present &&
      lunch.present &&
      snacks.present &&
      dinner.present
  }

})

 return NextResponse.json({
  summary,
  students:studentTable,
  totalStudents:students.length
 })

 }catch(err){

 console.error(err)

 return NextResponse.json({
  summary:[],
  students:[],
  totalStudents:0
 })

 }

}