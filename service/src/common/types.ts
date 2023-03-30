import Product from '../models/product.model'

export interface ProductRepositoryInterface {
  all(): Promise<Product[]>;
  get(productId: string): Promise<Product | any>;
  create(data: Product): Promise<Product>;
  update(productId: string, data: Product): Promise<Product>;
  delete(productId: string): Promise<void>;
}