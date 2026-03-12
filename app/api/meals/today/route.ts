export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){

  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);

  const data = await prisma.todayMealPhoto.findMany({
    where:{
      date:{
        gte:start,
        lte:end
      }
    }
  });

  return NextResponse.json(data);
}