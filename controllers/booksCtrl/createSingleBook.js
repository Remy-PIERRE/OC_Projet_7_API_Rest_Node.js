const asyncWrapper = require("../../middlewares/asyncWrapper");
const createCustomError = require("../../Error/createCustomError");
const Book = require("../../models/Book");

const createSingleBookCtrl = asyncWrapper(async (req, res, next) => {
  /* get data */
  const userId = req.userId;
  const newBook = JSON.parse(req.body.book);
  const imageUrl = `${req.protocol}://${req.get("host")}/public/images/${
    req.file.filename
  }`;

  /* check data */
  if (userId !== newBook.userId) {
    return next(
      createCustomError("UserId send and user connected do not match.", 401)
    );
  }
  if (
    !(
      userId &&
      newBook.title &&
      newBook.author &&
      imageUrl &&
      newBook.year &&
      newBook.genre
    )
  ) {
    return next(
      createCustomError(
        "Please provide complete book's data before submiting.",
        400
      )
    );
  }

  /* process data */
  if (
    !newBook.ratings ||
    newBook.ratings.length !== 1 ||
    ![1, 2, 3, 4, 5].includes(newBook.ratings[0].grade)
  ) {
    newBook.ratings = [];
    newBook.averageRating = 0;
  } else {
    newBook.ratings = [{ userId, grade: newBook.ratings[0].grade }];
    newBook.averageRating = newBook.ratings[0].grade;
  }

  /* query */
  await Book.create({ ...newBook, imageUrl });

  /* response */
  return res.status(201).json({ message: "Book created with success." });
});

module.exports = createSingleBookCtrl;
