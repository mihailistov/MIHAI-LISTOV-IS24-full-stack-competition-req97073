import ProductRepository  from "../repositories/product.repository"
import Product, { ProductInput }  from "../models/product.model"

export function makeProductService (productRepository: ProductRepository) {
  return {
    getProduct: async (productId: string): Promise<Product> => {
      return await productRepository.get(productId)
    },

    getProducts: async (): Promise<Array<Product>> => {
      return await productRepository.all()
    },

    createProduct: async (data: ProductInput): Promise<Product> => {
      return await productRepository.create(data)
    },

    updateProduct: async (productId: string, data: ProductInput): Promise<Product> => {
      return await productRepository.update(productId, data)
    },

    deleteProduct: async (productId: string) => {
      await productRepository.delete(productId)
    }
  }
}
