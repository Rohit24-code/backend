const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bookRouter = require("./routes/book.router");
const cors = require("cors");
const { default: mongoose, connect } = require("mongoose");
const connectDb = require("./db");
const authRouter = require("./routes/user.router");

dotenv.config();
const PORT = 6000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan());

app.use("/api/book", bookRouter);
app.use("/api/user", authRouter);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`server is running on port ${PORT}`);
});
