import dotenv from 'dotenv';
import express from "express";
import { loadControllers, scopePerRequest } from "awilix-express";
import { configureContainer } from "./container";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger"
import cors from "cors";

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 3000;

const container = configureContainer()

const allowedOrigins = ['http://localhost:3001'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use(scopePerRequest(container));

// Health check route
app.use('/api/ping', function(req, res, next) {
  res.sendStatus(200)
})

app.use(loadControllers(
  'controllers/*.ts',
  { cwd: __dirname }
));

// api docs
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
