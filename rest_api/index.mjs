import express from "express";
import { products } from "./models/product.model.mjs";

const app = express();

//------------ middleware ------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// getting all the products
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// adding a new product by the user
app.post("/api/v1/products", (req, res) => {
  const { name, price, quantity, active } = req.body;
  const newProduct = { name, price, quantity, active };

  // checking if all fields are filled
  if (name === null || price === null || quantity === null || active === null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // checking if the product already exists
  const findProduct = products.find((product) => product.name === name);

  // if the product already exists
  if (findProduct !== undefined) {
    return res.status(409).json({ message: `${name} already exists` });
  } else {
    // if the product does not exist
    products.push(newProduct);
    res.status(201).json({ message: `${name} was created successfully` });
  }
});

// deleting a particular product
app.delete("/api/v1/products/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);

  const productIndex = products.findIndex((product) => product.name === name);

  // if the product exists in the data set, we delete it
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(200).json({ message: `${name} was deleted successfully` });
  } else {
    // if it doesn't exist, we return a json error
    console.log(`Product ${name} is not in the data set of products`);
    res.status(404).json({
      message: `Product ${name} doesn't exist in the data set of products`,
    });
  }
});

// get an element by name
app.get("/api/v1/products/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);

  const product = products.find((product) => product.name === name);

  if (product === undefined) {
    return res.status(404).json({ message: `${name} not found` });
  }

  res.json(product);
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
