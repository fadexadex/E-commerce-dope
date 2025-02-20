import { Prisma, PrismaClient } from "@prisma/client";
import { ICreateProduct, IUpdateProduct } from "utils/types";

export class ProductRepository {
  private prisma = new PrismaClient();

  createProduct = async (data: ICreateProduct) => {
    const { categoryId, ...productData } = data;
    return this.prisma.product.create({
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
    return this.prisma.product.findMany();
  };

  getProductById = async (id: string) => {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  };

  updateProduct = async (id: string, data: IUpdateProduct) => {
    const { categoryId, ...productData } = data;

    return this.prisma.product.update({
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
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  };
}
