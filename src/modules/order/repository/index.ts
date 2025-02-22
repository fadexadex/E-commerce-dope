import { PrismaClient } from "@prisma/client";
import { ICreateOrder, IOrderStatus } from "utils/types";

export class OrderRepository {
  private prisma = new PrismaClient();

  async createOrder(data: ICreateOrder) {
    const { userId, items, ...orderData } = data;
  
    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          ...orderData,
          user: {
            connect: { id: userId },
          },
          items: {
            create: await Promise.all(
              items.map(async (item) => {
                const product = await tx.product.findUnique({
                  where: { id: item.productId },
                  select: { price: true, stock: true },
                });
  
                if (!product) {
                  throw new Error(`Product with ID ${item.productId} not found`);
                }
  
                if (product.stock < item.quantity) {
                  throw new Error(`Not enough stock for product ${item.productId}`);
                }
  
                return {
                  quantity: item.quantity,
                  price: product.price,
                  product: {
                    connect: { id: item.productId },
                  },
                };
              })
            ),
          },
        },
      });
  
      await Promise.all(
        items.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: {
              stock: { decrement: item.quantity },
            },
          })
        )
      );
  
      return order;
    });
  }
  

  async getOrders() {
    return await this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getOrderById(id: string) {
    return await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getUserOrders(userId: string) {
    return await this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateOrderStatus(id: string, status: IOrderStatus) {
    return await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async cancelOrder(id: string) {
    return await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: "CANCELLED",
      },
    });
  }
}
