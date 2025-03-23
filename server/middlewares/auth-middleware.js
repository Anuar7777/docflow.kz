const ApiError = require("../exceptions/api-error.js");
const TokenService = require("../services/token-service.js");

module.exports = function isAuth(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw ApiError.UnauthorizedError();
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
