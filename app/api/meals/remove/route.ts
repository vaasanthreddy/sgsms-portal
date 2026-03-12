export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req:Request){

  const { mealType, itemName, schoolId } = await req.json();

  await prisma.todayMealPhoto.deleteMany({
    where:{
      mealType,
      itemName,
      schoolId
    }
  });

  return NextResponse.json({ success:true });
}