const isAuth = require("./auth-middleware");
const isAdmin = require("./admin-middleware");
const isVerified = require("./verify-middleware");
const isStaff = require("./staff-middleware");
const errorHandler = require("./error-middleware");

module.exports = {
  isAuth,
  isAdmin,
  isVerified,
  isStaff,
  errorHandler,
};
