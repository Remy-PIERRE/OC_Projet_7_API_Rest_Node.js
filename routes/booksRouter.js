const express = require("express");
const authorize = require("../middlewares/authorize");
const multer = require("../middlewares/multer-config");
/* get controllers */
const getAllBooks = require("../controllers/booksCtrl/getAllBooks");
const createSingleBook = require("../controllers/booksCtrl/createSingleBook");
const getSingleBook = require("../controllers/booksCtrl/getSingleBook");
const deleteSingleBook = require("../controllers/booksCtrl/deleteSingleBook");
const updateSingleBook = require("../controllers/booksCtrl/updateSingleBook");
const rateSingleBook = require("../controllers/booksCtrl/rateSingleBook");
const getBestRatingBooks = require("../controllers/booksCtrl/getBestRatingBooks");

/* router */
const router = express.Router();

/* routes */
router.route("/").get(getAllBooks).post(authorize, multer, createSingleBook);
router.route("/bestrating").get(getBestRatingBooks);
router
  .route("/:id")
  .get(getSingleBook)
  .put(authorize, multer, updateSingleBook)
  .delete(authorize, deleteSingleBook);
router.route("/:id/rating").post(authorize, rateSingleBook);

module.exports = router;
