// ratingRoutes.js
'use strict';
const express = require('express');
const ERRORS = require('../errors');
const { validateRating } = require('../helpers/validators');

function configureRatingRoutes(db) {
  const ratingRouter = express.Router();

  // GET route to get user ratings
  ratingRouter.get('/query/userById/:userId', async (req, res) => {
    try {

      // Assuming User Validations upfront in Frontend (exists/not)
      const userId = req.params.userId;

      // Check if the user has any ratings
      const userRatings = db.get('userRatings').filter({ userId }).value();

      if (!userRatings || userRatings.length === 0) {
        return res.status(400).json({ error: 'User has not rated any butterflies' });
      }

      // Sort the user's ratings by userRating (descending order)
      const sortedRatings = userRatings.sort((a, b) => b.userRating - a.userRating);

      // Success response
      const response = sortedRatings.map(({ userId, butterflyId, userRating }) => ({ userId, butterflyId, userRating }));
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: ERRORS.BUT02.error });
    }
  });

  // POST route to rate a butterfly
  ratingRouter.post('/command/createRating', async (req, res) => {
    const { userId, butterflyId, userRating } = req.body;

    // Validation checks - Request Fields are missing
    try {
      validateRating(req.body);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: ERRORS.BUT01.error });
    }

    // Validation checks - Request Body is empty or invalid
    if (!userId || !butterflyId || userRating === undefined || userRating < 0 || userRating > 5) {
      return res.status(400).json({ error: ERRORS.BUT01.error });
    }

    try {
      const existingRatingIndex = db.get('userRatings').findIndex({ userId, butterflyId }).value();

      if (existingRatingIndex !== -1) {
        // If the user has already rated this butterfly, update the rating
        db.get('userRatings').find({ userId, butterflyId }).assign({ userRating }).write();
      } else {
        // Otherwise, store the new user's rating in the userRatings collection
        db.get('userRatings').push({ userId, butterflyId, userRating }).write();
      }

      // Success response
      res.status(200).json({
        message: 'Request processed successfully',
        data: { userRating, butterflyId }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: ERRORS.BUT02.error });
    }
  });

  return ratingRouter;
}

module.exports = configureRatingRoutes;
