const express = require("express");
const { signUp, logIn } = require("../controllers/auth");

const router = express.Router();

/* routes */
router.route("/signup").post(signUp);
router.route("/login").post(logIn);

module.exports = router;
