import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";
import { getSession } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const message = await ContactMessage.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(message);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  await ContactMessage.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
