// Let's do an in-memory implementation for now.
const _products = []

export default class ProductsRepository {
  async get(id: number) {
    const product = _products.find(x => x.id === id)
    return product
  }
  
  async create(data) {
    const newProduct = {
      id: Date.now(), // cheeky ID generation
      text: data.text,
      userId: data.userId,
      completed: data.completed
    }
    _products.push(newProduct)
    return newProduct
  }
  
  async update(id, data) {
    const product = await this.get(id)
    Object.assign(product, data)
    return product
  }
  
  async delete(id) {
    const product = await this.get(id)
    const idx = _products.indexOf(product)
    if (idx === -1) return
    _products.splice(idx, 1)
  }
}