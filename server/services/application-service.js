const { Application } = require("../models");
const ApiError = require("../exceptions/api-error.js");

class ApplicationService {
  async createApplication(applicationData) {
    const application = await Application.create(applicationData);

    return application;
  }

  async updateApplication(application_id, newData) {
    const application = await Application.findByPk(application_id);

    if (!application) {
      throw ApiError.NotFound("Заявка не найдена");
    }

    await application.update(newData);

    return application;
  }

  async getApplicationById(application_id) {
    const application = await Application.findByPk(application_id);

    if (!application) {
      throw ApiError.NotFound("Заявка не найдена");
    }

    return application;
  }

  async getUserApplications(user_id) {
    const applications = await Application.findAll({
      where: { user_id },
    });

    if (!applications) {
      return { message: "Заявки не найдены" };
    }

    return applications;
  }

  async getAllApplications() {
    const application = await Application.findAll();

    return application;
  }

  async applicantChangeStatus(application_id) {
    const application = await Application.findByPk(application_id);

    if (!application) {
      throw ApiError.NotFound("Заявка не найдена");
    }

    await application.update({
      status: "pending",
    });

    return {
      message: `Заявка с ID ${application.application_id} успешно отправлена`,
    };
  }

  async staffChangeStatus(application_id, applicationData) {
    const { comment, status } = applicationData;

    if (!comment || !status) {
      throw ApiError.BadRequest("Отсутствует комментарий или статус заявки");
    }

    const validStatus = ["accepted", "rejected"];

    if (!validStatus.includes(status)) {
      throw ApiError.BadRequest("Неправильный статус заявки");
    }

    const application = await Application.findByPk(application_id);

    if (!application) {
      throw ApiError.NotFound("Заявка не найдена");
    }

    if (application.status !== "pending") {
      throw ApiError.BadRequest("Нельзя изменить статус заявки");
    }

    await application.update({
      comment,
      status,
    });

    return { message: "Статус заявки изменен" };
  }

  async deleteApplication(application_id) {
    const application = await Application.findByPk(application_id);

    if (!application) {
      throw ApiError.NotFound("Заявка не найдена");
    }

    await application.destroy();

    return { message: "Заявка успешно удалена" };
  }
}

module.exports = new ApplicationService();
