const { Router } = require("express");
const UserController = require("../controllers/user-controller.js");
const { isAuth, checkRole } = require("../middlewares");

const router = Router();

router.get("/", isAuth, checkRole(["admin"]), UserController.getAllUsers);
router.get("/:id", isAuth, UserController.getUserById);
router.delete("/:id", isAuth, UserController.deleteUser);
router.patch(
  "/:id/role",
  isAuth,
  checkRole(["admin"]),
  UserController.updateUserRole
);
router.put(
  "/:id/block",
  isAuth,
  checkRole(["admin"]),
  UserController.blockUser
);
router.put(
  "/:id/unblock",
  isAuth,
  checkRole(["admin"]),
  UserController.unblockUser
);

module.exports = router;
