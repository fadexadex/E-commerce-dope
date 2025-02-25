import Joi from "joi";

export const cartItemSchema = Joi.object({
  productId: Joi.string().required(), 
  quantity: Joi.number().integer().min(1).required(), 
});

export const updateCartItemSchema = Joi.object({
  productId: Joi.string().required(), 
  quantity: Joi.number().integer().min(1).required(), 
});

export const itemIdSchema = Joi.object({
  itemId: Joi.string().required(), 
});
