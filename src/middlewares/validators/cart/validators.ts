import { Request, Response, NextFunction } from "express";
import { cartItemSchema, updateCartItemSchema, itemIdSchema } from "./schemas";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../middlewares/error.handler";

export const addCartItemValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = cartItemSchema.validate(req.body);
  if (error) {
    return next(
      new AppError(
        error.details.map((err) => err.message).join(", "),
        StatusCodes.BAD_REQUEST
      )
    );
  }
  next();
};

export const updateCartItemValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateCartItemSchema.validate(req.body);
  if (error) {
    return next(
      new AppError(
        error.details.map((err) => err.message).join(", "),
        StatusCodes.BAD_REQUEST
      )
    );
  }
  next();
};

export const itemIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = itemIdSchema.validate(req.params);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
  next();
};
