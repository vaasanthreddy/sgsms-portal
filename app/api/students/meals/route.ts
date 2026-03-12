export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request){

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  if(!studentId){
    return NextResponse.json({error:"Student ID required"});
  }

  const meals = await prisma.attendance.findMany({
    where:{
      studentId
    },
    select:{
      date:true,
      meal:true,
      photo:true
    },
    orderBy:{
      date:"desc"
    }
  });

  return NextResponse.json(meals);
}