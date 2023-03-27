import ProductRepository  from "../repositories/product.repository"
import Product  from "../models/product.model"

export function makeProductService (productRepository: ProductRepository) {
  return {
    getProduct: async (id: number) => {
      return await productRepository.get(id)
    },

    getProducts: async () => {
      return await productRepository.all()
    },

    createProduct: async (data: Product) => {
      return await productRepository.create(data)
    },

    updateProduct: async (id: number, data: Product) => {
      return await productRepository.update(id, data)
    },

    deleteProduct: async (id: number) => {
      await productRepository.delete(id)
    }
  }
}
