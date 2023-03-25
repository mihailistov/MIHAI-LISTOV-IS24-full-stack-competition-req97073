export class ProductService {
  products = [
    {
      name: "learn docker",
      done: false
    },
    {
      name: "learn awilix",
      done: true
    },
    {
      name: "learn express",
      done: false
    }
  ]
  getAllProducts() {
    return this.products
  }
}
