import { NextRequest, NextResponse } from "next/server";
import { getPrice, getPriceByRoute } from "@/lib/prices";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const route = searchParams.get("route");

    // Если передан маршрут в формате "kyiv-warszawa"
    if (route) {
      const priceInfo = getPriceByRoute(route);
      return NextResponse.json(priceInfo);
    }

    // Если переданы отдельные города
    if (from && to) {
      const price = getPrice(from, to);
      return NextResponse.json(price);
    }

    return NextResponse.json(
      {
        error:
          "Missing required parameters: either 'route' or both 'from' and 'to'",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in price API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
