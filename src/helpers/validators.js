'use strict';

const v = require('@mapbox/fusspot');

// Required Fields Validation for Butterfly Request
const validateButterfly = v.assert(
  v.strictShape({
    commonName: v.required(v.string),
    species: v.required(v.string),
    article: v.required(v.string)
  })
);

// Required Fields Validation for User Request
const validateUser = v.assert(
  v.strictShape({
    userName: v.required(v.string)
  })
);

// Required Fields Validation for Rating Request
const validateRating = v.assert(
  v.strictShape({
    userId: v.required(v.string),
    butterflyId: v.required(v.string),
    userRating: v.required(v.string)
  })
);

module.exports = {
  validateButterfly,
  validateUser,
  validateRating
};
