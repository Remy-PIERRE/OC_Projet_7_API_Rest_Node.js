const express = require("express");
const {
  getBooks,
  postBook,
  getBook,
  putBook,
  deleteBook,
  postBookRating,
  getBestraing,
} = require("../controllers/books");
const authorize = require("../middlewares/authorize");

const router = express.Router();

/* routes */
router.route("/").get(getBooks).post(authorize, postBook);
router
  .route("/:id")
  .get(getBook)
  .put(authorize, putBook)
  .delete(authorize, deleteBook);
router.route("/:id/rating").post(authorize, postBookRating);
router.route("/bestrating").get(getBestraing);

module.exports = router;
