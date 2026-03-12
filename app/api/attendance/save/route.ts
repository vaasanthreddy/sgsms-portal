export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { className, meal, students, attendance, photos, userId } = body;

    const today = new Date();
    today.setHours(0,0,0,0);

    const uploadDir = path.join(process.cwd(),"public/uploads");

    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir,{recursive:true});
    }

    for(const s of students){

      const status = attendance[s.id] ?? "Absent";

      let photoPath:string | null = null;

      if(photos && photos[s.id]){

        const base64Data = photos[s.id].replace(/^data:image\/png;base64,/, "");

        const fileName = `${s.id}_${meal}_${Date.now()}.png`;

        const filePath = path.join(uploadDir,fileName);

        fs.writeFileSync(filePath,base64Data,"base64");

        photoPath = `/uploads/${fileName}`;
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