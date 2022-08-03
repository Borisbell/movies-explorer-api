const { CONFLICT_ERR, CONFLICT_ERR_MESSAGE } = require('../helpers/constants');

class ConflictError extends Error {
  constructor(message = CONFLICT_ERR_MESSAGE) {
    super(message);
    this.statusCode = CONFLICT_ERR;
    this.message = message;
  }
}

module.exports = ConflictError;
