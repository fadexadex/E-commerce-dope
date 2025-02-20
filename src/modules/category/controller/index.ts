import { Prisma } from "@prisma/client";
import { CategoryService } from "../service";

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const categoryService = new CategoryService();

export class CategoryController {
  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const category = await categoryService.createCategory(data);
      res.status(StatusCodes.CREATED).json({
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Category name already exists"
          });
        }
      }
      next(error);
    }
  };

  getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(StatusCodes.OK).json({
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const category = await categoryService.getCategoryById(id);
      res.status(StatusCodes.OK).json({
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const category = await categoryService.updateCategory(id, data);
      res.status(StatusCodes.OK).json({
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await categoryService.deleteCategory(id);
      res.status(StatusCodes.OK).json({
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  
}
