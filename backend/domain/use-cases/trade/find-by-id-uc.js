'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const checkAuth = require('../../auth/check-auth');
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
 * @param {String} auth Auth token
 * @returns {Object} Trade data
 */
async function findByID(queryData, auth) {
  const { role } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  try {
    await validate(queryData);
  } catch (err) {
    throw createMediAddictedError(400, err.details[0].message);
  }

  return tradeRepository.findByID(queryData.id);
}

module.exports = findByID;
