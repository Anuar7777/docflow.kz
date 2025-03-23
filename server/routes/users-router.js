const { Router } = require("express");
const UserController = require("../controllers/user-controller.js");
const isAuth = require("../middlewares/auth-middleware.js");

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", isAuth, UserController.getUserById);
router.delete("/:id", UserController.deleteUser);
router.patch("/:id/role", UserController.updateUserRole);

module.exports = router;
