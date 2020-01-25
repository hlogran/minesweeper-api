'use strict';

const uuidv1 = require('uuid/v1');
const {CELL_STATES} = require('../../constants');

module.exports = class Cell {
  constructor(row = 0, col = 0) {
    this.id = uuidv1();
    this.row = row;
    this.col = col;
    this.hidden = true;
    this.hasBomb = false;
    this.state = CELL_STATES.HIDDEN;
  }
};
