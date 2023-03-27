import swaggerJSDoc from "swagger-jsdoc"

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'IMB Swagger API',
    version: '1.0.0',
    description: 'Endpoints for the IMB Product Project',
    contact: {
      name: "Mihai Listov",
      email: "mihailistov@gmail.com",
      url: "https//www.mihailistov.ca"
    }
  },
  schemes: ["http"],
  servers: [{ url: "http://localhost:3000/" }],
}

const options = {
  swaggerDefinition,
  apis: [
    `${__dirname}/../models/*.ts`, 
    `${__dirname}/../controllers/*.ts`,
  ],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
