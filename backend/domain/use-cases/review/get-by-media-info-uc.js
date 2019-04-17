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
    mediaInfo: Joi.objectId().required(),
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
 * Gets all the reviews from a media info using pagination
 * @param {Object} queryData Object with required media info id and
 * optional page and limit properties
 * @returns {Object} Review's data
 */
async function getByMediaInfo(queryData) {
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
  return reviewRepository.getByMediaInfo(queryData.mediaInfo, page, limit);
}

module.exports = getByMediaInfo;
