import { PrismaClient } from "@prisma/client";

class OrderRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  
}
