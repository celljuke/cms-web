import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create demo users
  const demoPassword = await bcryptjs.hash("password123", 12);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@genai-labs.io" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@genai-labs.io",
      emailVerified: true,
    },
  });

  // Check if account already exists for this user
  const existingAccount = await prisma.account.findFirst({
    where: {
      userId: demoUser.id,
      providerId: "credential",
    },
  });

  if (!existingAccount) {
    await prisma.account.create({
      data: {
        accountId: "demo-account",
        providerId: "credential",
        password: demoPassword,
        userId: demoUser.id,
      },
    });
  }

  console.log("🌱 Demo user created:", demoUser.email);
  console.log("🌱 Database seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
