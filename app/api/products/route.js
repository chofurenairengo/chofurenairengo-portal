import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json(
    {
      items: products,
      count: products.length
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
