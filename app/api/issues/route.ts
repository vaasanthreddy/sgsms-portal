export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {prisma }from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {

  const formData = await req.formData();

  const id = formData.get("id") as string;
  const issueName = formData.get("issueName") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;

  const file = formData.get("photo") as File;

  let photoPath = "";

  if (file) {

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + file.name;

    const uploadPath = path.join(
      process.cwd(),
      "public/uploads",
      fileName
    );

    fs.writeFileSync(uploadPath, buffer);

    photoPath = "/uploads/" + fileName;
  }

  const issue = await prisma.issue.create({
    data: {
      id,
      issueName,
      description,
      date,
      photo: photoPath,
      status: "Pending",
    },
  });

  return NextResponse.json(issue);
}

export async function GET() {

  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(issues);
}