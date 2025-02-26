import Joi from "joi";

export const cartItemSchema = Joi.object({
  productId: Joi.string().required(), 
  quantity: Joi.number().integer().min(1).required(), 
  price: Joi.number().required(),
});


export const itemIdSchema = Joi.object({
  itemId: Joi.string().required(), 
});
