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
      const newProduct = await productRepository.create(data)
      return newProduct
    },

    updateProduct: async (id: number, data: Product) => {
      const product = await productRepository.update(id, data)
      return product
    },

    deleteProduct: async (id: number) => {
      await productRepository.delete(id)
    }
  }
}
