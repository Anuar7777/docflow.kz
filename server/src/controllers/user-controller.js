const UserService = require("../services/user-service.js");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error.js");

class UserController {
  async signUp(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const { email, password } = req.body;
      const userData = await UserService.signUp(email, password);

      res.cookie("refreshToken", userData.refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.signIn(email, password);

      res.cookie("refreshToken", userData.refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 1000,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async signOut(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await UserService.signOut(refreshToken);
      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {}

  async refresh(req, res, next) {}

  async getUserById(req, res, next) {
    try {
      const user_id = req.params.id;
      const user = await UserService.getUserById(user_id);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();

      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;

      const userData = await UserService.deleteUser(id);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
