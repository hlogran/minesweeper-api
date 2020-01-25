'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const gamesRouter = require('./routers/games');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use(gamesRouter);

module.exports = app;
