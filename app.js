require("dotenv").config();
const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares:
app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: { message: `Hello World From Our Server` },
  });
});

// Universal Error Handling:
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server Started On Port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
