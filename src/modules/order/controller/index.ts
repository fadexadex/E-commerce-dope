import { OrderService } from "../service";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const orderService = new OrderService();

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const order = await orderService.createOrder(data);
      res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getOrders();
      res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const orders = await orderService.getUserOrders(userId);
      res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await orderService.updateOrderStatus(id, status);
      res
        .status(StatusCodes.OK)
        .json({ message: "Order status updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await orderService.cancelOrder(id);
      res
        .status(StatusCodes.OK)
        .json({ message: "Order Successfully Cancelled" });
    } catch (error) {
      next(error);
    }
  }
}
