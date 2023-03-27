import Product from "../models/product.model";
import { ProductRepositoryInterface } from "../common/types";
import { Methodology } from "../models/product.model";

// TODO: replace in-memory implementation with redis
const _products: Array<Product> = [
  {
    id: 1,
    name: "Product 1",
    owner: "Owner 1",
    scrumMaster: "Scrum Master 1",
    developerNames: ["Developer 1", "Developer 2"],
    methodology: Methodology.Agile,
    startDate: new Date()
  }
]

export default class ProductRepository implements ProductRepositoryInterface {
  async all(): Promise<Product[]> {
    return _products;
  }

  async get(id: number): Promise<Product | any> {
    const product = _products.find(x => x.id === id)
    if (product) return product
  }
  
  async create(data: Product): Promise<Product> {
    const newProduct = new Product()

    newProduct.id = Date.now()
    newProduct.name = data.name
    newProduct.owner = data.owner
    newProduct.scrumMaster = data.scrumMaster
    newProduct.developerNames = data.developerNames
    newProduct.methodology = data.methodology
    newProduct.startDate = data.startDate
    
    _products.push(newProduct)
    return newProduct
  }
  
  async update(id: number, data: Product): Promise<Product> {
    const product = await this.get(id)
    
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
  
  async delete(id: number): Promise<void> {
    const product = await this.get(id)
    if (product) {
      const idx = _products.indexOf(product)
      if (idx === -1) return
      _products.splice(idx, 1)
    }
  }
}
