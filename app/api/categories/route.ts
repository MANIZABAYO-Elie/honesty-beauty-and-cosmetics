import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();
  const search = req.nextUrl.searchParams.get("search");
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  const categories = await Category.find(query).sort({ name: 1 }).lean();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const category = await Category.create(data);
  return NextResponse.json(category, { status: 201 });
}
