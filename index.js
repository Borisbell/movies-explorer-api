const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/movies_explorer_db');
const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})