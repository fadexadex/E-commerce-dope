import { ICreateOrder, IOrderStatus } from "utils/types";
import { OrderRepository } from "../repository";

const orderRepository = new OrderRepository();

export class OrderService {
  async createOrder(data: ICreateOrder) {
    return await orderRepository.createOrder(data);
  }

  async getOrders() {
    return await orderRepository.getOrders();
  }

  async getOrderById(id: string) {
    return await orderRepository.getOrderById(id);
  }

  async updateOrderStatus(id: string, status: IOrderStatus) {
    return await orderRepository.updateOrderStatus(id, status);
  }

  async cancelOrder(id: string) {
    return await orderRepository.cancelOrder(id);
  }

  async getUserOrders(userId: string) {
    return await orderRepository.getUserOrders(userId);
  }
}