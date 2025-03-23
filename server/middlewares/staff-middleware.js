const ApiError = require("../exceptions/api-error.js");

module.exports = function isStaff(req, res, next) {
  const staff = ["admin", "reviewer"];
  if (!staff.includes(req.user.role)) {
    throw ApiError.Forbidden();
  }

  next();
};
