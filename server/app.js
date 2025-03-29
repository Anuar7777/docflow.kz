require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.js");
const errorMiddleware = require("./middlewares/error-middleware.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

module.exports = app;
