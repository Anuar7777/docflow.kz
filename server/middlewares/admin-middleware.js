const ApiError = require("../exceptions/api-error");

module.exports = function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    throw ApiError.Forbidden();
  }

  next();
};
