const ApplicationService = require("../services/application-service.js");

class ApplicationController {
  async createApplication(req, res, next) {
    try {
      const applicationData = req.body;

      applicationData.user_id = req.user.user_id;
      applicationData.created_at = Date.now();
      applicationData.updated_at = Date.now();

      const result = await ApplicationService.createApplication(
        applicationData
      );

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateApplication(req, res, next) {
    try {
      const application_id = req.params.id;
      const newData = req.body;

      newData.updated_at = Date.now();

      const result = await ApplicationService.updateApplication(
        application_id,
        newData
      );

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getApplicationById(req, res, next) {
    try {
      const application_id = req.params.id;

      const application = await ApplicationService.getApplicationById(
        application_id
      );

      return res.json(application);
    } catch (error) {
      next(error);
    }
  }

  async getUserApplications(req, res, next) {
    try {
      const user_id = req.user.user_id;
      const applications = await ApplicationService.getUserApplications(
        user_id
      );

      return res.json(applications);
    } catch (error) {
      next(error);
    }
  }

  async getAllApplications(req, res, next) {
    try {
      const applications = await ApplicationService.getAllApplications();

      return res.json(applications);
    } catch (error) {
      next(error);
    }
  }

  async applicantChangeStatus(req, res, next) {
    try {
      const application_id = req.params.id;

      const result = await ApplicationService.applicantChangeStatus(
        application_id
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async staffChangeStatus(req, res, next) {
    try {
      const application_id = req.params.id;
      const applicationData = req.body;

      if (applicationData.status === "accepted") {
        applicationData.comment = "Заявка одобрена";
      }

      const result = await ApplicationService.staffChangeStatus(
        application_id,
        applicationData
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteApplication(req, res, next) {
    try {
      const application_id = req.params.id;
      const applicationData = await ApplicationService.deleteApplication(
        application_id
      );

      return res.json(applicationData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ApplicationController();
