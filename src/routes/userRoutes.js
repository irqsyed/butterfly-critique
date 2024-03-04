// userRoutes.js
'use strict';
const express = require('express');
const shortid = require('shortid');
const ERRORS = require('../errors');
const { validateUser } = require('../helpers/validators');

function configureUserRoutes(db) {
  const userRouter = express.Router();

  /**
   * Get an existing user
   * GET
   */
  userRouter.get('/query/userById/:userId', async (req, res) => {
    try {

      // Find the User
      const user = await db.get('users')
        .find({ userId: req.params.userId })
        .value();

      // Validation checks - User Not Found
      if (!user) {
        return res.status(404).json({ error: ERRORS.BUT01.error });
      }

      // Success the response
      res.status(200).json({ data: user });
    } catch (error) { // Error response
      console.error(error);
      return res.status(500).json({ error: ERRORS.BUT02.error });
    }
  });

  /**
   * Create a new user
   * POST
   */
  userRouter.post('/command/createUser', async (req, res) => {

    // Validation checks - Request Fields are missing
    try {
      validateUser(req.body);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: ERRORS.BUT01.error });
    }

    try {
      const newUser = {
        userId: shortid.generate(),
        ...req.body
      };

      await db.get('users')
        .push(newUser)
        .write();

      // Success the response
      res.json({
        message: 'Request processed successfully',
        data: { userId: newUser.userId }
      });
    } catch (error) { // Error response
      console.error(error);
      return res.status(500).json({ error: ERRORS.BUT02.error });
    }
  });

  return userRouter;
}

module.exports = configureUserRoutes;
