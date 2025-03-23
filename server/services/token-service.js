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

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
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

  async findToken(token) {
    const tokenData = await Token.findOne({ where: { refresh_token: token } });
    return tokenData;
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
