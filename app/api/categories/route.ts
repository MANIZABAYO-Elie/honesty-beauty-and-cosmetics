import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { getSession } from "@/lib/auth";
import { apiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const search = req.nextUrl.searchParams.get("search");
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const categories = await Category.find(query).sort({ name: 1 }).lean();
    return NextResponse.json(categories);
  } catch (error) {
    return apiError(error, "Failed to load categories");
  }
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const category = await Category.create(data);
  return NextResponse.json(category, { status: 201 });
}
