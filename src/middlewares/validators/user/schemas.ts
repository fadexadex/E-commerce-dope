import Joi from "joi";

export const validateId = Joi.object({
  id: Joi.string().required(),
});
