'use strict';
const request = require('supertest');
const app = require('../src/api/app');
const server = request(app);
const db = require('./fixtures/db');

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
      .get('/games/NON_EXISTING_ID')
      .expect(404)
      .expect('Content-Type', /json/);
  });
});
