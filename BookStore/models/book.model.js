import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      max: 100,
    },
    authorName: {
      type: String,
      require: true,
      trim: true,
    },
    publishYear: {
      type: Number,
      require: true,
      min: 1000,
      max: new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

export default Book;
