import { ICartItem } from "utils/types";
import { prisma } from "../../../utils/db";

export class CartRepository {
  async addCartItem(userId: string, item: ICartItem) {
    return prisma.$transaction(async (tx) => {
      const productExists = await tx.product.findUnique({
        where: { id: item.productId },
      });
      if (!productExists) {
        throw new Error("Product not found");
      }

      let cart = await tx.cart.findUnique({
        where: { userId },
      });
      
      if (!cart) {
        cart = await tx.cart.create({
          data: { userId },
        });
      }

      const existingItem = await tx.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: item.productId,
        },
      });

      if (existingItem) {
        return await tx.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + item.quantity },
        });
      }

      return await tx.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        },
      });
    });
  }

  async getCart(userId: string) {
    return await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
  }

  async removeCartItem(itemId: string) {
    return await prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(userId: string) {
    return await prisma.cartItem.deleteMany({
      where: { cart: { userId } },
    });
  }
}
