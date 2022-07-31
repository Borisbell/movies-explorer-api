require('dotenv').config();
const express = require('express');
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
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/movies_explorer_db');

app.use(bodyParser.json());
app.use(requestLogger);

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})