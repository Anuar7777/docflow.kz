const ApiError = require("../exceptions/api-error");

module.exports = function checkRole(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      throw ApiError.Forbidden();
    }

    next();
  };
};
