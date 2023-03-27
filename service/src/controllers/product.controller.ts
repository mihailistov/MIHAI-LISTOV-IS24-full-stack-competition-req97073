import { GET, POST, PATCH, DELETE, route } from "awilix-express";
import { Request, Response } from "express";

@route('/api/product')
export class ProductController {
  constructor(private readonly productService: { [key: string]: Function }) { }

  /**
   * @swagger
   *
   * /api/product:
   *  get:
   *    tags:
   *      - Product
   *    name: GET Product
   *    summary: Returns all products
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successful operation
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Product'
   *      400:
   *        description: Bad request
   *      404:
   *        description: Product not found
   */

  @GET()
  async getAllProducts(req: Request, res: Response) {
    return res.json(await this.productService.getProducts());
  }

  /**
   * @swagger
   *
   * /api/product/{id}:
   *  get:
   *    tags:
   *      - Product
   *    name: GET Product
   *    summary: Returns product associated with id
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: ID of the product
   *        schema:
   *          type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successful operation
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Product'
   *      400:
   *        description: Bad request
   *      404:
   *        description: Product not found
   */

  @route('/:id')
  @GET()
  async getProduct(req: Request, res: Response) {
    const id: number = parseInt(req.params.id as string);
    const product = await this.productService.getProduct(id)
    return res.json(product);
  }

  /**
   * @swagger
   *
   * /api/product:
   *  post:
   *    tags:
   *      - Product
   *    name: POST Product
   *    summary: Inserts a new product
   *    parameters:
   *      - $ref: '#/components/parameters/productName'
   *      - $ref: '#/components/parameters/productOwner'
   *      - $ref: '#/components/parameters/productScrumMaster'
   *      - $ref: '#/components/parameters/productDeveloperNames'
   *      - $ref: '#/components/parameters/productStartDate'
   *      - $ref: '#/components/parameters/productMethodology'
   *    produces:
   *      - application/json
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/ProductInput'
   *    responses:
   *      200:
   *        description: Successful operation
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Product'
   *      400:
   *        description: Bad request
   *      401:
   *        description: Unauthorized
   *      404:
   *        description: Product not found
   */

  @route('/')
  @POST()
  async createProduct(req: Request, res: Response) {
    const product = await this.productService.createProduct(req.body)
    return res.json(product);
  }

  /**
   * @swagger
   *
   * /api/product/{id}:
   *  patch:
   *    tags:
   *      - Product
   *    name: PATCH Product
   *    summary: Updates an existing product
   *    parameters:
   *      - $ref: '#/components/parameters/productId'
   *      - $ref: '#/components/parameters/productName'
   *      - $ref: '#/components/parameters/productOwner'
   *      - $ref: '#/components/parameters/productScrumMaster'
   *      - $ref: '#/components/parameters/productDeveloperNames'
   *      - $ref: '#/components/parameters/productMethodology'
   *      - $ref: '#/components/parameters/productStartDate'
   *    produces:
   *      - application/json
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/ProductInput'
   *    responses:
   *      200:
   *        description: Successful operation
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Product'
   *      400:
   *        description: Bad request
   *      404:
   *        description: Product not found
   */
  @route('/:id')
  @PATCH()
  async updateProduct(req: Request, res: Response) {
    const id: number = parseInt(req.params.id as string);
    const product = await this.productService.updateProduct(id, req.body)
    return res.json(product);
  }

  /**
   * @swagger
   *
   * /api/product/{id}:
   *  delete:
   *    tags:
   *      - Product
   *    name: DELETE Product
   *    summary: Deletes product with id
   *    parameters:
   *      - $ref: '#/components/parameters/productId'
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successful operation
   *      400:
   *        description: Bad request
   *      404:
   *        description: Product not found
   */
  @route('/:id')
  @DELETE()
  async deleteProduct(req: Request, res: Response) {
    const id: number = parseInt(req.params.id as string);
    await this.productService.deleteProduct(id)
    return res.sendStatus(200);
  }
}
