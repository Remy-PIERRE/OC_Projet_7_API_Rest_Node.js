const errorHandler = (err, req, res) => {
  // res.render("error", { error: err });
  res.status(500).json({ ...err });
};

module.exports = errorHandler;
