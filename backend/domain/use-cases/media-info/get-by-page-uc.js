'use strict';

const Joi = require('joi');
const createMediAddictedError = require('../../errors/mediaddicted-error');
const mediaInfoRepository = require('../../repositories/media-info-repository');

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
      .optional(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Gets all the media infos using pagination
 * @param {Object} queryData Object with optional page and limit properties
 * @returns {Object} Media info's data
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
  return mediaInfoRepository.getByPage(page, limit);
}

module.exports = getByPage;
