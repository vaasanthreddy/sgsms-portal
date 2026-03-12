export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const className = searchParams.get("class");
  const meal = searchParams.get("meal");
  const date = searchParams.get("date");

  const selectedDate = new Date(date || "");
  selectedDate.setHours(0,0,0,0);

  const records = await prisma.attendance.findMany({
    where:{
      className: className || undefined,
      meal: meal || undefined,
      date: selectedDate
    }
  });

  return NextResponse.json(records);

}


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { className, meal, students, attendance, userId } = body;

    const today = new Date();
    today.setHours(0,0,0,0);

    for (const s of students) {

      const status = attendance[s.id] ?? "Absent";

      await prisma.attendance.upsert({

        where:{
          studentId_meal_date:{
            studentId:s.id,
            meal:meal,
            date:today
          }
        },

        update:{
          status,
          photo:s.photo ?? null
        },

        create:{
          studentId:s.id,
          className,
          meal,
          status,
          photo:s.photo ?? null,
          date:today,
          userId:userId ?? null
        }

      });

    }

    return NextResponse.json({success:true});

  } catch(error){

    console.error(error);

    return NextResponse.json(
      {error:"Failed to save attendance"},
      {status:500}
    );

  }

}