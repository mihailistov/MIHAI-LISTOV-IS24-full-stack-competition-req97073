import Product from "../models/product.model";
import { ProductRepositoryInterface } from "../common/types";
import { Methodology } from "../models/product.model";

// TODO: replace in-memory implementation with redis
const _products: Array<Product> = [
  {
    id: 1,
    name: "Product 1",
    scrumMaster: "Scrum Master 1",
    owner: "Owner 1",
    developerNames: ["Developer 1", "Developer 2"],
    startDate: new Date(),
    methodology: Methodology.Agile
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
    newProduct.scrumMaster = data.scrumMaster
    newProduct.owner = data.owner
    newProduct.developerNames = data.developerNames
    newProduct.startDate = data.startDate
    newProduct.methodology = data.methodology
    
    _products.push(newProduct)
    return newProduct
  }
  
  async update(id: number, data: Product): Promise<Product> {
    const product = await this.get(id)
    
    if (product) {
      product.name = data.name
      product.scrumMaster = data.scrumMaster
      product.owner = data.owner
      product.developerNames = data.developerNames
      product.startDate = data.startDate

      let methodology: string = Methodology[data.methodology]
      product.methodology = methodology
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
