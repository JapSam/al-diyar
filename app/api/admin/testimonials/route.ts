import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readData, writeData } from "@/lib/data-store";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

async function guard() {
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json(readData<Testimonial>("testimonials", defaultTestimonials));
}

export async function POST(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const item: Testimonial = await req.json();
  const data = readData<Testimonial>("testimonials", defaultTestimonials);
  data.push(item);
  writeData("testimonials", data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const { index } = await req.json();
  const data = readData<Testimonial>("testimonials", defaultTestimonials);
  data.splice(index, 1);
  writeData("testimonials", data);
  return NextResponse.json({ success: true });
}
