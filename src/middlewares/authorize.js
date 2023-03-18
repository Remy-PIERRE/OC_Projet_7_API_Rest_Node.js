const authorize = function (req, res, next) {
  const { id } = req.body;
  if (id) {
    req.id = id;
    console.log(`Welcom here ${id}.`);
    next();
  } else {
    res.send("You can't access this.");
  }
};

module.exports = authorize;
