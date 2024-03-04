'use strict';
const express = require('express');
const supertest = require('supertest');
const configureRatingRoutes = require('../src/routes/ratingRoutes');
const mockDb = require('./mockDb'); // Import the mock database

const app = express();
app.use(express.json());
app.use(configureRatingRoutes(mockDb));

test('GET Rating - is valid userId', async () => {
  const userId = 'OOWzUaHLsK';
  const response = await supertest(app).get(`/query/userById/${userId}`);
  expect(response.status).toBe(200);
  expect(response.body[0].userRating).toBe('3');
  expect(response.body[0].userId).toBe('OOWzUaHLsK');
  expect(response.body[0].butterflyId).toBe('xRKSdjkBt4');
});

test('GET Rating - User has not rated any butterflies', async () => {
  const userId = 'OOOWzUaHLsK';
  const response = await supertest(app).get(`/query/userById/${userId}`);
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('User has not rated any butterflies');
});

test('POST Rating - create a new rating', async () => {
  const request = {
    userId: 'aqekk3t4kw',
    butterflyId: 'GI9_EuH8s1',
    userRating: '4'
  };
  const response = await supertest(app)
    .post('/command/createRating')
    .send(request);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('message', 'Request processed successfully');
  expect(response.body).toHaveProperty('data');

});

test('POST Rating - create rating request is invalid', async () => {
  const request = {
    userId: 'aqekk3t4kw'
  };

  const response = await supertest(app)
    .post('/command/createRating')
    .send(request);
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Invalid Request');

});


