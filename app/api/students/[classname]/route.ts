import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classname: string }> }
) {
  const { classname } = await params;

  const students = await prisma.student.findMany({
    where: {
      class: classname,
    },
  });

  return NextResponse.json(students);
}