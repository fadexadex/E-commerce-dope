import { Request, Response, NextFunction } from "express";
import { validateId, flashSaleSchema, updateFlashSaleSchema } from "./schemas";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../middlewares/error.handler";

export const flashSaleIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateId.validate(req.params);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
  next();
};

export const flashSaleValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = flashSaleSchema.validate(req.body);
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

export const updateFlashSaleValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateFlashSaleSchema.validate(req.body);
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
