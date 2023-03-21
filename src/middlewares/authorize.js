const jwt = require("jsonwebtoken");

const authorize = function (req, res, next) {
  try {
    const token = req.header("authorization").split(" ")[1];
    const readedToken = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).send({ ...error });
  }
};

module.exports = authorize;
