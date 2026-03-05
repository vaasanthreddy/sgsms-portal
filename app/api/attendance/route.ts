export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const className = searchParams.get("class");
    const meal = searchParams.get("meal");

    const attendance = await prisma.attendance.findMany({
      where: {
        className: className ?? undefined,
        meal: meal ?? undefined,
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error("Attendance API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}