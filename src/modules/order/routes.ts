import { OrderController } from "./controller";
import { Router } from "express";
import {
  validateOrder,
  validateOrderStatus,
  validateOrderId,
  validateUserId,
} from "../../middlewares/validators/order/validators";
import {
  authGuard,
  adminGuard,
  validateUserRequest,
} from "../../middlewares/auth.middleware";

const orderController = new OrderController();
const router = Router();

router.post("/create", authGuard, validateOrder, orderController.createOrder);
router.get("/", authGuard, adminGuard, orderController.getOrders);
router.get("/:id", authGuard, validateOrderId, orderController.getOrderById);
router.get(
  "/user/:userId",
  authGuard,
  validateUserRequest,
  validateUserId,
  orderController.getUserOrders
);
router.patch(
  "/:id/status",
  authGuard,
  adminGuard,
  validateOrderId,
  validateOrderStatus,
  orderController.updateOrderStatus
);
router.patch(
  "/:id/cancel",
  authGuard,
  adminGuard,
  validateOrderId,
  orderController.cancelOrder
);

export default router;
