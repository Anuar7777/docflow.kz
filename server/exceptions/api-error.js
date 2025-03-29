class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static Forbidden() {
    return new ApiError(403, "Доступ запрещен");
  }

  static NotFound(message = "Ресурс не найден") {
    return new ApiError(404, message);
  }
}

module.exports = ApiError;
