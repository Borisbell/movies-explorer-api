const { BAD_REQUEST, BAD_REQUEST_MESSAGE } = require('../helpers/constants');

class BadRequestError extends Error {
  constructor(message = BAD_REQUEST_MESSAGE) {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.message = message;
  }
}

module.exports = BadRequestError;
