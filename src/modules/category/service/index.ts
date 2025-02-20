import { CategoryRepository } from "../repository";
import { Prisma } from "@prisma/client";

const categoryRepository = new CategoryRepository();

export class CategoryService {
  createCategory = async (data: Prisma.CategoryCreateInput) => {
    return categoryRepository.createCategory(data);
  };

  getAllCategories = async () => {
    return categoryRepository.getAllCategories();
  };

  getCategoryById = async (id: string) => {
    return categoryRepository.getCategoryById(id);
  };

  updateCategory = async (id: string, data: Prisma.CategoryUpdateInput) => {
    return categoryRepository.updateCategory(id, data);
  };

  deleteCategory = async (id: string) => {
    return categoryRepository.deleteCategory(id);
  };
}
