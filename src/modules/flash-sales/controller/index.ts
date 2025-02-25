import { FlashSaleService } from "../service";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const flashSaleService = new FlashSaleService();

export class FlashSaleController {
  async createFlashSale(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const flashSale = await flashSaleService.createFlashSale(data);
      res.status(StatusCodes.CREATED).json(flashSale);
    } catch (error) {
      next(error);
    }
  }

  async getActiveFlashSales(req: Request, res: Response, next: NextFunction) {
    try {
      const flashSales = await flashSaleService.getActiveFlashSales();
      res.status(StatusCodes.OK).json(flashSales);
    } catch (error) {
      next(error);
    }
  }

  async getFlashSaleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const flashSale = await flashSaleService.getFlashSaleById(id);
      res.status(StatusCodes.OK).json(flashSale);
    } catch (error) {
      next(error);
    }
  }

  async updateFlashSale(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedFlashSale = await flashSaleService.updateFlashSale(id, data);
      res.status(StatusCodes.OK).json(updatedFlashSale);
    } catch (error) {
      next(error);
    }
  }

  async deleteFlashSale(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await flashSaleService.deleteFlashSale(id);
      res
        .status(StatusCodes.OK)
        .json({ message: "Flash sale deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
