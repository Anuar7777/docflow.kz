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

  async activate(req, res, next) {
    try {
      const verification_token = req.params.link;
      await UserService.activate(verification_token);
      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user_id = req.params.id;

      if (req.user.user_id !== user_id && req.user.role !== "admin") {
        throw ApiError.Forbidden();
      }

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
      const user_id = req.params.id;

      if (req.user.user_id !== user_id) {
        throw ApiError.Forbidden();
      }

      const result = await UserService.deleteUser(user_id);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const user_id = req.params.id;
      const { role } = req.body;

      const result = await UserService.updateUserRole(user_id, role);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async blockUser(req, res, next) {
    try {
      const user_id = req.params.id;
      const result = await UserService.blockUser(user_id);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async unblockUser(req, res, next) {
    try {
      const user_id = req.params.id;
      const result = await UserService.unblockUser(user_id);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
