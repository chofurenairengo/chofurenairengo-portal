import { NextResponse } from "next/server";
import { getProducts, type Product } from "@/lib/products";

export async function GET(): Promise<
  NextResponse<{ items: Product[]; count: number }>
> {
  const products = await getProducts();

  return NextResponse.json(
    {
      items: products,
      count: products.length,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
