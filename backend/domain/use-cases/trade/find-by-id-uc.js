'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const createMediAddictedError = require('../../errors/mediaddicted-error');
const tradeRepository = require('../../repositories/trade-repository');

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
 * Finds a trade using an id
 * @param {Object} queryData Object with an id property
 * @returns {Object} Trade data
 */
async function findByID(queryData) {
  try {
    await validate(queryData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  return tradeRepository.findByID(queryData.id);
}

module.exports = findByID;
