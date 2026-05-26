const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const productRoute = require("./routes/product.routes");
const bookRoute = require("./routes/book.routes");

const app = express();
const PORT = 5000 || process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected succesfully"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use("/products", productRoute);
app.use("/", bookRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
