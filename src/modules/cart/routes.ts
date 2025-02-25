import { Router } from "express";
import { CartController } from "./controller";
import { authGuard } from "../../middlewares/auth.middleware";
import {
  addCartItemValidator,
  updateCartItemValidator,
  itemIdValidator,
} from "../../middlewares/validators/cart/validators";

const router = Router();
const cartController = new CartController();

router.post("/", authGuard, addCartItemValidator, cartController.addCartItem);
router.get("/", authGuard, cartController.getCart);
router.put(
  "/item",
  authGuard,
  updateCartItemValidator,
  cartController.updateCartItemQuantity
);
router.delete(
  "/item/:itemId",
  authGuard,
  itemIdValidator,
  cartController.removeCartItem
);
router.delete("/clear", authGuard, cartController.clearCart);

export default router;
