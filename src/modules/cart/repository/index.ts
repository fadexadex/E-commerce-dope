import { ICartItem } from "utils/types";
import { prisma } from "../../../utils/db";

export class CartRepository {
  async addCartItem(userId: string, item: ICartItem) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: item.productId,
      },
    });

    if (existingItem) {
      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      });
    }

    return await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      },
    });
  }

  async getCart(userId: string) {
    return await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
  }

  async updateCartItemQuantity(itemId: string, quantity: number) {
    return await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
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
