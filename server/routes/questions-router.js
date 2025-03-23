const { Router } = require("express");
const QuestionController = require("../controllers/question-controller.js");
const { isAuth } = require("../middlewares");

const router = Router();

router.post("/", isAuth, QuestionController.createQuestion);
router.put("/:id", isAuth, QuestionController.updateQuestion);
router.delete("/:id", isAuth, QuestionController.deleteQuestion);
router.get("/", isAuth, QuestionController.getAllQuestions);
router.get("/:id", isAuth, QuestionController.getQuestionById);

module.exports = router;
