'use strict';
const supertest = require('supertest');
const createApp = require('../src/index');
const constants = require('../src/helpers/constants');

describe('Butterfly API', () => {
  let app;

  beforeAll(async () => {
    // Create an instance of the app before tests
    app = await createApp(constants.DB_PATH);
  });

  afterAll(() => {
    // Close any resources, if needed, after all tests
  });

  test('GET / should return a welcome message', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Server is running!');
  });

  // Add more test cases for other routes and functionalities

  test('Non-existent Route should return a 404 status', async () => {
    const response = await supertest(app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});
