const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const signUp = asyncWrapper(async (req, res, next) => {
  /* get data */
  const { email, password } = req.body;

  /* process data */
  const hashedPwd = await bcrypt.hash(password, 10);

  /* query */
  await User.create({ email, password: hashedPwd });

  /* response */
  res.status(201).json({ message: "User created with success." });
});

module.exports = signUp;
