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
      country: Joi.string().required().min(2).max(56),
      duration: Joi.number().integer().required(),
      director: Joi.string().required().min(2),
      year: Joi.number().integer().required().min(1888),
      description: Joi.string().required().min(2),
      image: Joi.string().required().custom(validateLink),
      trailerLink: Joi.string().required().custom(validateLink),
      thumbnail: Joi.string().required().custom(validateLink),
      movieId: Joi.number().integer().required(),
      nameRU: Joi.string().required().min(2),
      nameEN: Joi.string().required().min(2),
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
