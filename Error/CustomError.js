class CustomError extends Error {
  constructor(message, customStatus) {
    super(message);
    this.customStatus = customStatus;
  }
}

module.exports = CustomError;
