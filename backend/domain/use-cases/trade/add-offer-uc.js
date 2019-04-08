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
async function validateSchema(payload) {
  const schema = {
    tradeID: Joi.objectId().required(),
    text: Joi.string().required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Adds an offer to a trade
 * @param {Object} offerData Offer's data
 * @param {String} auth Auth token
 * @returns {Object} null if OK
 */
async function addOffer(offerData, auth) {
  const { role, username } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  try {
    await validateSchema(offerData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  await tradeRepository.addOffer(offerData.tradeID, offerData.text, username);

  return null;
}

module.exports = addOffer;
