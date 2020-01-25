'use strict';
module.exports = function getCell(req, res, next){
  try {
    const game = req.game;
    if (!game) {
      res.status(404).send({error: 'game not found'});
    } else {
      const cellIndex = req.params.cellId = Number(req.params.cellId);
      const cell = game.cells[cellIndex];
      if (cell){
        req.cell = cell;
        next();
      } else {
        res.status(404).send({error: 'cell not found in game'});
      }
    }
  } catch (error){
    res.status(400).send({error: error.message});
  }
};
