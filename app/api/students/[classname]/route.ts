import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: { classname: string } }
) {
  try {
    const { classname } = context.params;

    const students = await prisma.student.findMany({
      where: {
        class: classname,
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}