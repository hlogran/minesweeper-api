'use strict';
const gameService = require('../../services/games.js');

module.exports = function getGame(req, res, next){
  try {
    const game = gameService.get(req.params.gameId);
    if (!game) {
      res.status(404).send({error: 'game not found'});
    } else {
      req.game = game;
      next();
    }
  } catch (error){
    res.status(400).send({error: error.message});
  }
};
