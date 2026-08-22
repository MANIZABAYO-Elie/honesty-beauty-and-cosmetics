import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { getSession } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const category = await Category.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(category);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  await Category.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
