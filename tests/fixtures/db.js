'use strict';

const db = require('../../src/integration/db.js');
const Game = require('../../src/integration/models/game.js');
const {CELL_STATES} = require('../../src/constants');

module.exports = {
  clearGames: () => {
    db.games = [];
  },
  getGames: () => {
    return db.games;
  },
  createTestGame: () => {
    const game = new Game(5, 5, 0);

    game.cells[3].hasBomb = true;
    game.cells[8].hasBomb = true;
    game.cells[13].hasBomb = true;
    game.cells[18].hasBomb = true;
    game.cells[23].hasBomb = true;
    game.cells[4].state = CELL_STATES.REVEALED;
    game.cells[9].state = CELL_STATES.TAGGED_FLAG;
    game.cells[14].state = CELL_STATES.TAGGED_QUESTION_MARK;

    /* Test game
    +---+---+---+---+---+
    |   |   |   | B | R |
    +---+---+---+---+---+
    |   |   |   | B | F |
    +---+---+---+---+---+
    |   |   |   | B | ? |
    +---+---+---+---+---+
    |   |   |   | B |   |
    +---+---+---+---+---+
    |   |   |   | B |   |
    +---+---+---+---+---+
    */

    game.bombs = 5;
    db.games.push(game);
    return game;
  },
  createAboutToWinGame: () => {
    const game = new Game(1, 2, 0);

    game.cells[1].hasBomb = true;

    /* About-to-win Game
    +---+---+
    |   | B |
    +---+---+
    */

    game.bombs = 1;
    db.games.push(game);
    return game;
  },
};
