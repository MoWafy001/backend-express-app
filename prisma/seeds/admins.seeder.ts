import { PrismaClient } from "@prisma/client";
import { Role } from "../../src/common/enums/role.enum";
import { hashPassword } from "../../src/lib/password/passwords";

export const adminSeeder = async (prisma: PrismaClient) => {
  // super admin
  await prisma.admin.upsert({
    where: { email: "super@app.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "super@app.com",
      password: hashPassword("password"),
      role: Role.SUPER_ADMIN,
    },
  });
};
