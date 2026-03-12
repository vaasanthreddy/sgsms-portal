export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const studentId = searchParams.get("studentId");
  const date = searchParams.get("date");

  if (!studentId || !date) {
    return NextResponse.json({ error: "missing params" });
  }

  const start = new Date(date);
  start.setHours(0,0,0,0);

  const end = new Date(date);
  end.setHours(23,59,59,999);

  const data = await prisma.attendance.findMany({
    where: {
      studentId,
      date: {
        gte: start,
        lte: end
      }
    }
  });

  return NextResponse.json(data);

}