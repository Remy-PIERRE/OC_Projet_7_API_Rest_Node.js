const mongoose = require("mongoose");

const BooksSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  ratings: [
    {
      userId: {
        type: String,
        required: true,
      },
      grade: {
        type: Number,
        required: true,
      },
    },
  ],
  averageRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model("Book", BooksSchema);
