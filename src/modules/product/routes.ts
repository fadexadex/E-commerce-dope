import { ProductController } from "./controller";
import { Router } from "express";
import { authGuard, adminGuard } from "../../middlewares/auth.middleware";
import { productValidator, updateProductValidator, productIdValidator } from "../../middlewares/validators/product/validators";

const productController = new ProductController();
const router = Router();

router.post("/create", authGuard, adminGuard, productValidator, productController.createProduct);
router.get("/all", authGuard, productController.getAllProducts);
router.get("/:id",authGuard,  productIdValidator, productController.getProductById);
router.put("/:id", authGuard, adminGuard, productIdValidator, updateProductValidator, productController.updateProduct);
router.delete("/:id", authGuard, adminGuard, productIdValidator, productController.deleteProduct);

export default router;
