'use strict';
const request = require('supertest');
const app = require('../src/api/app');
const server = request(app);
const db = require('./fixtures/db');
const {CELL_STATES, GAME_STATES} = require('../src/constants');

describe('POST /games', () => {

  beforeEach(db.clearGames);

  test('Can create a game with default parameters', async() => {
    const {body: game} = await server
      .post('/games')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(game.cells.length).toBe(game.cols * game.rows);

    expect(game.cells.filter(x => x.hasBomb).length).toBe(game.bombs);

    expect(db.getGames().some(x => x.id === game.id)).toBe(true);
  });

  test('Can\'t create a game with 0 rows', async() => {
    await server
      .post('/games')
      .send({rows: 0})
      .expect(400);

    expect(db.getGames().length).toBe(0);
  });

  test('Can\'t create a game with 0 cols', async() => {
    await server
      .post('/games')
      .send({cols: 0})
      .expect(400);

    expect(db.getGames().length).toBe(0);
  });

  test('Can\'t create a game with less than 0 bombs', async() => {
    await server
      .post('/games')
      .send({bombs: -1})
      .expect(400);

    expect(db.getGames().length).toBe(0);
  });

  test('Can\'t create a game with more bombs than (cells - 1)', async() => {
    await server
      .post('/games')
      .send({rows: 2, cols: 2, bombs: 5})
      .expect(400);

    expect(db.getGames().length).toBe(0);
  });
});

describe('GET /games/:gameId', () => {

  let testGame;

  beforeEach(() => {
    db.clearGames();
    testGame = db.createTestGame();
  });

  test('Can get a game by id', async() => {
    const {body: game} = await server
      .get(`/games/${testGame.id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(game.id).toBe(testGame.id);
  });

  test('If game is not found returns error 404', async() => {
    await server
      .get('/games/NOT_EXISTING_ID')
      .expect(404)
      .expect('Content-Type', /json/);
  });
});

describe('POST /games/:gameId/cells/:cellId/reveal', () => {
  let testGame;

  beforeEach(() => {
    db.clearGames();
    testGame = db.createTestGame();
  });

  test('If game is not found returns error 404', async() => {
    const gameId = 'NOT_EXISTING_GAME';
    const cellId = 'NOT_EXISTING_CELL';
    await server
      .post(`/games/${gameId}/cells/${cellId}/reveal`)
      .expect(404)
      .expect('Content-Type', /json/);
  });

  test('If cell is not found returns error 404', async() => {
    const gameId = testGame.id;
    const cellId = 'NOT_EXISTING_CELL';
    await server
      .post(`/games/${gameId}/cells/${cellId}/reveal`)
      .expect(404)
      .expect('Content-Type', /json/);
  });

  test('Can reveal a hidden cell', async() => {
    const gameId = testGame.id;
    const cellId = 0;
    const {body: game} = await server
      .post(`/games/${gameId}/cells/${cellId}/reveal`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(game.cells[cellId].state).toBe(CELL_STATES.REVEALED);
  });

  test('Revealed cells remain revealed', async() => {
    const gameId = testGame.id;
    const cellId = 4;
    const {body: game} = await server
      .post(`/games/${gameId}/cells/${cellId}/reveal`)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(game.cells[cellId].state).toBe(CELL_STATES.REVEALED);
  });

  test('Can reveal a cell tagged with flag', async() => {
    const gameId = testGame.id;
    const cellId = 9;
    const {body: game} = await server
      .post(`/games/${gameId}/cells/${cellId}/reveal`)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(game.cells[cellId].state).toBe(CELL_STATES.REVEALED);
  });

  test('Can reveal a cell tagged with question mark', async() => {
    const gameId = testGame.id;
    const cellId = 14;
    const {body: game} = await server
      .post(`/games/${gameId}/cells/${cellId}/reveal`)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(game.cells[cellId].state).toBe(CELL_STATES.REVEALED);
  });

  test('If no adjacent mines is revealed, all adjacent squares will be revealed (and repeat)', async() => {
    const gameId = testGame.id;
    const cellId = 0;
    const {body: game} = await server
      .post(`/games/${gameId}/cells/${cellId}/reveal`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(game.cells[0].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[1].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[2].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[3].state).toBe(CELL_STATES.HIDDEN);
    expect(game.cells[4].state).toBe(CELL_STATES.REVEALED);

    expect(game.cells[5].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[6].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[7].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[8].state).toBe(CELL_STATES.HIDDEN);
    expect(game.cells[9].state).toBe(CELL_STATES.TAGGED_FLAG);

    expect(game.cells[10].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[11].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[12].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[13].state).toBe(CELL_STATES.HIDDEN);
    expect(game.cells[14].state).toBe(CELL_STATES.TAGGED_QUESTION_MARK);

    expect(game.cells[15].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[16].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[17].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[18].state).toBe(CELL_STATES.HIDDEN);
    expect(game.cells[19].state).toBe(CELL_STATES.HIDDEN);

    expect(game.cells[20].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[21].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[22].state).toBe(CELL_STATES.REVEALED);
    expect(game.cells[23].state).toBe(CELL_STATES.HIDDEN);
    expect(game.cells[24].state).toBe(CELL_STATES.HIDDEN);
  });

  describe('Winning and Losing conditions', () => {
    beforeEach(() => {
      testGame = db.createAboutToWinGame();
    });

    test('When bomb is revealed, game is lost', async() => {
      const gameId = testGame.id;
      const cellId = 1;
      const {body: game} = await server
        .post(`/games/${gameId}/cells/${cellId}/reveal`)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(game.state).toBe(GAME_STATES.LOST);
    });

    test('On revealing last empty cell, game is won', async() => {
      const gameId = testGame.id;
      const cellId = 0;
      const {body: game} = await server
        .post(`/games/${gameId}/cells/${cellId}/reveal`)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(game.state).toBe(GAME_STATES.WON);
    });

  });
});
