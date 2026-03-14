export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { className, meal, students, attendance, photos, userId } = body;

    const today = new Date();
    today.setHours(0,0,0,0);

   

    for(const s of students){

      const status = attendance[s.id] ?? "Absent";

      let photoPath:string | null = null;

if(photos && photos[s.id]){
  photoPath = photos[s.id]; // store base64 directly
}
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
          photo:photoPath
        },

        create:{
          studentId:s.id,
          className,
          meal,
          status,
          photo:photoPath,
          date:today,
          userId:userId ?? null
        }

      });

    }

    return NextResponse.json({
      success:true,
      message:"Attendance saved successfully"
    });

  } catch(error){

    console.error("Attendance Save Error:",error);

    return NextResponse.json({
      success:false,
      message:"Attendance save failed"
    },{status:500});
  }

}