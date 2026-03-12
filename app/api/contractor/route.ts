export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url)
    const contractorId = searchParams.get("id")

    if (!contractorId) {
      return NextResponse.json(
        { error: "Contractor ID required" },
        { status: 400 }
      )
    }

    // Contractor details

    const contractor = await prisma.contractor.findUnique({

      where: { contractorId },

      include: {
        deliveries: true,
        complaints: true,
        inspections: true,
        schools: true
      }

    })


    if (!contractor) {
      return NextResponse.json(
        { error: "Contractor not found" },
        { status: 404 }
      )
    }


    // Contractor ranking

    const ranking = await prisma.contractor.findMany({

      orderBy: {
        deliveryPercent: "desc"
      },

      select: {
        name: true,
        deliveryPercent: true,
        feedbackRating: true,
        complaintsCount: true
      }

    })


    return NextResponse.json({

      contractor,
      deliveries: contractor.deliveries,
      complaints: contractor.complaints,
      inspections: contractor.inspections,
      schools: contractor.schools,
      ranking

    })

  } catch (error) {

    console.error("Contractor API error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )

  }

}