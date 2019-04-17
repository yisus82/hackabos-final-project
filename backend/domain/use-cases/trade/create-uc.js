'use strict';

const Joi = require('joi');
const checkAuth = require('../../auth/check-auth');
const createMediAddictedError = require('../../errors/mediaddicted-error');
const tradeRepository = require('../../repositories/trade-repository');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validateSchema(payload) {
  const schema = {
    title: Joi.string().required(),
    text: Joi.string().required()
  };

  return Joi.validate(payload, schema);
}

/**
 * Creates a trade
 * @param {Object} tradeData Trade's data
 * @param {String} auth Auth token
 * @returns {Object} null if OK
 */
async function create(tradeData, auth) {
  const { role, username } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  try {
    await validateSchema(tradeData);
  } catch (err) {
    throw createMediAddictedError(400, err.details[0].message);
  }

  await tradeRepository.create(tradeData.title, tradeData.text, username);

  return null;
}

module.exports = create;
