const express = require("express");
const auth = require("./routes/auth");
const books = require("./routes/books");

const app = express();
const port = 5000;

/* middlewares */
app.use([express.urlencoded({ extended: false }), express.json()]);

/* routes */
app.use("/api/auth", auth);
app.use("/api/books", books);

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

/* server listener */
app.listen(port, () => {
  console.log(`Serveur is waiting, port: ${port}`);
});
