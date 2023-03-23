const asyncWrapper = require("../../middlewares/asyncWrapper");
const createCustomError = require("../../Error/createCustomError");
const Book = require("../../models/Book");

const getSingleBook = asyncWrapper(async (req, res, next) => {
  /* get data */
  const { id: bookId } = req.params;

  /* query */
  const singleBook = await Book.findById(bookId);

  /* check data */
  if (!singleBook) {
    return next(
      createCustomError("This book does not exist. Verify the id.", 404)
    );
  }

  /* response */
  res.status(200).json(singleBook);
});

module.exports = getSingleBook;
