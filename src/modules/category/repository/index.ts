import { Prisma, PrismaClient } from "@prisma/client";

export class CategoryRepository {
  private prisma = new PrismaClient();

  createCategory = async (data: Prisma.CategoryCreateInput) => {
    return this.prisma.category.create({
      data,
    });
  };

  getAllCategories = async () => {
    return this.prisma.category.findMany();
  };

  getCategoryById = async (id: string) => {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  };

  updateCategory = async (id: string, data: Prisma.CategoryUpdateInput) => {
    return this.prisma.category.update({
      where: {
        id,
      },
      data,
    });
  };

  deleteCategory = async (id: string) => {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
