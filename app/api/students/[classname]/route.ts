export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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