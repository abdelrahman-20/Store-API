const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  console.log(products);

  res.status(200).json({
    status: "Success",
    data: { products },
  });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    status: "Success",
    data: { products },
  });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
