import { PrismaClient } from "@prisma/client";
import { adminSeeder } from "./seeds/admins.seeder";
import { usersSeeder } from "./seeds/users.seeder";
const prisma = new PrismaClient();

const seeders = [adminSeeder, usersSeeder];

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
