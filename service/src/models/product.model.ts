export enum Methodology {
  Agile = "Agile",
  Waterfall = "Waterfall",
}

/**
 * @swagger
 *
 *  components:
 *    schemas:
 *      Methodology:
 *        type: string
 *        enum:
 *          - Agile
 *          - Waterfall
 *      ProductInput:
 *        type: object
 *        required:
 *          - name
 *          - owner
 *          - scrumMaster
 *          - developerNames
 *          - startDate
 *          - methodology
 *        properties:
 *          name:
 *            type: string
 *            example: 'Product 1'
 *          owner:
 *            type: string
 *            example: 'John Doe'
 *          scrumMaster:
 *            type: string
 *            example: 'Jane Doe'
 *          developerNames:
 *            type: array
 *            items:
 *              type: string
 *              example: ['John Doe', 'Jane Doe']
 *          startDate:
 *            type: string
 *            format: date-time
 *            example: '2020-01-01T00:00:00.000Z'
 *          methodology:
 *            $ref: '#/components/schemas/Methodology'
 *            example: 'Agile'
 *      Product:
 *        allOf:
 *          - type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: integer
 *                example: 1
 *          - $ref: '#/components/schemas/ProductInput'
 *    parameters:
 *      productId:
 *        name: id
 *        in: path
 *        required: true
 *        description: ID of the product
 *        schema:
 *          type: integer
 *          example: 1
 *      productName:
 *        name: name
 *        in: body
 *        required: true
 *        description: Name of the product
 *        schema:
 *          type: string
 *          example: 'My Product'
 *      productOwner:
 *        name: owner 
 *        in: body
 *        required: true
 *        description: Owner of the product
 *        schema:
 *          type: string
 *          example: 'John Doe'
 *      productDeveloperNames:
 *        name: developerNames
 *        in: body
 *        required: true
 *        description: Names of the developers working on the product
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *          example: ['John Doe', 'Jane Doe']
 *      productScrumMaster:
 *        name: scrumMaster 
 *        in: body
 *        required: true
 *        description: Scrum master of the product
 *        schema:
 *          type: string
 *          example: 'Jane Doe'
 *      productMethodology:
 *        name: methodology
 *        in: body
 *        required: true
 *        description: Methodology of the product
 *        schema:
 *          $ref: '#/components/schemas/Methodology'
 *          example: 'Agile'
 *      productStartDate:
 *        name: startDate
 *        in: body
 *        required: true
 *        description: Start date of the product
 *        schema:
 *          type: string
 *          format: date-time
 *          example: '2023-03-25T20:38:29.531Z'
 */
export default class Product {
  id: number;
  name: string;
  owner: string;
  scrumMaster: string;
  developerNames: string[];
  methodology: Methodology;
  startDate: Date;
}
