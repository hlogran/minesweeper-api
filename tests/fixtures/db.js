'use strict';

const db = require('../../src/integration/db.js');

module.exports = {
  clearGames: () => {
    db.games = [];
  },
  getGames: () => {
    return db.games;
  },
};
