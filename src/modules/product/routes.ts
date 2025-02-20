import { ProductController } from "./controller";
import { Router } from "express";
import { authGuard, adminGuard } from "../../middlewares/auth.middleware";

const productController = new ProductController();

const router = Router();

router.post("/create", authGuard, adminGuard, productController.createProduct);
router.get("/all", productController.getAllProducts);
router.get("/:id",  productController.getProductById);
router.put("/:id", authGuard, adminGuard, productController.updateProduct);
router.delete("/:id", authGuard, adminGuard, productController.deleteProduct);

export default router;
