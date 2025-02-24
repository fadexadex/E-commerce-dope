import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.handler";
import authRoutes from "./modules/auth/routes";
import userRoutes from "./modules/user/routes";
import productRoutes from "./modules/product/routes";
import categoryRoutes from "./modules/category/routes";
import orderRoutes from "./modules/order/routes";
import { rateLimit } from "express-rate-limit";

dotenv.config();

export class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  private configureRateLimit() {
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
      })
    );
  }

  private enableMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.configureRateLimit();
    this.app.use(errorHandler);
  }

  private setUpRoutes() {
    this.app.use("/api/v1/auth", authRoutes);
    this.app.use("/api/v1/users", userRoutes);
    this.app.use("/api/v1/products/category", categoryRoutes);
    this.app.use("/api/v1/products", productRoutes);
    this.app.use("/api/v1/orders", orderRoutes);
    this.app.use(errorHandler);
  }

  public startApp() {
    this.enableMiddlewares();
    this.setUpRoutes();
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
