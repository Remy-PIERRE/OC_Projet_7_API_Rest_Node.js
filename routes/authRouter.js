const express = require("express");
/* get controllers */
const signUp = require("../controllers/authCtrl/signUp");
const logIn = require("../controllers/authCtrl/logIn");

/* router */
const router = express.Router();

/* routes */
router.route("/signup").post(signUp);
router.route("/login").post(logIn);

module.exports = router;
