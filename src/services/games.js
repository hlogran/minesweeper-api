'use strict';
const gamesData = require('../integration/games.js');
const {GAME_STATES, CELL_STATES} = require('../constants');

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
    const cell = this.setCellState(gameId, cellId, CELL_STATES.REVEALED);
    if (cell.hasBomb){
      return this.setGameState(gameId, GAME_STATES.LOST);
    } else {
      const game = this.get(gameId);
      if (game.cells.filter(x => x.hasBomb).length ===
          game.cells.filter(x => x.state !== CELL_STATES.REVEALED).length
      ){
        return this.setGameState(gameId, GAME_STATES.WON);
      } else {
        return game;
      }
    }
  },
};
