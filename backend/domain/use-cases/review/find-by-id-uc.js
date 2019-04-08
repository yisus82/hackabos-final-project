'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const createMediAddictedError = require('../../errors/mediaddicted-error');
const reviewRepository = require('../../repositories/review-repository');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validate(payload) {
  const schema = {
    id: Joi.objectId().required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Finds a review using an id
 * @param {Object} queryData Object with an id property
 * @returns {Object} Review data
 */
async function findByID(queryData) {
  try {
    await validate(queryData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  return reviewRepository.findByID(queryData.id);
}

module.exports = findByID;
