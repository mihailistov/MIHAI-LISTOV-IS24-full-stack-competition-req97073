import { GET, POST, PUT, DELETE, route } from "awilix-express";
import { Request, Response } from "express";

@route('/api/products')
export class ProductController {
  constructor(private readonly productService: { [key: string]: Function }) { }

  /**
   * @swagger
   *
   * /api/products:
   *  get:
   *    tags:
   *      - Product
   *    name: GET Products
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
   * /api/products/{productId}:
   *  get:
   *    tags:
   *      - Product
   *    name: GET Product
   *    summary: Returns product associated with productId
   *    parameters:
   *      - name: productId
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

  @route('/:productId')
  @GET()
  async getProduct(req: Request, res: Response) {
    const productId: string = req.params.productId;
    const product = await this.productService.getProduct(productId)
    return res.json(product);
  }

  /**
   * @swagger
   *
   * /api/products:
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
   * /api/products/{productId}:
   *  put:
   *    tags:
   *      - Product
   *    name: PUT Product
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
  @route('/:productId')
  @PUT()
  async updateProduct(req: Request, res: Response) {
    const productId: string = req.params.productId;
    const product = await this.productService.updateProduct(productId, req.body)
    return res.json(product);
  }

  /**
   * @swagger
   *
   * /api/products/{productId}:
   *  delete:
   *    tags:
   *      - Product
   *    name: DELETE Product
   *    summary: Deletes product with productId
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
  @route('/:productId')
  @DELETE()
  async deleteProduct(req: Request, res: Response) {
    const productId: string = req.params.productId;
    await this.productService.deleteProduct(productId)
    return res.sendStatus(200);
  }
}
