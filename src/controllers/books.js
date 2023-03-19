const Book = require("../Models/Books");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    res.status(200).json(allBooks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(200).json(newBook);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const book = await Book.findById(bookId);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateBook = (req, res) => {
  res.send("<h4>PutBook Page</h4>");
};

const deleteBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

const postBookRating = (req, res) => {
  res.send("<h4>PostBookRating Page</h4>");
};

const getBestRating = (req, res) => {
  res.send("<h4>GetBestraing Page</h4>");
};

module.exports = {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  postBookRating,
  getBestRating,
};
