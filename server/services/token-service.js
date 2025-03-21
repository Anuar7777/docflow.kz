const jwt = require("jsonwebtoken");
const { Token } = require("../models");
const ApiError = require("../exceptions/api-error.js");

class TokenService {
  generateToken(payload) {
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async saveToken(user_id, refresh_token) {
    const tokenData = await Token.findOne({ where: { user_id } });

    if (tokenData) {
      tokenData.refresh_token = refresh_token;
      return tokenData.save();
    }

    const token = await Token.create({ user_id, refresh_token });

    return token;
  }

  async deleteToken(refresh_token) {
    if (!refresh_token) {
      throw ApiError.NotFound("Refresh токен отсутствует");
    }

    const deletedCount = await Token.destroy({ where: { refresh_token } });

    if (!deletedCount) {
      throw ApiError.NotFound("Токен отсутствует в базе данных");
    }

    return { message: "Выход совершен успешно" };
  }
}

module.exports = new TokenService();
