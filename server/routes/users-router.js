const { Router } = require("express");
const UserController = require("../controllers/user-controller.js");
const { isAuth, isAdmin } = require("../middlewares");

const router = Router();

router.get("/", isAuth, isAdmin, UserController.getAllUsers);
router.get("/:id", isAuth, UserController.getUserById);
router.delete("/:id", UserController.deleteUser);
router.patch("/:id/role", UserController.updateUserRole);
router.post("/:id/block", UserController.blockUser);
router.post("/:id/unblock", UserController.unblockUser);

module.exports = router;
