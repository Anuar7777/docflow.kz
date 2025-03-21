const { Router } = require("express");
const { body } = require("express-validator");
const UserRoutes = require("./users-router.js");

const userController = require("../controllers/user-controller.js");

const router = Router();

router.use("/users", UserRoutes);

router.get("/", (req, res) => {
  res.send("The server is running");
});

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.signUp
);

router.post("/login", userController.signIn);

module.exports = router;
