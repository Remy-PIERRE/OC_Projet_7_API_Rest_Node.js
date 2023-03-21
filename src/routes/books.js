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
const multer = require("../middlewares/multer");

const router = express.Router();

/* routes */
router.route("/").get(getAllBooks).post(authorize, multer, createBook);
router.route("/bestrating").get(getBestRating);
router
  .route("/:id")
  .get(getSingleBook)
  .put(authorize, multer, updateBook)
  .delete(authorize, deleteBook);
router.route("/:id/rating").post(authorize, postBookRating);

module.exports = router;
