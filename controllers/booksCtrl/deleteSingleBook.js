const fs = require("fs");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const createCustomError = require("../../Error/createCustomError");
const Book = require("../../models/Book");

const deleteSingleBook = asyncWrapper(async (req, res, next) => {
  /* get data */
  const userId = req.userId;
  const { id: bookId } = req.params;

  /* query */
  const deletedBook = await Book.findOneAndDelete({ userId, _id: bookId });

  /* check data */
  if (!deletedBook) {
    return next(
      createCustomError(
        "Can't find any book with thoses userId and bookId matching.",
        400
      )
    );
  }

  /* process data */
  const path = "public" + deletedBook.imageUrl.split("public")[1];
  fs.unlink(path, (err) => err && console.log(err));

  /* response */
  res.status(200).json({ message: "Book deleted with success." });
});

module.exports = deleteSingleBook;
