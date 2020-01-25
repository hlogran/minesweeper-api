'use strict';
const gamesData = require('../integration/games.js');
const {GAME_STATES, CELL_STATES} = require('../constants');
const getAdjacentCells = require('../utils/getAdjacentCells');

module.exports = {
  add: (payload) => {
    const {cols, rows, bombs} = payload;
    return gamesData.add(cols, rows, bombs);
  },
  get: gameId => {
    return gamesData.get(gameId);
  },
  setCellState: function(gameId, cellId, state){
    const game = this.get(gameId);
    const cell = game.cells[cellId];
    cell.state = state;
    return cell;
  },
  setGameState: function(gameId, state){
    const game = this.get(gameId);
    game.state = state;
    return game;
  },
  revealCell: function(gameId, cellId){
    const game = this.get(gameId);
    const cell = this.setCellState(gameId, cellId, CELL_STATES.REVEALED);
      const adjacentCellsToReveal = getAdjacentCells(game.cells, cellId)
        .filter(x => {
          return (!x.hasBomb &&
                !x.adjacentBombs &&
                x.state !== CELL_STATES.REVEALED
          );
        });
      adjacentCellsToReveal.forEach(x => {
        const cellIndex = game.cells.findIndex(y => y.col === x.col && y.row === x.row);
        this.revealCell(gameId, cellIndex);
      });
    if (cell.hasBomb){
      return this.setGameState(gameId, GAME_STATES.LOST);
    } else {
      if (game.cells.filter(x => x.hasBomb).length ===
          game.cells.filter(x => x.state !== CELL_STATES.REVEALED).length
      ){
        return this.setGameState(gameId, GAME_STATES.WON);
      } else {
        return this.get(gameId);
      }
    }
  },
};
