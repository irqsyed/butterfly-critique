'use strict';
const { validateButterfly, validateUser, validateRating } = require('../src/helpers/validators');

describe('validateButterfly', () => {
  const validButterfly = {
    commonName: 'Butterfly Name',
    species: 'Species name',
    article: 'http://example.com/article'
  };

  it('is ok for a valid butterfly', () => {
    const result = validateButterfly(validButterfly);
    expect(result).toBe(undefined);
  });

  it('throws an error when invalid', () => {
    expect(() => {
      validateButterfly({});
    }).toThrow('The following properties have invalid values:');

    expect(() => {
      validateButterfly({
        ...validButterfly,
        commonName: 123
      });
    }).toThrow('commonName must be a string.');

    expect(() => {
      validateButterfly({
        extra: 'field',
        ...validButterfly
      });
    }).toThrow('The following keys are invalid: extra');
  });
});

describe('validateUser', () => {
  const validUser = {
    userName: 'test-user'
  };

  it('is ok for a valid user', () => {
    const result = validateUser(validUser);
    expect(result).toBe(undefined);
  });

  it('throws an error when invalid', () => {
    expect(() => {
      validateUser({});
    }).toThrow('userName is required');

    expect(() => {
      validateUser({
        extra: 'field',
        ...validUser
      });
    }).toThrow('The following keys are invalid: extra');

    expect(() => {
      validateUser({
        userName: [555]
      });
    }).toThrow('userName must be a string');
  });
});

describe('validateRating', () => {
  const validRating = {
    userId: 'test-user',
    butterflyId: 'test-butterfly',
    userRating: '1'
  };

  it('is ok for a valid rating', () => {
    const result = validateRating(validRating);
    expect(result).toBe(undefined);
  });

  it('throws an error when invalid', () => {
    expect(() => {
      validateRating({});
    }).toThrow('userId: userId is required.');

    expect(() => {
      validateRating({
        extra: 'field',
        ...validRating
      });
    }).toThrow('The following keys are invalid: extra');

    expect(() => {
      validateRating({
        userId: [555]
      });
    }).toThrow('userId must be a string');
  });
});
