import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { getSession } from "@/lib/auth";
import { apiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const p = req.nextUrl.searchParams;
    const search = p.get("search");
    const categoryId = p.get("category_id");
    const status = p.get("status");
    const featured = p.get("featured");
    const sort = p.get("sort") ?? "newest";
    const page = parseInt(p.get("page") ?? "1");
    const limit = parseInt(p.get("limit") ?? "9");

    const query: Record<string, any> = {};
    if (status) query.status = status;
    if (featured === "true") query.featured = true;
    if (categoryId) query.category_id = categoryId;
    if (search) query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];

    const sortMap: Record<string, any> = {
      newest: { createdAt: -1 },
      "price-low": { price: 1 },
      "price-high": { price: -1 },
      name: { name: 1 },
    };

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("category_id", "name slug")
        .sort(sortMap[sort] ?? { createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    const normalized = products.map((p: any) => ({
      ...p,
      id: p._id.toString(),
      category: p.category_id ?? null,
      category_id: p.category_id?._id?.toString() ?? p.category_id?.toString() ?? null,
    }));

    return NextResponse.json({ products: normalized, total });
  } catch (error) {
    return apiError(error, "Failed to load products");
  }
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const product = await Product.create(data);
  return NextResponse.json(product, { status: 201 });
}
