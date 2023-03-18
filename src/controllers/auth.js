const signUp = (req, res) => {
  res.send("<h4>SignUp controller</h4>");
};

const logIn = (req, res) => {
  res.send("<h4>LogIn controller</h4>");
};

module.exports = { signUp, logIn };
