const { Router } = require("express");
const QuestionController = require("../controllers/question-controller.js");
const { isAuth, isStaff } = require("../middlewares");

const router = Router();

router.post("/", isAuth, isStaff, QuestionController.createQuestion);
router.put("/:id", isAuth, isStaff, QuestionController.updateQuestion);
router.delete("/:id", isAuth, isStaff, QuestionController.deleteQuestion);
router.get("/", isAuth, QuestionController.getAllQuestions);
router.get("/:id", isAuth, QuestionController.getQuestionById);

module.exports = router;
