import Product from "../models/product.model";

export const getAllProductsStatic = async (req, res) => {};

export const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};
