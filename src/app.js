const express = require("express");
const connectDB = require("./DB/connection");
const auth = require("./routes/auth");
const books = require("./routes/books");
const routeErrorHandler = require("./middlewares/routeErrorHandler");
require("dotenv").config();

const app = express();

/* middlewares */
app.use([express.urlencoded({ extended: false }), express.json()]);

/* routes */
app.use("/api/auth", auth);
app.use("/api/books", books);
app.use(routeErrorHandler);

/* connect DB then start server or close if catch err */
const port = process.env.PORT || 5000;

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
