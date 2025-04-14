import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "No search query provided" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.digikala.com/v1/search/text-lenz/?q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Accept: "application/json",
          ...(process.env.DIGIKALA_API_KEY
            ? {
                Authorization: `Bearer ${process.env.DIGIKALA_API_KEY}`,
              }
            : {}),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Digikala API");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
