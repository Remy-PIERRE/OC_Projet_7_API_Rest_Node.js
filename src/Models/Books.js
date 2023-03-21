const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  userId: String,
  title: String,
  author: String,
  imageUrl: String,
  year: Number,
  genre: String,
  ratings: [
    {
      userId: String,
      grade: Number,
    },
  ],
  averageRating: Number,
});

module.exports = mongoose.model("Book", BooksSchema);
