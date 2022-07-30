const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const Card = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  const owner = req.user._id;
  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.message === 'CastError' || 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else { next(err); }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new Error('NotFound'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нет прав на удаление карточки'));
      }
      return Movie.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send(deletedCard))
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден'));
      } else { next(err); }
    });
};