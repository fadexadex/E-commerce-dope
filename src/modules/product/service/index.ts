import { ProductRepository } from "../repository";
import { Prisma } from "@prisma/client";

const productRepository = new ProductRepository();

export class ProductService {
  createProduct = async (data: Prisma.ProductCreateInput) => {
    return productRepository.createProduct(data);
  };

  getAllProducts = async () => {
    return productRepository.getAllProducts();
  };

  getProductById = async (id: string) => {
    return productRepository.getProductById(id);
  };

  updateProduct = async (id: string, data: any) => {
    return productRepository.updateProduct(id, data);
  };

  deleteProduct = async (id: string) => {
    return productRepository.deleteProduct(id);
  };
}
