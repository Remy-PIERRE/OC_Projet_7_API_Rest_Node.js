const Book = require("../Models/Books");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    res.status(200).json(allBooks);
  } catch (err) {
    res.status(500).json({ ...err });
  }
};

const createBook = async (req, res) => {
  try {
    const book = JSON.parse(req.body.book);
    if (book.ratings[0].grade === 0) {
      book.ratings = [];
      book.averageRating = 0;
    } else {
      book.averageRating = book.ratings[0].grade;
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const newBook = await Book.create({ ...book, imageUrl });
    res.status(200).json({ message: "Bien joué." });
    // res.status(200).json(newBook);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const book = await Book.findById(bookId).exec();
    res.status(200).json(book);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    let updatedBook;
    if (req.file) {
      const book = JSON.parse(req.body.book);
      const imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      console.log("data", book, imageUrl);
      updatedBook = await Book.findOneAndUpdate(
        { _id: bookId },
        { ...book, imageUrl },
        { new: true }
      );
      console.log("updated", updatedBook);
    } else {
      console.log("data", req.body);
      updatedBook = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
        new: true,
      });
      console.log("updated", updatedBook);
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Supression ok." });
  } catch (err) {
    res.status(500).send(err);
  }
};

const postBookRating = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { userId, rating } = req.body;
    const bookToUpdate = await Book.findById(bookId);
    const ratings = [...bookToUpdate.ratings, { userId, grade: rating }];

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { ratings },
      { new: true }
    );

    const bookToAverage = await Book.findById(bookId);
    const sum = bookToAverage.ratings.map((book) => book.grade);
    const averageRating =
      sum.reduce((sum, a) => sum + a, 0) / bookToAverage.ratings.length;

    const updatedBook2 = await Book.findOneAndUpdate(
      { _id: bookId },
      { averageRating },
      { new: true }
    );

    res.status(200).json(updatedBook2);
  } catch (err) {
    console.log("error", err);
    res.status(500).send();
  }
};

const getBestRating = async (req, res) => {
  try {
    console.log("entrée best");
    const books = await Book.find({}).sort({ averageRating: "desc" }).limit(3);
    console.log(books);
    res.status(200).json(books);
  } catch (err) {
    console.log("test", err);
    res.status(500).send();
  }
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
