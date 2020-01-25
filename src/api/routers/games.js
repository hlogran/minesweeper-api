'use strict';

const express = require('express');
const router = new express.Router; ;
const gamesService = require('../../services/games.js');

// start a game
router.post('/games', (req, res) => {
  try {
    const game = gamesService.add(req.body);
    res.json(game);
  } catch (error){
    res.status(400).send({error: error.message});
  }
});

// get a game
router.get('/games/:gameId', (req, res) => {
  try {
    const game = gamesService.get(req.params.gameId);
    if(game){
        res.json(game);
    } else {
        res.status(404).send({error: 'game not found'});
    }
  } catch (error){
    res.status(400).send();
  }
});

// reveal a cell
router.get('/games/:gameId/cells/:cellId/reveal', (req, res) => {
  res.status(501).send({error: 'Not implemented'});
});

// tag a cell
router.get('/games/:gameId/cells/:cellId/reveal', (req, res) => {
  res.status(501).send({error: 'Not implemented'});
});

module.exports = router;
