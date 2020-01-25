'use strict';
const db = require('./db');
const Game = require('./models/game');

module.exports = {
  add: (rows, cols, bombs) => {
    const game = new Game(rows, cols, bombs);
    db.games.push(game);
    return game;
  },
  get: gameId => {
    return db.games.find(x => x.id === gameId);
  },
};
