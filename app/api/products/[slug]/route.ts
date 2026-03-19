import { type NextRequest, NextResponse } from "next/server";
import { getProductBySlug, type Product } from "@/lib/products";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse<{ item: Product } | { message: string }>> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json(
      {
        message: "Product not found",
      },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return NextResponse.json(
    {
      item: product,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
