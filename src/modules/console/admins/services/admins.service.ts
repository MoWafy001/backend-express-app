import { Prisma } from "@prisma/client";
import { prisma } from "../../../../database/prisma";
import { hashPassword } from "../../../../lib/password/passwords";

export class AdminsService {
  async create(attributes: Prisma.AdminCreateInput) {
    attributes.password =
      attributes.password && hashPassword(attributes.password);

    return prisma.admin.create({
      data: attributes,
    });
  }

  async findMany(options?: Prisma.AdminCreateInput) {
    return prisma.admin.findMany({
      where: options,
    });
  }

  async findFirst(options?: Prisma.AdminWhereInput) {
    return prisma.admin.findFirst({
      where: options,
    });
  }

  async update(
    options: Prisma.AdminWhereUniqueInput,
    attributes: Prisma.XOR<
      Prisma.AdminUpdateInput,
      Prisma.AdminUncheckedUpdateInput
    >
  ) {
    console.log(options);
    

    attributes.password =
      attributes.password && hashPassword(attributes.password.toString());

    return prisma.admin.update({
      where: options,
      data: attributes,
    });
  }

  async delete(options: Prisma.AdminWhereUniqueInput) {
    return prisma.admin.delete({
      where: options,
    });
  }
}
