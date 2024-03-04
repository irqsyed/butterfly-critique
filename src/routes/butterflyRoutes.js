// butterflyRoutes.js
'use strict';
const express = require('express');
const shortid = require('shortid');
const ERRORS = require('../errors');
const { validateButterfly } = require('../helpers/validators');

function configureButterflyRoutes(db) {
  const butterflyRouter = express.Router();

  /**
   * Get an existing butterfly
   * GET
   */
  butterflyRouter.get('/query/butterflyById/:butterflyId', async (req, res) => {
    try {
      // Check if the Butterfly exists
      const butterfly = await db.get('butterflies')
        .find({ butterflyId: req.params.butterflyId })
        .value();

      // Validation checks - Butterfly not found
      if (!butterfly) {
        return res.status(404).json({ error: ERRORS.BUT01.error });
      }

      // Success the response
      res.status(200).json({ data: butterfly });
    } catch (error){ // Error response
      console.error(error);
      return res.status(500).json({ error: ERRORS.BUT02.error });
    }
  });


  /**
   * Create a new butterfly
   * POST
   */
  butterflyRouter.post('/command/createButterfly', async (req, res) => {

    // Validation checks - Request Body Required Fields
    try {
      validateButterfly(req.body);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: ERRORS.BUT01.error });
    }
    try {

      // Generate Unique Butterfly Id
      const newButterfly = {
        butterflyId: shortid.generate(),
        ...req.body
      };

      // Create Butterfly Record in Database
      await db.get('butterflies')
        .push(newButterfly)
        .write();

      // Success the response
      res.status(200).json({
        message: 'Request processed successfully',
        data: { butterflyId: newButterfly.butterflyId }
      });
    } catch (error) { // Error response
      console.error(error);
      return res.status(500).json({ error: ERRORS.BUT02.error });
    }
  });


  return butterflyRouter;
}

module.exports = configureButterflyRoutes;
