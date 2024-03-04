// routes.js
'use strict';
const express = require('express');
const butterflyRoutes = require('./routes/butterflyRoutes');
const userRoutes = require('./routes/userRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

function configureRoutes(db) {
  const router = express.Router();

  // Use the route files
  router.use('/butterflies', butterflyRoutes(db));
  router.use('/users', userRoutes(db));
  router.use('/ratings', ratingRoutes(db));

  return router;
}

module.exports = configureRoutes;
