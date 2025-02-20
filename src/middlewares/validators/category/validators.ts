import { Request, Response, NextFunction } from "express";
import { validateId, categorySchema } from "./schemas";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../middlewares/error.handler";

export const categoryIdValidator = async (
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

export const categoryValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    next(
      new AppError(
        error.details.map((err) => err.message).join(", "),
        StatusCodes.BAD_REQUEST
      )
    );
  }
  next();
};
