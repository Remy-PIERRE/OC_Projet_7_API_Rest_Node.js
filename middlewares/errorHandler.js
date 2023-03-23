const CustomError = require("../Error/CustomError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.customStatus).send(err.message);
  }
  res.status(500).send(err.message);
};

module.exports = errorHandler;
