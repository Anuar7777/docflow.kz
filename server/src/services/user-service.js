const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const MailService = require("./mail-service.js");
const TokenService = require("./token-service.js");
const UserDto = require("../dtos/user-dto.js");
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
      `${process.env.API_URL}/api/auth/activate/${verification_token}`
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
}

module.exports = new UserService();
