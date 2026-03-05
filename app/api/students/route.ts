import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cls = searchParams.get("class");

  if (!cls) {
    return NextResponse.json([]);
  }

  const students = await prisma.student.findMany({
    where: { class: cls }
  });

  return NextResponse.json(students);
}