import { Request, Response, NextFunction } from "express";
import { validateId } from "./schemas";

export const getUserByIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateId.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
