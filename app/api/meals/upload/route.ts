export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const menu = formData.get("menu") as string;
    const schoolId = formData.get("schoolId") as string;

    if (!file || !menu || !schoolId) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

    await prisma.meal.create({
      data: {
        schoolId,
        date: new Date(),
        menu,
        imageUrl,
        timestamp: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Meal saved successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}