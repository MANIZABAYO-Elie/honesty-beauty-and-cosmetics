import { NextResponse } from "next/server";

export function apiError(error: unknown, label = "Request failed") {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[API] ${label}:`, message);

  const isConfig = /MONGODB_URI|not set|not defined/i.test(message);
  const isNetwork =
    /Server selection timed out|ECONNREFUSED|ENOTFOUND|network|whitelist/i.test(message);

  let hint = message;
  if (isConfig) {
    hint =
      "Database is not configured. Set MONGODB_URI in Vercel and redeploy the project.";
  } else if (isNetwork) {
    hint =
      "Cannot reach MongoDB. In MongoDB Atlas → Network Access, allow access from anywhere (0.0.0.0/0), then redeploy.";
  }

  return NextResponse.json(
    {
      error: label,
      message: hint,
    },
    { status: 500 }
  );
}
