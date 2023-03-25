const asyncWrapper = require("../../middlewares/asyncWrapper");
const createCustomError = require("../../Error/createCustomError");
const Book = require("../../models/Book");

const getBestRatingBooks = asyncWrapper(async (req, res, next) => {
  /* query */
  const books = await Book.find({}).sort({ averageRating: "desc" }).limit(3);

  /* check data */
  if (books.length < 1) {
    return next(
      createCustomError("Can't find any book. Please feed the DB.", 404)
    );
  }

  /* response */
  res.status(200).json(books);
});

module.exports = getBestRatingBooks;
