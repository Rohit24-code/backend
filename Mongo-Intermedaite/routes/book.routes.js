const express = require("express");
const { createAuthor, createBook } = require("../controllers/book.controllers");

const bookRoute = express.Router();

bookRoute.post("/author", createAuthor);
bookRoute.post("/book", createBook);

module.exports = bookRoute;
