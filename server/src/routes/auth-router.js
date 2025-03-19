const { Router } = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user-controller.js");

const router = Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.signUp
);

module.exports = router;
