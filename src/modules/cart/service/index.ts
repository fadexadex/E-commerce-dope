import { CartRepository } from "../repository";
import { ICartItem } from "utils/types";

const cartRepository = new CartRepository();

export class CartService {
  async addCartItem(userId: string, item: ICartItem) {
    return await cartRepository.addCartItem(userId, item);
  }

  async getCart(userId: string) {
    return await cartRepository.getCart(userId);
  }

  async updateCartItemQuantity(itemId: string, quantity: number) {
    return await cartRepository.updateCartItemQuantity(itemId, quantity);
  }

  async removeCartItem(itemId: string) {
    return await cartRepository.removeCartItem(itemId);
  }

  async clearCart(userId: string) {
    return await cartRepository.clearCart(userId);
  }
}
