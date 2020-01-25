'use strict';

const db = require('../../src/integration/db.js');
const Game = require('../../src/integration/models/game.js');

module.exports = {
  clearGames: () => {
    db.games = [];
  },
  getGames: () => {
    return db.games;
  },
  createTestGame: () => {
    const game = new Game(5, 5, 0);
    db.games.push(game);
    return game;
  },
};
