import path from "path";
import {
  PrismaClient,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { parseCsv } from "./parse-csv";


const csvPaths = {
  users: path.join(__dirname, "csv-files/users.csv"),
  categories: path.join(__dirname, "csv-files/categories.csv"),
  products: path.join(__dirname, "csv-files/products.csv"),
  orders: path.join(__dirname, "csv-files/orders.csv"),
  orderItems: path.join(__dirname, "csv-files/order_items.csv"),
  cart: path.join(__dirname, "csv-files/cart.csv"),
  flashSales: path.join(__dirname, "csv-files/flash_sales.csv"),
};

const prisma = new PrismaClient();

const migrateUsers = async () => {
  try {
    const rawUsers = await parseCsv(csvPaths.users);
    const users = rawUsers.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as "CUSTOMER" | "ADMIN",
      createdAt: new Date (user.createdAt),
      updatedAt: new Date(user.updatedAt),
    }));

    await prisma.user.createMany({ data: users, skipDuplicates: true });
    console.log("Users migration completed.");
  } catch (error) {
    console.error("Error migrating users: ", error);
  }
};

const migrateCategories = async () => {
  try {
    const rawCategories = await parseCsv(csvPaths.categories);
    const categories = rawCategories.map((category) => ({
      id: category.id,
      name: category.name,
      createdAt: new Date(category.createdAt),
      updatedAt: new Date(category.updatedAt),
    }));
    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });
    console.log("Categories migration completed.");
  } catch (error) {
    console.error("Error migrating categories: ", error);
  }
};

const migrateProducts = async () => {
  try {
    const rawProducts = await parseCsv(csvPaths.products);

    const products = rawProducts.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: new Decimal(product.price),
      stock: parseInt(product.stock),
      categoryId: product.categoryId,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt),
    }));

    await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });
    console.log("Products migration completed.");
  } catch (error) {
    console.error("Error migrating products: ", error);
  }
};

const migrateOrders = async () => {
  try {
    const rawOrders = await parseCsv(csvPaths.orders);

    const orders = rawOrders.map((order) => ({
      id: order.id,
      userId: order.userId,
      totalPrice: new Decimal(order.totalPrice),
      status: order.status as   "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED",
      shippingAddress: order.shippingAddress || "",
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
    }));

    await prisma.order.createMany({
      data: orders,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error("Error migrating orders: ", error);
  }
};

const migrateOrderItems = async () => {
  try {
    const rawOrderItems = await parseCsv(csvPaths.orderItems);

    const orderItems = rawOrderItems.map((item) => ({
      id: item.id,
      orderId: item.orderId,
      productId: item.productId,
      quantity: parseInt(item.quantity),
      price: new Decimal(item.price),

    }));

    await prisma.orderItem.createMany({
      data: orderItems,
      skipDuplicates: true,
    });
    console.log("Order Items migration completed.");
  } catch (error) {
    console.error("Error migrating order items: ", error);
  }
};

const migrateCart = async () => {
  try {
    const rawCart = await parseCsv(csvPaths.cart);

    const cartItems= rawCart.map((cart) => ({
      id: cart.id,
      userId: cart.userId,
      productId: cart.productId,
      quantity: parseInt(cart.quantity),
    }));

    await prisma.cart.createMany({
      data: cartItems,
      skipDuplicates: true,
    });
    console.log("Cart migration completed.");
  } catch (error) {
    console.error("Error migrating cart: ", error);
  }
};

const migrateFlashSales = async () => {
  try {
    const rawFlashSales = await parseCsv(csvPaths.flashSales);

    const flashSales = rawFlashSales.map((sale) => ({
      id: sale.id,
      productId: sale.productId,
      name: sale.name,
      discountPercentage: new Decimal(sale.discountPercentage),
      startTime: new Date(sale.startTime),
      endTime: new Date(sale.endTime),
      stockLimit: parseInt(sale.stockLimit, 10),
    }));

    await prisma.flashSale.createMany({
      data: flashSales,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error("Error migrating flash sales: ", error);
  }
};

const migrateAll = async () => {
  await migrateUsers();
  await migrateCategories();
  await migrateProducts();
  await migrateOrders();
  await migrateOrderItems();
  await migrateCart();
  await migrateFlashSales();
  console.log("Migrations completed.");
};

migrateAll().catch((error) => {
  console.error("Migration failed: ", error);
  process.exit(1);
});
