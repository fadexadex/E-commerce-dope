import Joi from "joi";

export const validateId = Joi.object({
  id: Joi.string().required(),
});

export const flashSaleSchema = Joi.object({
  productId: Joi.string().required(),
  discountPercentage: Joi.number().min(1).max(100).required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().greater(Joi.ref("startTime")).required(),
  stockLimit: Joi.number().integer().min(1).required(),
});
