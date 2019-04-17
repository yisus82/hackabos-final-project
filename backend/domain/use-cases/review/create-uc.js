'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const checkAuth = require('../../auth/check-auth');
const createMediAddictedError = require('../../errors/mediaddicted-error');
const reviewRepository = require('../../repositories/review-repository');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validateSchema(payload) {
  const schema = {
    title: Joi.string().required(),
    text: Joi.string().required(),
    mediaInfo: Joi.objectId().required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Creates a review
 * @param {Object} reviewData Review's data
 * @param {String} auth Auth token
 * @returns {Object} null if OK
 */
async function create(reviewData, auth) {
  const { role, username } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  try {
    await validateSchema(reviewData);
  } catch (err) {
    throw createMediAddictedError(400, err.details[0].message);
  }

  await reviewRepository.create(reviewData.title, reviewData.text, username, reviewData.mediaInfo);

  return null;
}

module.exports = create;
