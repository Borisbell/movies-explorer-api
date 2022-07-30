const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateLink } = require('../helpers/validateLink');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateLink),
    }),
  }),
  createMovie,
);

router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;