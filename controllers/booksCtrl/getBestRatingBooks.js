const asyncWrapper = require("../../middlewares/asyncWrapper");
const Book = require("../../models/Book");

const getBestRatingBooks = asyncWrapper(async (req, res, next) => {
  /* query */
  const books = await Book.find({}).sort({ averageRating: "desc" }).limit(3);

  /* response */
  res.status(200).json(books);
});

module.exports = getBestRatingBooks;
