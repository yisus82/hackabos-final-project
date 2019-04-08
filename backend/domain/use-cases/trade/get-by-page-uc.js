'use strict';

const Joi = require('joi');
const createMediAddictedError = require('../../errors/mediaddicted-error');
const tradeRepository = require('../../repositories/trade-repository');

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
 * Gets all the trades using pagination
 * @param {Object} queryData Object with optional page and limit properties
 * @returns {Object} Trade's data
 */
async function getByPage(queryData) {
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
  return tradeRepository.getByPage(page, limit);
}

module.exports = getByPage;
