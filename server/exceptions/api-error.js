module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new this(401, 'Unauthorized user');
  }

  static BadRequest(message, errors = []) {
    return new this(400, message, errors);
  }
}