import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export class CategoryRepository {
  createCategory = async (data: Prisma.CategoryCreateInput) => {
    return prisma.category.create({
      data,
    });
  };

  getAllCategories = async () => {
    return prisma.category.findMany();
  };

  getCategoryById = async (id: string) => {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  };

  updateCategory = async (id: string, data: Prisma.CategoryUpdateInput) => {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  };

  deleteCategory = async (id: string) => {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  };
}
