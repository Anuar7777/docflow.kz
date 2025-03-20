const { Router } = require("express");
const userController = require("../controllers/user-controller.js");

const router = Router();

router.get("/:id", userController.getUser);

module.exports = router;
