import { PrismaClient } from "@prisma/client";
import { adminSeeder } from "./seeds/admin.seeder";
const prisma = new PrismaClient();

const seeders = [adminSeeder];

async function main() {
  for (const seeder of seeders) {
    await seeder(prisma);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
