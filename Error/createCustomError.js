const CustomError = require("./CustomError");

const createCustomError = (message, customStatus) => {
  return new CustomError(message, customStatus);
};

module.exports = createCustomError;
