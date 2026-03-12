export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url);

    const className = searchParams.get("class") || "";

    const students = await prisma.student.findMany({
      where: {
        class: className
      },
      orderBy: {
        name: "asc"
      }
    });

    return NextResponse.json(students || []);

  } catch (error) {

    console.error("Students API error:", error);

    return NextResponse.json({
      success:false,
      data:[],
      message:"Database error"
    });

  }

}