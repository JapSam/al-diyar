import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readData, writeData } from "@/lib/data-store";
import { team as defaultTeam } from "@/data/team";
import type { TeamMember } from "@/data/team";

async function guard() {
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json(readData<TeamMember>("team", defaultTeam));
}

export async function POST(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const member: TeamMember = await req.json();
  const data = readData<TeamMember>("team", defaultTeam);
  data.push(member);
  writeData("team", data);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const { index, ...member } = await req.json();
  const data = readData<TeamMember>("team", defaultTeam);
  if (index < 0 || index >= data.length) return NextResponse.json({ error: "غير موجود" }, { status: 404 });
  data[index] = member;
  writeData("team", data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const { index } = await req.json();
  const data = readData<TeamMember>("team", defaultTeam);
  data.splice(index, 1);
  writeData("team", data);
  return NextResponse.json({ success: true });
}
