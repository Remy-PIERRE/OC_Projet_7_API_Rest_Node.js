const express = require("express");
const connectDB = require("./DB/connection");
const auth = require("./routes/auth");
const books = require("./routes/books");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

/* middlewares */
app.use([express.urlencoded({ extended: false }), express.json()]);

/* routes */
app.use("/api/auth", auth);
app.use("/api/books", books);

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

/* connect DB then start server or close if catch err */
const start = (async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Serveur is waiting, port: ${port}`));
  } catch (err) {
    console.log(
      "Erreur lors de la connection à la DB. Fermeture du serveur.",
      err
    );
  }
})();
