const validator = require('validator');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  duration: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => 'Неверный формат ссылки на изображение',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => 'Неверный формат ссылки на видео',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => 'Неверный формат ссылки на изображение',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('movie', movieSchema);