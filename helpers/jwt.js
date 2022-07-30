const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET_KEY = 'secret_key';

const generateToken = (payload) => jwt.sign(
  payload,
  NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
  { expiresIn: '7d' },
);
const checkToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { generateToken, checkToken };
