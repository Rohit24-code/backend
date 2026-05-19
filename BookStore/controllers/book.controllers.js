const { default: Book } = require("../models/book.model");

const addBooks = async (req, res) => {
  let body = req.body;
  if (!String(req.body.title).trim()) {
    return res.status(400).json({
      message: "title is required",
    });
  }
  if (!String(req.body.authorName).trim()) {
    return res.status(400).json({
      message: "authorName is required",
    });
  }
  if (
    !Number(req.body.publishYear) ||
    Number(req.body.publishYear) < 1000 ||
    Number(req.body.publishYear) > new Date().getFullYear()
  ) {
    return res.status(400).json({
      message:
        "publishYear is required and should be btw 1000 and current year",
    });
  }

  try {
    await Book.create(body);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  return res.status(200).json({
    message: "book created successfully",
  });
};

const getBooks = async (req, res) => {
  let query = {};
  let sortBy = req.query.sortBy;
  let sortOrder = req.query.sortOrder;
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 5;

  if (sortBy) {
    if (sortOrder === "asc") {
      query = { [sortBy]: -1 };
    } else if (sortOrder === "desc") {
      query = { [sortBy]: 1 };
    }
  }
  console.log(query, "query");
  try {
    let books = await Book.find({}).sort(query).skip(offset).limit(limit);
    return res.status(200).json({
      books,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getBooksById = async (req, res) => {
  let bookId = req.params.id;

  try {
    let book = await Book.findById({ _id: bookId });
    if (!book) {
      return res.status(400).json({
        message: "Id is wrong",
      });
    }
    return res.status(200).json({
      book,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  let bookId = req.params.id;
  let body = req.body;

  if (!String(req.body.title).trim()) {
    return res.status(400).json({
      message: "title is required",
    });
  }
  if (!String(req.body.authorName).trim()) {
    return res.status(400).json({
      message: "authorName is required",
    });
  }
  if (
    !Number(req.body.publishYear) ||
    Number(req.body.publishYear) < 1000 ||
    Number(req.body.publishYear) > new Date().getFullYear()
  ) {
    return res.status(400).json({
      message:
        "publishYear is required and should be btw 1000 and current year",
    });
  }
  try {
    let singleBook = await Book.findById({ _id: bookId });
    if (!singleBook) {
      return res.status(400).json({
        message: "id doesnot belong to book",
      });
    }
    await Book.findByIdAndUpdate({ _id: bookId }, body);
    return res.status(200).json({
      message: "book updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "",
    });
  }
};

module.exports = {
  addBooks,
  getBooks,
  getBooksById,
  updateBook,
};
