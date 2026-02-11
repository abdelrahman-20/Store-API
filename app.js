require("dotenv").config();
require("express-async-errors");

const connectDB = require("./db/connect");

const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productsRouter = require("./routes/productsRoutes");
const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares:
app.use(express.json());

app.use("/home", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: { message: `Hello World From Our Server` },
  });
});

app.use("/api/v1/products", productsRouter);

// Universal Error Handling:
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MongoDB_URI);
    app.listen(PORT, () => {
      console.log(`Server Started On Port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
