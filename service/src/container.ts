import { asClass, asFunction, createContainer } from "awilix";
import { makeProductService } from "./services/product.service";
import ProductRepository from "./repositories/product.repository";

export const configureContainer = () => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  });

  container.register({
    productService: asFunction(makeProductService).scoped(),
    productRepository: asClass(ProductRepository).scoped(),
  })

  return container;
}
