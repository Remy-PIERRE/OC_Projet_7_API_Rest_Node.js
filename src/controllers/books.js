const getBooks = (req, res) => {
  res.send("<h4>GetBooks Page</h4>");
};

const postBook = (req, res) => {
  res.send("<h4>PostBook Page</h4>");
};

const getBook = (req, res) => {
  res.send("<h4>GetBook Page</h4>");
};

const putBook = (req, res) => {
  res.send("<h4>PutBook Page</h4>");
};

const deleteBook = (req, res) => {
  res.send("<h4>DeleteBook Page</h4>");
};

const postBookRating = (req, res) => {
  res.send("<h4>PostBookRating Page</h4>");
};

const getBestraing = (req, res) => {
  res.send("<h4>GetBestraing Page</h4>");
};

module.exports = {
  getBooks,
  postBook,
  getBook,
  putBook,
  deleteBook,
  postBookRating,
  getBestraing,
};
