import { GET, POST, PATCH, DELETE, route } from "awilix-express";
import { Request, Response } from "express";

@route('/api/product')
export class ProductController {
  constructor(private readonly productService: { [key: string]: Function }){}

  @GET()
  async getAllProducts(req: Request, res: Response) {
    return res.json(await this.productService.getProducts());
  }

  @route('/:id')
  @GET()
  async getProduct(req: Request, res: Response) {
    const id: number = parseInt(req.params.id as string);
    const product = await this.productService.getProduct(id)
    return res.json(product);
  }

  @route('/')
  @POST()
  async createProduct(req: Request, res: Response) {
    const product = await this.productService.createProduct(req.body)
    return res.json(product);
  }

  @route('/:id')
  @PATCH()
  async updateProduct(req: Request, res: Response) {
    const id: number = parseInt(req.params.id as string);
    const product = await this.productService.updateProduct(id, req.body)
    return res.json(product);
  }

  @route('/:id')
  @DELETE()
  async deleteProduct(req: Request, res: Response) {
    const id: number = parseInt(req.params.id as string);
    await this.productService.deleteProduct(id)
    return res.sendStatus(200);
  }
}
