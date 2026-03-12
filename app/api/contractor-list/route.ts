import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {

  try {

    const contractors = await prisma.contractor.findMany({
      select:{
        contractorId:true,
        name:true
      },
      orderBy:{
        contractorId:"asc"
      }
    })

    return NextResponse.json(contractors)

  } catch (error) {

    console.error("Contractor list error:",error)

    return NextResponse.json([])

  }

}