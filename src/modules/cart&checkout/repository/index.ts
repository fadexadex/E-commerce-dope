import { PrismaClient } from "@prisma/client";

class CartCheckoutRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  
}
