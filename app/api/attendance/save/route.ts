import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { className, meal, students, attendance } = body;

    const records = students.map((s: any) => ({
      studentId: s.id,
      className: className,
      meal: meal,
      status: attendance[s.id],
      photo: s.photo || null,
      date: new Date(),
    }));

    await prisma.attendance.createMany({
      data: records,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save attendance" },
      { status: 500 }
    );
  }
}