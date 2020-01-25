'use strict';

const db = require('../../src/integration/db.js');
const Game = require('../../src/integration/models/game.js');
const {CELL_STATES} = require('../../src/constants');
const getAdjacentCells = require('../../src/utils/getAdjacentCells');

module.exports = {
  clearGames: () => {
    db.games = [];
  },
  getGames: () => {
    return db.games;
  },
  createTestGame: function() {
    const game = new Game(5, 5, 0);

    this.addBombToCell(game, 3);
    this.addBombToCell(game, 8);
    this.addBombToCell(game, 13);
    this.addBombToCell(game, 18);
    this.addBombToCell(game, 23);
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

    db.games.push(game);
    return game;
  },
  createAboutToWinGame: function() {
    const game = new Game(1, 2, 0);

    this.addBombToCell(game, 1);

    /* About-to-win Game
    +---+---+
    |   | B |
    +---+---+
    */

    db.games.push(game);
    return game;
  },
  addBombToCell(game, cellId){
    game.cells[cellId].hasBomb = true;
    game.bombs++;
    getAdjacentCells(game.cells, cellId).forEach(x => x.adjacentBombs++);
  },
};
