import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  orderSchema,
  updateOrderStatusSchema,
  orderIdSchema,
  userIdSchema,
} from "./schemas";
import { AppError } from "../../../middlewares/error.handler";


export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = orderSchema.validate(req.body, { abortEarly: false });
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

export const validateOrderStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateOrderStatusSchema.validate(req.body);
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

export const validateOrderId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = orderIdSchema.validate(req.params);
  if (error) {
    return next(new AppError("Invalid order ID", StatusCodes.BAD_REQUEST));
  }
  next();
};

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userIdSchema.validate(req.params);
  if (error) {
    return next(new AppError("Invalid user ID", StatusCodes.BAD_REQUEST));
  }
  next();
};
