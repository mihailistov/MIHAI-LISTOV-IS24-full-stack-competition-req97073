import Product from '../models/product.model'

export interface ProductRepositoryInterface {
  all(): Promise<Product[]>;
  get(id: number): Promise<Product | any>;
  create(data: Product): Promise<Product>;
  update(id: number, data: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}