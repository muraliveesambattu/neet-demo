import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getChapterFrequencies } from "@/lib/pattern-analysis";
import type { Subject } from "@prisma/client";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject") as Subject | null;

  const frequencies = await getChapterFrequencies(subject ?? undefined);
  return NextResponse.json(frequencies);
}
