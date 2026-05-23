import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, createToken, verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const valid = await verifyCredentials(username, password);
  if (!valid) {
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
  }

  const token = await createToken(username);
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return res;
}

export async function GET() {
  const valid = await verifyToken();
  return NextResponse.json({ authenticated: valid });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-token", "", { maxAge: 0, path: "/" });
  return res;
}
