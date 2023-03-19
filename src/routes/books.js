const express = require("express");
const {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  postBookRating,
  getBestRating,
} = require("../controllers/books");
const authorize = require("../middlewares/authorize");

const router = express.Router();

/* routes */
router.route("/").get(getAllBooks).post(authorize, createBook);
router
  .route("/:id")
  .get(getSingleBook)
  .put(authorize, updateBook)
  .delete(authorize, deleteBook);
router.route("/:id/rating").post(authorize, postBookRating);
router.route("/bestrating").get(getBestRating);

module.exports = router;
