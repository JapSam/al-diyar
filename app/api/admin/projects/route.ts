import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readData, writeData } from "@/lib/data-store";
import { projects as defaultProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

async function guard() {
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  const data = readData<Project>("projects", defaultProjects);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const project: Project = await req.json();
  const data = readData<Project>("projects", defaultProjects);
  data.push(project);
  writeData("projects", data);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const updated: Project = await req.json();
  const data = readData<Project>("projects", defaultProjects);
  const idx = data.findIndex((p) => p.id === updated.id);
  if (idx === -1) return NextResponse.json({ error: "غير موجود" }, { status: 404 });
  data[idx] = updated;
  writeData("projects", data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await req.json();
  const data = readData<Project>("projects", defaultProjects);
  const filtered = data.filter((p) => p.id !== id);
  writeData("projects", filtered);
  return NextResponse.json({ success: true });
}
