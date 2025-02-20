import { UserController } from "./controller";
import { Router } from "express";
import { getUserByIdValidator } from "../../middlewares/validators/user/validators";

const userController = new UserController();

const router = Router();

router.post("/:id", getUserByIdValidator, userController.getUserById);

export default router;
