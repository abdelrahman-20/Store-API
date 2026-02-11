require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MongoDB_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Data Successfully Populated");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();
