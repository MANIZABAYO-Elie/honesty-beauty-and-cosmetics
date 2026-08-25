import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export async function GET() {
  const hasUri = Boolean(process.env.MONGODB_URI?.trim());

  if (!hasUri) {
    return NextResponse.json({
      ok: false,
      dbConfigured: false,
      message: "MONGODB_URI is missing. Add it in Vercel and redeploy.",
    });
  }

  try {
    await connectDB();
    const [categoryCount, productCount] = await Promise.all([
      Category.countDocuments(),
      Product.countDocuments(),
    ]);

    return NextResponse.json({
      ok: true,
      dbConfigured: true,
      dbConnected: true,
      categoryCount,
      productCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database connection failed";
    console.error("[health]", message);

    return NextResponse.json({
      ok: false,
      dbConfigured: true,
      dbConnected: false,
      message,
      hint:
        "If this mentions timeout or network, open MongoDB Atlas → Network Access and allow 0.0.0.0/0, then redeploy.",
    });
  }
}
