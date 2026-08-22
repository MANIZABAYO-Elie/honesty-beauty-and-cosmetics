import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const p = req.nextUrl.searchParams;
  const search = p.get("search");
  const filter = p.get("filter");

  const query: Record<string, any> = {};
  if (filter === "unread") query.is_read = false;
  if (filter === "read") query.is_read = true;
  if (search) query.$or = [
    { name: { $regex: search, $options: "i" } },
    { email: { $regex: search, $options: "i" } },
    { subject: { $regex: search, $options: "i" } },
  ];

  const messages = await ContactMessage.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const message = await ContactMessage.create(data);
  return NextResponse.json(message, { status: 201 });
}
