const { Router } = require("express");
const { body } = require("express-validator");
const { isAuth } = require("../middlewares");
const UserRoutes = require("./users-router.js");
const QuestionRoutes = require("./questions-router.js");
const ApplicationRoutes = require("./applications-router.js");
const UserController = require("../controllers/user-controller.js");

const router = Router();

router.use("/users", UserRoutes);
router.use("/questions", QuestionRoutes);
router.use("/applications", ApplicationRoutes);

router.get("/", (req, res) => {
  res.send("The server is running");
});
router.post(
  "/register",
  body("email").isEmail().withMessage("Некорректный email"),
  body("password")
    .isLength({ min: 3, max: 32 })
    .withMessage("Пароль должен быть от 3 до 32 символов"),
  UserController.signUp
);
router.post("/login", UserController.signIn);
router.post("/logout", isAuth, UserController.signOut);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);

module.exports = router;
