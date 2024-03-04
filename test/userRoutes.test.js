'use strict';
const express = require('express');
const supertest = require('supertest');
const configureUserRoutes = require('../src/routes/userRoutes');
const mockDb = require('./mockDb'); // Import the mock database

const app = express();
app.use(express.json());
app.use(configureUserRoutes(mockDb));

test('GET User - is valid userId', async () => {
  const userId = 'OOWzUaHLsK';
  const response = await supertest(app).get(`/query/userById/${userId}`);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('data');
  expect(response.body.data.userId).toBe('OOWzUaHLsK');
});

test('GET User - User not found', async () => {
  const userId = 'OOW';
  const response = await supertest(app).get(`/query/userById/${userId}`);
  expect(response.status).toBe(404);
  expect(response.body.error).toBe('Invalid Request');
});

test('POST User - create a new user', async () => {
  const request = {
    userName: 'Will'
  };
  const response = await supertest(app)
    .post('/command/createUser')
    .send(request);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('message', 'Request processed successfully');
  expect(response.body).toHaveProperty('data');

});

test('POST UserId - create user request is invalid', async () => {
  const request = {
    user: 'Will'
  };
  const response = await supertest(app)
    .post('/command/createUser')
    .send(request);

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Invalid Request');

});


