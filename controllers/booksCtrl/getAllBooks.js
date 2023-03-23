const asyncWrapper = require("../../middlewares/asyncWrapper");
const createCustomError = require("../../Error/createCustomError");
const Book = require("../../models/Book");

const getAllBooks = asyncWrapper(async (req, res, next) => {
  /* query */
  const allBooks = await Book.find({});

  /* check data */
  if (!allBooks || allBooks.length < 1) {
    return next(
      createCustomError("Can't find any book. Please feed the DB.", 404)
    );
  }

  /* response */
  res.status(200).json(allBooks);
});

module.exports = getAllBooks;
