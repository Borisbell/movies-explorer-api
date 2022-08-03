const { UNAUTH_ERR, UNAUTH_ERR_MESSAGE } = require('../helpers/constants');

class UnAuthError extends Error {
  constructor(message = UNAUTH_ERR_MESSAGE) {
    super(message);
    this.statusCode = UNAUTH_ERR;
    this.message = message;
  }
}

module.exports = UnAuthError;
