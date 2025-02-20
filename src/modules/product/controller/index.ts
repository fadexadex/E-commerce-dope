import { StatusCodes } from "http-status-codes";
import { ProductService } from "../service";

import { Request, Response, NextFunction } from "express";

const productService = new ProductService();

export class ProductController {
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const product = await productService.createProduct(data);
      res.status(StatusCodes.CREATED).json({
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAllProducts();
      if (!(products.length > 0)) {
        return res.status(StatusCodes.OK).json({
          message: "No products found",
        });
      }
      res.status(StatusCodes.OK).json({
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Product not found",
        });
      }
      res.status(StatusCodes.OK).json({
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const product = await productService.updateProduct(id, data);
      res.status(StatusCodes.OK).json({
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await productService.deleteProduct(id);
      res.status(StatusCodes.OK).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
