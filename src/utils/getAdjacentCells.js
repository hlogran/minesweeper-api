'use strict';

module.exports = function getAdjacentCells(cells, index){
  const cell = cells[index];
  const {row, col} = cell;
  return cells.filter(x => {
    return (
      (x.col !== col || x.row !== row) &&
          Math.abs(x.row - row) <= 1
          && Math.abs(x.col - col) <= 1
    );
  });
};
