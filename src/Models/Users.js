const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// usersSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 10);
// });

// usersSchema.methods.comparePasswords = async function (passwordToTest) {
//   const isMatch = await bcrypt.compare(passwordToTest, this.password);
//   return isMatch;
// };

// usersSchema.methods.createJwt = function () {
//   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

module.exports = mongoose.model("User", usersSchema);
