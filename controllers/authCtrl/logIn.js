const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const createCustomError = require("../../Error/createCustomError");

const logIn = asyncWrapper(async (req, res, next) => {
  /* get data */
  const { email, password } = req.body;

  /* check data */
  if (!email || !password) {
    return next(
      createCustomError("Please provide valid email and password.", 400)
    );
  }

  /* query */
  const user = await User.findOne({ email });

  /* check data */
  if (!user) {
    return next(createCustomError("User does not exist.", 404));
  }

  /* check pwd */
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(createCustomError("Wrong password.", 401));
  }

  /* process token */
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  /* response */
  res.status(200).json({ userId: user._id, token });
});

module.exports = logIn;
