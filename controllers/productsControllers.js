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
  const { name, company, featured, sort, fields, numericFilters } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const queryObject = {};

  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (company) queryObject.company = company;
  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (numericFilters) {
    const operatorMapping = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMapping[match]}-`,
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject).skip(skip).limit(limit);

  // Sorting The Results
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // Selecting Fields To Display
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // Applying Pagination (SKIP + LIMIT)
  // result = result.skip(skip).limit(limit);

  // Waiting For Final Results
  const products = await result;

  res.status(200).json({
    status: "Success",
    data: { "NO.Hits": products.length, products },
  });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
