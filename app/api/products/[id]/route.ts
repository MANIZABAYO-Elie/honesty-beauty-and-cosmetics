import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { getSession } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findOne({
    $or: [{ slug: params.id }, { _id: params.id.match(/^[a-f\d]{24}$/i) ? params.id : null }],
  })
    .populate("category_id", "name slug")
    .lean() as any;

  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    ...product,
    id: product._id.toString(),
    category: product.category_id ?? null,
    category_id: product.category_id?._id?.toString() ?? product.category_id?.toString() ?? null,
  });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(product);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
