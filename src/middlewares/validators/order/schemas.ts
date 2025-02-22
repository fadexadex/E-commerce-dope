import Joi from "joi";
import { OrderStatus } from "@prisma/client"; // Import Prisma order status enum

export const orderSchema = Joi.object({
  userId: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
  totalPrice: Joi.number().positive().required(),
  shippingAddress: Joi.string().required(),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(OrderStatus))
    .required(),
});

export const orderIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const userIdSchema = Joi.object({
  userId: Joi.string().required(),
});
