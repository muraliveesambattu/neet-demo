import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { physicsQuestions } from "./questions-physics";
import { chemistryQuestions } from "./questions-chemistry";
import { botanyQuestions } from "./questions-botany";
import { zoologyQuestions } from "./questions-zoology";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create users
  const adminHash = await bcrypt.hash("admin123", 12);
  const studentHash = await bcrypt.hash("student123", 12);

  await prisma.user.upsert({
    where: { email: "admin@neet.dev" },
    update: {},
    create: {
      email: "admin@neet.dev",
      name: "Admin",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "student@neet.dev" },
    update: {},
    create: {
      email: "student@neet.dev",
      name: "Demo Student",
      passwordHash: studentHash,
      role: "STUDENT",
    },
  });

  await prisma.user.upsert({
    where: { email: "student2@neet.dev" },
    update: {},
    create: {
      email: "student2@neet.dev",
      name: "Priya Sharma",
      passwordHash: studentHash,
      role: "STUDENT",
    },
  });

  console.log("✅ Users created");

  // Seed questions
  const allQuestions = [
    ...physicsQuestions,
    ...chemistryQuestions,
    ...botanyQuestions,
    ...zoologyQuestions,
  ];

  const result = await prisma.question.createMany({
    data: allQuestions,
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${result.count} questions`);
  console.log(`   Physics: ${physicsQuestions.length}`);
  console.log(`   Chemistry: ${chemistryQuestions.length}`);
  console.log(`   Botany: ${botanyQuestions.length}`);
  console.log(`   Zoology: ${zoologyQuestions.length}`);
  console.log("");
  console.log("Demo credentials:");
  console.log("  Admin:   admin@neet.dev   / admin123");
  console.log("  Student: student@neet.dev / student123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
