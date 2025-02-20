import { Prisma, PrismaClient } from "@prisma/client";

export class ProductRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  createProduct = async (data: Prisma.ProductCreateInput) => {
    return this.prisma.product.create({
      data,
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

  updateProduct = async (id: string, data: Prisma.ProductUpdateInput) => {
    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  };

  deleteProduct = async (id: string) => {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
