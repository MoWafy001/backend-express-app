import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../database/prisma";
import { hashPassword } from "@lib/password/passwords";

export class AdminsService {
  async create(attributes: Prisma.AdminCreateInput) {
    attributes.password =
      attributes.password && hashPassword(attributes.password);

    return prisma.admin.create({
      data: attributes,
    });
  }

  async findMany(options: Prisma.AdminFindManyArgs = {}) {
    options.take = options.take || 10;
    options.skip = options.skip || 0;

    const data = await prisma.admin.findMany(options);
    const total = await prisma.admin.count({
      where: options.where,
    });

    return {
      data,
      total,
      perPage: Math.min(options.take, total),
      page: Math.floor(options.skip / options.take) + 1,
    };
  }

  async findFirstOrThrow(options?: Prisma.AdminWhereInput) {
    return prisma.admin.findFirstOrThrow({
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
