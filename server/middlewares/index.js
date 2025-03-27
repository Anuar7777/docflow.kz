const isAuth = require("./auth-middleware");
const isVerified = require("./verify-middleware");
const checkRole = require("./role-middleware");
const errorHandler = require("./error-middleware");

module.exports = {
  isAuth,
  isVerified,
  checkRole,
  errorHandler,
};
