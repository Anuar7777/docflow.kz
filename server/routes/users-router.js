const { Router } = require("express");
const UserController = require("../controllers/user-controller.js");

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
