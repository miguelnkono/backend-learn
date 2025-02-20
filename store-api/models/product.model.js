/**
 * properties of a product
 *  - featured
 *  - rating
 *  - createAt
 *  - name
 *  - price
 *  - company
 */

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name for the name"],
  },
  price: {
    type: Number,
    required: [true, "please provide a price for the product"],
  },
  feature: {
    type: Boolean,
    default: false,
  },
  rate: {
    type: Number,
    default: 4.5,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: ["ikea", "liddy", "caressa", "marcos"],
    required: [true, "Product company is required"],
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
