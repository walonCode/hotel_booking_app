import { type NextRequest, NextResponse } from "next/server"
import { getHotelById } from "@/lib/api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const hotel = await getHotelById(params.id)

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Hotel not found",
          },
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: hotel,
    })
  } catch (error) {
    console.error("Hotel API error:", error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch hotel",
        },
      },
      { status: 500 },
    )
  }
}
