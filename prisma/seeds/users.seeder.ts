import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../src/lib/password/passwords";
import { faker } from "@faker-js/faker";

export const usersSeeder = async (prisma: PrismaClient) => {
  // 5 random users
  for (const i of Array(5).keys()) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashPassword("password"),
        mobile: faker.phone.number(),
        country: faker.location.country(),
        dateOfBirth: faker.date.past(),
      },
    });
  }
};
