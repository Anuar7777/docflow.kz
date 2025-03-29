const app = require("./app.js");
const PORT = process.env.PORT;

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
