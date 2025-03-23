const { Question } = require("../models");
const ApiError = require("../exceptions/api-error.js");

class QuestionService {
  async createQuestion(questionData) {
    const question = await Question.create(questionData);

    return question;
  }

  async updateQuestion(question_id, newData) {
    const question = await Question.findByPk(question_id);

    if (!question) {
      throw ApiError.NotFound("Вопрос не найден");
    }

    await question.update(newData);
    return question;
  }

  async deleteQuestion(question_id) {
    const question = await Question.findByPk(question_id);

    if (!question) {
      throw ApiError.NotFound("Вопрос не найден");
    }

    await question.destroy();

    return { message: "Вопрос успешно удален" };
  }

  async getAllQuestions() {
    const questions = await Question.findAll();

    return questions;
  }

  async getQuestionById(question_id) {
    const question = await Question.findByPk(question_id);

    if (!question) {
      throw ApiError.NotFound("Вопрос не найден");
    }

    return question;
  }
}

module.exports = new QuestionService();
