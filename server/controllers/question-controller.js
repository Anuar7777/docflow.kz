const QuestionService = require("../services/question-service.js");

class QuestionController {
  async createQuestion(req, res, next) {
    try {
      const questionData = req.body;

      questionData.created_by = req.user.user_id;
      questionData.updated_by = req.user.user_id;
      questionData.created_at = Date.now();
      questionData.updated_at = Date.now();

      const result = await QuestionService.createQuestion(questionData);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateQuestion(req, res, next) {
    try {
      const question_id = req.params.id;
      const newData = req.body;

      newData.updated_by = req.user.user_id;
      newData.updated_at = Date.now();

      const result = await QuestionService.updateQuestion(question_id, newData);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteQuestion(req, res, next) {
    try {
      const question_id = req.params.id;
      const questionData = await QuestionService.deleteQuestion(question_id);

      return res.json(questionData);
    } catch (error) {
      next(error);
    }
  }

  async getAllQuestions(req, res, next) {
    try {
      const questions = await QuestionService.getAllQuestions();

      return res.json(questions);
    } catch (error) {
      next(error);
    }
  }

  async getQuestionById(req, res, next) {
    try {
      const question_id = req.params.id;

      const question = await QuestionService.getQuestionById(question_id);

      return res.json(question);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuestionController();
