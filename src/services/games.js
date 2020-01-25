'use strict';
const gamesData = require('../integration/games.js');

module.exports = {
  add: (payload) => {
    const {cols, rows, bombs} = payload;
    return gamesData.add(cols, rows, bombs);
  },
  get: gameId => {
    return gamesData.get(gameId);
  },
};
