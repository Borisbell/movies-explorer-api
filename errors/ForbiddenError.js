const { FORBIDDEN_ERR, FORBIDDEN_ERR_MESSAGE } = require('../helpers/constants');

class ForbiddenError extends Error {
  constructor(message = FORBIDDEN_ERR_MESSAGE) {
    super(message);
    this.statusCode = FORBIDDEN_ERR;
    this.message = message;
  }
}

module.exports = ForbiddenError;
