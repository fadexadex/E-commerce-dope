import Joi from "joi";

export const validateId = Joi.object({
  id: Joi.string().required(),
});

export const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});
