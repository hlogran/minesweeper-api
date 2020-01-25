'use strict';

const uuidv1 = require('uuid/v1');
const Cell = require('./cell');

module.exports = class Game {
  constructor(rows = 5, cols = 5, bombs = 5) {
    if (rows < 1){
      throw new Error('Number of rows not valid');
    }

    if (cols < 1){
      throw new Error('Number of cols not valid');
    }

    if (bombs < 0){
      throw new Error('Number of bombs not valid');
    }

    if (bombs > (rows * cols - 1)){
      throw new Error('Number of bombs cant be higher than (rows * cols - 1)');
    }

    this.id = uuidv1();
    this.rows = rows;
    this.cols = cols;
    this.bombs = bombs;
    this.cells = [];

    for (let row = 0; row < rows; row++){
      for (let col = 0; col < cols; col++){
        this.cells.push(new Cell(row, col));
      }
    }

    while (bombs > 0){
      const i = Math.floor(this.cells.length * Math.random());
      if (!this.cells[i].hasBomb){
        this.cells[i].hasBomb = true;
        bombs--;
      }
    }
  }
};
