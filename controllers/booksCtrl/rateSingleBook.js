const fs = require("fs");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const createCustomError = require("../../Error/createCustomError");
const Book = require("../../models/Book");

const rateSingleBook = asyncWrapper(async (req, res, next) => {
  /* get data */
  const userId = req.userId;
  const { id: bookId } = req.params;
  const ratings = { userId: req.body.userId, grade: req.body.rating };
  let averageRating;

  /* check data */
  if (![1, 2, 3, 4, 5].includes(ratings.grade)) {
    return next(
      createCustomError(
        "Please provide complete ratings data before submiting.",
        400
      )
    );
  }

  /* check data => already rated by user ? */
  const book = await Book.findById(bookId);
  if (!book) {
    return next(createCustomError("Book does not exist.", 404));
  }
  if (book.ratings) {
    const isNotUpdatable = book.ratings.find(
      (rating) => rating.userId === userId
    );
    if (isNotUpdatable) {
      return next(
        createCustomError("User already gave rating for this book.", 401)
      );
    }

    /* process data */
    const allGrades = book.ratings.map((rating) => rating.grade);
    averageRating = Math.round(
      (allGrades.reduce((sum, a) => sum + a, 0) + ratings.grade) /
        (allGrades.length + 1)
    );
  } else {
    averageRating = ratings.grade;
  }

  /* query */
  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId },
    { $push: { ratings }, averageRating }
  );

  /* check data */
  if (!updatedBook) {
    return next(
      createCustomError(
        "Can't find any book with thoses userId and bookId matching.",
        404
      )
    );
  }

  /* response */
  res.status(200).json(updatedBook);
});

module.exports = rateSingleBook;
