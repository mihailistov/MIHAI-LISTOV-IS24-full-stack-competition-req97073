import dotenv from 'dotenv';
import express from "express";
import { loadControllers, scopePerRequest } from "awilix-express";
import { configureContainer } from "./container";

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT;

const container = configureContainer()

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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
