import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export class FlashSaleRepository {
  async createFlashSale(data: Prisma.FlashSaleCreateInput) {
    return prisma.flashSale.create({
      data,
    });
  }

  async getActiveFlashSales() {
    return prisma.flashSale.findMany({
      where: {
        startTime: { lte: new Date() },
        endTime: { gte: new Date() },
      },
    });
  }

  async getFlashSaleById(id: string) {
    return prisma.flashSale.findUnique({
      where: { id },
    });
  }

  async updateFlashSale(id: string, data: Prisma.FlashSaleUpdateInput) {
    return prisma.flashSale.update({
      where: { id },
      data,
    });
  }

  async deleteFlashSale(id: string) {
    return prisma.flashSale.delete({
      where: { id },
    });
  }
}
