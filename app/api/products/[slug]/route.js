import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";

export async function GET(_request, { params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return NextResponse.json(
      {
        message: "Product not found"
      },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }

  return NextResponse.json(
    {
      item: product
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
