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
    page: Joi.number()
      .positive()
      .optional(),
    limit: Joi.number()
      .positive()
      .optional()
  };

  return Joi.validate(payload, schema);
}

/**
 * Gets all the reviews using pagination
 * @param {Object} queryData Object with optional page and limit properties
 * @returns {Object} Review's data
 */
async function getByPage(queryData) {
  try {
    await validate(queryData);
  } catch (err) {
    throw createMediAddictedError(400, err.details[0].message);
  }

  let { page, limit } = queryData;
  if (page) {
    page = +page;
  }
  if (limit) {
    limit = +limit;
  }
  return reviewRepository.getByPage(page, limit);
}

module.exports = getByPage;
