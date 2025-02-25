import { Prisma, PrismaClient } from "@prisma/client";
import { ICreateProduct, IUpdateProduct } from "utils/types";
import { prisma } from "../../../utils/db";

export class ProductRepository {

  createProduct = async (data: ICreateProduct) => {
    const { categoryId, ...productData } = data;
    return prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  };

  getAllProducts = async () => {
    return prisma.product.findMany();
  };

  getProductById = async (id: string) => {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  };

  updateProduct = async (id: string, data: IUpdateProduct) => {
    const { categoryId, ...productData } = data;

    return prisma.product.update({
      where: {
        id,
      },
      data: {
        ...productData,
        ...(categoryId && {
          category: {
            connect: {
              id: categoryId,
            },
          },
        }),
      },
    });
  };

  deleteProduct = async (id: string) => {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  };
}
