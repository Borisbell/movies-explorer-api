const jwt = require('jsonwebtoken');
const { DEV_SECRET_KEY } = require('./config');

const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (payload) => jwt.sign(
  payload,
  NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_KEY,
  { expiresIn: '7d' },
);
const checkToken = (token) => jwt.verify(
  token,
  NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_KEY,
);

module.exports = { generateToken, checkToken };
