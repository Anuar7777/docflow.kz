const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const MailService = require("./mail-service.js");
const TokenService = require("./token-service.js");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error.js");
const { User } = require("../models");

class UserService {
  async signUp(email, password) {
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hash_password = await bcrypt.hash(password, 10);
    const verification_token = v4();

    const user = await User.create({
      email,
      password: hash_password,
      verification_token,
      role: "applicant",
      status: "pending",
      created_at: new Date(),
      updated_at: new Date(),
    });

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${verification_token}`
    );

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });

    await TokenService.saveToken(userDto.user_id, tokens.refresh_token);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async signIn(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest("Пользователь не зарегистрирован");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный email или пароль");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.user_id, tokens.refresh_token);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async signOut(refresh_token) {
    const token = await TokenService.deleteToken(refresh_token);

    return token;
  }

  async activate(verification_token) {
    const user = await User.findOne({ where: { verification_token } });

    if (!user) {
      throw ApiError.BadRequest("Неправильная или истекшая ссылка активации");
    }

    user.status = "verified";
    user.verification_token = null;
    user.updated_at = Date.now();

    await user.save();
  }

  async getUserById(user_id) {
    const user = await User.findByPk(user_id);

    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    return new UserDto(user);
  }

  async getAllUsers() {
    const users = await User.findAll();

    return users.map((user) => new UserDto(user));
  }

  async deleteUser(user_id) {
    const user = await User.findByPk(user_id);

    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    await user.destroy();

    return { message: "Пользователь успешно удален" };
  }

  async updateUserRole(user_id, newRole) {
    const user = await User.findByPk(user_id);

    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    if (user.status !== "verified") {
      throw ApiError.BadRequest(
        "Нельзя сменить роль неактивированного пользователя"
      );
    }

    const validRoles = ["applicant", "reviewer", "admin"];

    if (!validRoles.includes(newRole)) {
      throw ApiError.BadRequest("Некорректная роль");
    }

    user.role = newRole;
    await user.save();

    return {
      message: `Роль ${user.email} обновлена до ${newRole}`,
    };
  }

  async blockUser(user_id) {
    const user = await User.findByPk(user_id);

    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    if (user.status === "pending") {
      throw ApiError.BadRequest("Пользователь не верифицирован");
    }

    user.status = "blocked";
    user.save();

    return { message: `Пользователь ${user.email} заблокирован` };
  }

  async unblockUser(user_id) {
    const user = await User.findByPk(user_id);

    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    if (user.status === "pending") {
      throw ApiError.BadRequest("Пользователь не верифицирован");
    }

    user.status = "verified";
    user.save();

    return { message: `Пользователь ${user.email} разблокирован` };
  }
}

module.exports = new UserService();
