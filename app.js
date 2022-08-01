require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { isAuth } = require('./middlewares/auth');

const app = express();
app.use(helmet());
const { NODE_ENV, PORT = 3000, MONGO_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(requestLogger);

const allowedCors = [
  'https://moviesbb.nomoredomains.xyz',
  'http://moviesbb.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
];
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);

app.use('/users', isAuth, usersRouter);
app.use('/movies', isAuth, moviesRouter);

app.use('*', isAuth, (req, res) => { // eslint-disable-line no-unused-vars
  throw new NotFoundError('Страницы не существует');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: 'Что-то пошло не так' });
});

app.listen(PORT);
