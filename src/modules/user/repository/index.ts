import { Prisma, PrismaClient } from "@prisma/client";

export class UserRepository {
  private prisma = new PrismaClient();

  getUserById = async (id: string) => {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  };

  updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  };

  deleteUser = async (id: string) => {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  };
}
