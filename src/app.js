import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";
import { API_ROUTE } from "./config/const.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";

// Get current file directory (for ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically load based on NODE_ENV
const envPath = path.resolve(
  __dirname,
  `../.env.${process.env.NODE_ENV || "development"}`
);

// Load only if file exists
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`Loaded env from ${envPath}`);
}

const swaggerDocument = YAML.load("./src/swagger/swagger.yaml");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(API_ROUTE, booksRouter);

// Sample health check route
app.get("/", (req, res) => {
  res.json({ message: "Gutenberg Books API is live!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
