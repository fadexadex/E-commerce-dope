import { FlashSaleRepository } from "../repository";
import { Prisma } from "@prisma/client";

const flashSaleRepository = new FlashSaleRepository();

export class FlashSaleService {
  async createFlashSale(data: Prisma.FlashSaleCreateInput) {
    return flashSaleRepository.createFlashSale(data);
  }

  async getActiveFlashSales() {
    return flashSaleRepository.getActiveFlashSales();
  }

  async getFlashSaleById(id: string) {
    return flashSaleRepository.getFlashSaleById(id);
  }

  async updateFlashSale(id: string, data: Prisma.FlashSaleUpdateInput) {
    return flashSaleRepository.updateFlashSale(id, data);
  }

  async deleteFlashSale(id: string) {
    return flashSaleRepository.deleteFlashSale(id);
  }
}
