import Product, { ProductInput } from "../models/product.model";
import { createRandomProductArray } from "../config/seed";
import { ProductRepositoryInterface } from "../common/types";
import { Methodology } from "../models/product.model";
import crypto from "crypto";

// initialize the array of products
const _products: Array<Product> = createRandomProductArray();

export default class ProductRepository implements ProductRepositoryInterface {
  async all(): Promise<Product[]> {
    return _products;
  }

  async get(productId: string): Promise<Product | any> {
    const product = _products.find(x => x.productId === productId)
    if (product) return product
  }
  
  async create(data: ProductInput): Promise<Product> {
    const newProduct = new Product()

    newProduct.productId = crypto.randomUUID();
    newProduct.name = data.name
    newProduct.owner = data.owner
    newProduct.scrumMaster = data.scrumMaster
    newProduct.developerNames = data.developerNames
    newProduct.methodology = data.methodology
    newProduct.startDate = data.startDate
    
    _products.push(newProduct)
    return newProduct
  }
  
  async update(productId: string, data: ProductInput): Promise<Product> {
    const product = await this.get(productId)
    
    if (product) {
      product.name = data.name
      product.owner = data.owner
      product.scrumMaster = data.scrumMaster
      product.developerNames = data.developerNames

      let methodology: string = Methodology[data.methodology]
      product.methodology = methodology

      product.startDate = data.startDate
    }

    return product
  }
  
  async delete(productId: string): Promise<void> {
    const product = await this.get(productId)
    if (product) {
      const idx = _products.indexOf(product)
      if (idx === -1) return
      _products.splice(idx, 1)
    }
  }
}
