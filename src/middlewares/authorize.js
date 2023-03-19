const authorize = function (req, res, next) {
  console.log("You can pass.");
  next();
};

module.exports = authorize;
