const ApiError = require("../exceptions/api-error");

module.exports = function isVerified(req, res, next) {
  if (req.user.status !== "verified") {
    throw ApiError.Forbidden();
  }

  next();
};
