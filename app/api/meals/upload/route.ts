export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const formData = await req.formData();

    const menu = formData.get("menu") as string;
    const schoolId = formData.get("schoolId") as string;
    const file = formData.get("file") as Blob;

    if (!menu || !schoolId || !file) {
      return NextResponse.json({ error: "Missing data" });
    }

    const [mealType, itemName] = menu.split(" - ");

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

    const todayStart = new Date();
    todayStart.setHours(0,0,0,0);

    const todayEnd = new Date();
    todayEnd.setHours(23,59,59,999);

    const existing = await prisma.todayMealPhoto.findFirst({
      where:{
        schoolId,
        mealType,
        itemName,
        date:{
          gte: todayStart,
          lte: todayEnd
        }
      }
    });

    if(existing){

      await prisma.todayMealPhoto.update({
        where:{ id: existing.id },
        data:{
          photoUrl: base64Image
        }
      });

    } else {

      await prisma.todayMealPhoto.create({
        data:{
          schoolId,
          mealType,
          itemName,
          photoUrl: base64Image,
          date: new Date(),
          submittedBy:"teacher"
        }
      });

    }

    return NextResponse.json({ success:true });

  } catch(error){

    console.error(error);

    return NextResponse.json({
      success:false,
      message:"Upload failed"
    });

  }

}