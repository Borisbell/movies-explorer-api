const { NOT_FOUND, NOT_FOUND_MESSAGE } = require('../helpers/constants');

class NotFoundError extends Error {
  constructor(message = NOT_FOUND_MESSAGE) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.message = message;
  }
}

module.exports = NotFoundError;
