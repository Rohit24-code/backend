const express = require("express");
const {
  addBooks,
  getBooks,
  getBooksById,
  updateBook,
} = require("../controllers/book.controllers");

const bookRouter = express.Router();

bookRouter.post("/add", addBooks);
bookRouter.get("/get", getBooks);
bookRouter.get("/get/:id", getBooksById);
bookRouter.put("/update/:id", updateBook);

module.exports = bookRouter;
