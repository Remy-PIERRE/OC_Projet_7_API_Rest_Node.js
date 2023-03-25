const fs = require("fs");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const createCustomError = require("../../Error/createCustomError");
const Book = require("../../models/Book");

const updateSingleBook = asyncWrapper(async (req, res, next) => {
  /* get data */
  const userId = req.userId;
  const { id: bookId } = req.params;

  let newVersionBook;
  if (req.file) {
    newVersionBook = JSON.parse(req.body.book);
    newVersionBook.imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/public/images/${req.file.filename}`;
  } else {
    newVersionBook = req.body;
  }

  /* check data */
  if (userId !== newVersionBook.userId) {
    return next(
      createCustomError("UserId send and user connected do not match.", 401)
    );
  }

  /* query */
  const prevVersionBook = await Book.findOneAndUpdate(
    { userId, _id: bookId },
    { ...newVersionBook }
  );

  /* check data */
  if (!prevVersionBook) {
    return next(
      createCustomError(
        "Can't find any book with thoses userId and bookId matching.",
        404
      )
    );
  }

  /* process data */
  if (req.file) {
    const path = "public" + prevVersionBook.imageUrl.split("public")[1];
    fs.unlink(path, (err) => err && console.log(err));
  }

  /* response */
  res.status(200).json({ message: "Book updated with success." });
});

module.exports = updateSingleBook;
