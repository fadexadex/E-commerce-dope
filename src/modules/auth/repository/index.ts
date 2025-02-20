import { Prisma, PrismaClient } from "@prisma/client";

export class AuthRepository {
  private prisma = new PrismaClient();

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async registerUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }
}

