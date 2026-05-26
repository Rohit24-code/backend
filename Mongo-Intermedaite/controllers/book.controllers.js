const Author = require("../models/author.models");
const Book = require("../models/book.models");

const createAuthor = async (req, res) => {
  try {
    const author = await new Author(req.body);
    await author.save();
    res.status(201).json({ success: 1, data: author });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await new Book(req.body);
    await book.save();
    res.status(201).json({ success: 1, data: book });
  } catch (error) {}
};

module.exports = {
  createAuthor,
  createBook,
};
