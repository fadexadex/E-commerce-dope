import { Router } from "express";
import { FlashSaleController } from "./controller";
import { adminGuard, authGuard } from "../../middlewares/auth.middleware";
import {
  flashSaleIdValidator,
  updateFlashSaleValidator,
  flashSaleValidator,
} from "../../middlewares/validators/flash-sales/validators";

const router = Router();
const flashSaleController = new FlashSaleController();

router.post(
  "/",
  authGuard,
  adminGuard,
  flashSaleValidator,
  flashSaleController.createFlashSale
);
router.get("/", authGuard, flashSaleController.getActiveFlashSales);
router.get(
  "/:id",
  authGuard,
  flashSaleIdValidator,
  flashSaleController.getFlashSaleById
);
router.put(
  "/:id",
  authGuard,
  adminGuard,
  flashSaleIdValidator,
  updateFlashSaleValidator, 
  flashSaleController.updateFlashSale
);

router.delete(
  "/:id",
  authGuard,
  adminGuard,
  flashSaleIdValidator,
  flashSaleController.deleteFlashSale
);

export default router;
