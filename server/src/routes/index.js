const { Router } = require("express");
const { body } = require("express-validator");
const UserRoutes = require("./users-router.js");
const UserController = require("../controllers/user-controller.js");

const router = Router();

router.use("/users", UserRoutes);

router.get("/", (req, res) => {
  res.send("The server is running");
});
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.signUp
);
router.post("/login", UserController.signIn);
router.post("/logout", UserController.signOut);
router.get("/activate/:link", UserController.activate);

module.exports = router;
