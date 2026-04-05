import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createSchema = z.object({
  subject: z.enum(["PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY"]),
  chapter: z.string().min(1),
  concept: z.string().min(1),
  year: z.number().int().min(2000).max(2030).optional().nullable(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  questionText: z.string().min(10),
  optionA: z.string().min(1),
  optionB: z.string().min(1),
  optionC: z.string().min(1),
  optionD: z.string().min(1),
  correctOption: z.enum(["A", "B", "C", "D"]),
  explanation: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
});

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");
  const chapter = searchParams.get("chapter");
  const difficulty = searchParams.get("difficulty");
  const year = searchParams.get("year");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);

  const where: Record<string, unknown> = { isActive: true };
  if (subject) where.subject = subject;
  if (chapter) where.chapter = chapter;
  if (difficulty) where.difficulty = difficulty;
  if (year) where.year = parseInt(year);

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, subject: true, chapter: true, concept: true,
        year: true, difficulty: true, questionText: true,
        optionA: true, optionB: true, optionC: true, optionD: true,
        correctOption: true, explanation: true, tags: true, isActive: true,
      },
    }),
    prisma.question.count({ where }),
  ]);

  return NextResponse.json({ questions, total, page, limit });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const data = createSchema.parse(body);
    const question = await prisma.question.create({ data });
    return NextResponse.json(question, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
