import { type NextRequest, NextResponse } from "next/server"
import { getHotels } from "@/lib/api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      city: searchParams.get("location") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      rating: searchParams.get("rating") ? Number(searchParams.get("rating")) : undefined,
      amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || undefined,
      sortBy: searchParams.get("sortBy") || "price",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 20,
    }

    const hotels = await getHotels(filters)

    return NextResponse.json({
      success: true,
      data: hotels,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total: hotels.length,
        totalPages: Math.ceil(hotels.length / filters.limit),
      },
    })
  } catch (error) {
    console.error("Hotels API error:", error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch hotels",
        },
      },
      { status: 500 },
    )
  }
}
