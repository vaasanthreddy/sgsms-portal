export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {

    const formData = await req.formData();

    const menu = formData.get("menu") as string;
    const schoolId = formData.get("schoolId") as string;

    if (!menu || !schoolId) {
      return NextResponse.json({ error: "Missing data" });
    }

    const [mealType, itemName] = menu.split(" - ");

    await prisma.todayMealPhoto.create({
      data: {
        schoolId,
        mealType,
        itemName,
        photoUrl: "captured-image",
        date: new Date(),
        submittedBy: "teacher"
      }
    });

    console.log("Saved:", mealType, itemName);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json({ success: false });
  }
}