import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../database/prisma";
import { hashPassword } from "@lib/password/passwords";

export class UsersService {
  async create(attributes: Prisma.UserCreateInput) {
    attributes.password =
      attributes.password && hashPassword(attributes.password);

    return prisma.user.create({
      data: attributes,
    });
  }

  async findMany(options: Prisma.UserFindManyArgs = {}) {
    options.take = options.take || 10;
    options.skip = options.skip || 0;

    const data = await prisma.user.findMany(options);
    const total = await prisma.user.count({
      where: options.where,
    });

    return {
      data,
      total,
      perPage: Math.min(options.take, total),
      page: Math.floor(options.skip / options.take) + 1,
    };
  }

  async findFirstOrThrow(options?: Prisma.UserWhereInput) {
    return prisma.user.findFirstOrThrow({
      where: options,
    });
  }

  async update(
    options: Prisma.UserWhereUniqueInput,
    attributes: Prisma.XOR<
      Prisma.UserUpdateInput,
      Prisma.UserUncheckedUpdateInput
    >
  ) {
    attributes.password =
      attributes.password && hashPassword(attributes.password.toString());

    return prisma.user.update({
      where: options,
      data: attributes,
    });
  }

  async delete(options: Prisma.UserWhereUniqueInput) {
    return prisma.user.delete({
      where: options,
    });
  }
}
