import { Request, Response, NextFunction } from "express";
import { CartService } from "../service";
import { StatusCodes } from "http-status-codes";

const cartService = new CartService();

export class CartController {
  async addCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const item = req.body;
      const cartItem = await cartService.addCartItem(userId, item);
      return res.status(StatusCodes.CREATED).json(cartItem);
    } catch (error) {
      next(error);
    }
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const cart = await cartService.getCart(userId);
      return res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      next(error);
    }
  }

  async updateCartItemQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId, quantity } = req.body;
      const updatedItem = await cartService.updateCartItemQuantity(itemId, quantity);
      return res.status(StatusCodes.OK).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  async removeCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;
      await cartService.removeCartItem(itemId);
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      await cartService.clearCart(userId);
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}