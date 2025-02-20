/**
 * dynamically populate the database
 */
import "dotenv/config";
import { connectDB } from "./db/connect.js";
import Product from "./models/product.model.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("successfully connected to the database");

    // path to the json file
    const filePath = path.join(__dirname, "products.json");

    // read the JSON file
    const data = fs.readFileSync(filePath, "utf-8");

    // parse the JSON data
    const products = JSON.parse(data);

    await Product.deleteMany();
    await Product.create(products);
    console.log("Database populated with products data");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();
