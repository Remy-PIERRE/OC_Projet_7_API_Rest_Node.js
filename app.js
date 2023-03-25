const express = require("express");
/* get config */
const connectDB = require("./utils/connect-DB");
require("dotenv").config();
const limiter = require("./utils/rateLimiter-config");
/* get middlewares */
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler");
/* get routes */
const authRouter = require("./routes/authRouter");
const booksRouter = require("./routes/booksRouter");
const badRouteHandler = require("./routes/badRouteHandler");

/* init */
const app = express();

/* middlewares */
app.use("/public", express.static("public"));
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* routes */
app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("*", badRouteHandler);

/* end middlewares */
app.use(errorHandler);

/* server */
const port = process.env.PORT || 4000;

const initServer = (async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port} ...`));
  } catch (error) {
    console.log("Error starting server, closing it ... try again later.");
  }
})();
