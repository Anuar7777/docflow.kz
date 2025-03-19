require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`The server is running at ${process.env.API_URL}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
