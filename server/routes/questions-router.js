const { Router } = require("express");
const QuestionController = require("../controllers/question-controller.js");
const { isAuth, checkRole } = require("../middlewares");

const router = Router();

router.post(
  "/",
  isAuth,
  checkRole(["reviewer", "admin"]),
  QuestionController.createQuestion
);
router.put(
  "/:id",
  isAuth,
  checkRole(["reviewer", "admin"]),
  QuestionController.updateQuestion
);
router.delete(
  "/:id",
  isAuth,
  checkRole(["reviewer", "admin"]),
  QuestionController.deleteQuestion
);
router.get("/", isAuth, QuestionController.getAllQuestions);
router.get("/:id", isAuth, QuestionController.getQuestionById);

module.exports = router;
