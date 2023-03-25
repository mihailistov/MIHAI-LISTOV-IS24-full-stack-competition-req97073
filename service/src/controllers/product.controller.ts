import { GET, route } from "awilix-express";
import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

@route('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @GET()
  getAllProducts(req: Request, res: Response) {
    return res.json(this.productService.getAllProducts());
  }

  // @route('/:id')
  // @PATCH()
  // getAllProducts(req: Request, res: Response) {
  //   return res.json(this.productService.getAllProducts());
  // }
}
