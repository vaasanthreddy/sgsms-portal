export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) {
    return NextResponse.json({ error: "studentId required" });
  }

  const start = new Date();
  start.setDate(start.getDate() - 7);

  const data = await prisma.attendance.findMany({
    where: {
      studentId,
      date: {
        gte: start
      }
    },
    orderBy: {
      date: "asc"
    }
  });

  return NextResponse.json(data);

}