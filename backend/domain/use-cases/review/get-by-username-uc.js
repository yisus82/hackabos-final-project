'use strict';

const Joi = require('joi');
const createMediAddictedError = require('../../errors/mediaddicted-error');
const reviewRepository = require('../../repositories/review-repository');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validate(payload) {
  const schema = {
    username: Joi.string().required(),
    page: Joi.number()
      .positive()
      .optional(),
    limit: Joi.number()
      .positive()
      .optional(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Gets all the reviews from a user using pagination
 * @param {Object} queryData Object with required username and
 * optional page and limit properties
 * @returns {Object} Review's data
 */
async function getByUsername(queryData) {
  try {
    await validate(queryData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  let { page, limit } = queryData;
  if (page) {
    page = +page;
  }
  if (limit) {
    limit = +limit;
  }
  return reviewRepository.getByUsername(queryData.username, page, limit);
}

module.exports = getByUsername;
