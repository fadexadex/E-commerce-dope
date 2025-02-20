import { ICreateProduct, IUpdateProduct } from "utils/types";
import { ProductRepository } from "../repository";


const productRepository = new ProductRepository();

export class ProductService {
  createProduct = async (data: ICreateProduct) => {
    return productRepository.createProduct(data);
  };

  getAllProducts = async () => {
    return productRepository.getAllProducts();
  };

  getProductById = async (id: string) => {
    return productRepository.getProductById(id);
  };

  updateProduct = async (id: string, data: IUpdateProduct) => {
    return productRepository.updateProduct(id, data);
  };

  deleteProduct = async (id: string) => {
    return productRepository.deleteProduct(id);
  };
}
