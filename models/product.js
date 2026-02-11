const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name Is Required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product Price Is Required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    company: {
      type: String,
      enum: {
        values: ["marcos", "liddy", "ikea", "caressa"],
        message: "{VALUE} Is Not Supported",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
