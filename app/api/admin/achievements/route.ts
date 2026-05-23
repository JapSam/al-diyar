import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readData, writeData } from "@/lib/data-store";
import { milestones as defaultMilestones, awards as defaultAwards } from "@/data/achievements";
import type { Milestone, Award } from "@/data/achievements";

async function guard() {
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json({
    milestones: readData<Milestone>("milestones", defaultMilestones),
    awards: readData<Award>("awards", defaultAwards),
  });
}

export async function POST(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const { type, item } = await req.json();
  if (type === "milestone") {
    const data = readData<Milestone>("milestones", defaultMilestones);
    data.push(item);
    writeData("milestones", data);
  } else {
    const data = readData<Award>("awards", defaultAwards);
    data.push(item);
    writeData("awards", data);
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const { type, index } = await req.json();
  if (type === "milestone") {
    const data = readData<Milestone>("milestones", defaultMilestones);
    data.splice(index, 1);
    writeData("milestones", data);
  } else {
    const data = readData<Award>("awards", defaultAwards);
    data.splice(index, 1);
    writeData("awards", data);
  }
  return NextResponse.json({ success: true });
}
