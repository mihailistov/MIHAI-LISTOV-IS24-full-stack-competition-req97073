import { asClass, createContainer } from "awilix";
import { ProductService } from "./services/product.service";

export const configureContainer = () => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  });

  container.register({
    productService: asClass(ProductService).scoped()
  })

  return container;
}
