const express = require("express");
const {
  addBooks,
  getBooks,
  getBooksById,
  updateBook,
} = require("../controllers/book.controllers");
const adminMiddleware = require("../middlewares/admin.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const bookRouter = express.Router();

bookRouter.post("/add", authMiddleware, adminMiddleware, addBooks);
bookRouter.get("/get", getBooks);
bookRouter.get("/get/:id", getBooksById);
bookRouter.put("/update/:id", updateBook);

module.exports = bookRouter;
