'use strict';
const express = require('express');
const supertest = require('supertest');
const configureButterflyRoutes = require('../src/routes/butterflyRoutes');
const mockDb = require('./mockDb');

const app = express();
app.use(express.json());
app.use(configureButterflyRoutes(mockDb));

test('GET Butterfly - is valid butterfly', async () => {
  const butterflyId = 'GI9_EuH8s1';
  const response = await supertest(app).get(`/query/butterflyById/${butterflyId}`);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('data');
  expect(response.body.data).toHaveProperty('butterflyId');
});

test('GET Butterfly - is not found', async () => {
  const butterflyId = 'GI9_Eu1';
  const response = await supertest(app).get(`/query/butterflyById/${butterflyId}`);
  expect(response.status).toBe(404);
  expect(response.body.error).toBe('Invalid Request');
});

test('POST Butterfly - create a new butterfly', async () => {
  const request = {
    commonName: 'Question Mark',
    species: 'Polygonia interrogationis',
    article: 'https://www.butterfliesandmoths.org/'
  };

  const response = await supertest(app)
    .post('/command/createButterfly')
    .send(request);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('message', 'Request processed successfully');
  expect(response.body).toHaveProperty('data');
  expect(response.body.data).toHaveProperty('butterflyId');

});

test('POST Butterfly - is invalid create request', async () => {
  const request = {
    commonName: 'Question Mark'
  };

  const response = await supertest(app)
    .post('/command/createButterfly')
    .send(request);

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Invalid Request');

});


