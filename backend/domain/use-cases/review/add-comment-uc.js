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
    reviewID: Joi.objectId().required(),
    text: Joi.string().required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Adds a comment to a review
 * @param {Object} commentData Comment's data
 * @param {String} auth Auth token
 * @returns {Object} null if OK
 */
async function addComment(commentData, auth) {
  const { role, username } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  try {
    await validateSchema(commentData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  await reviewRepository.addComment(commentData.reviewID, commentData.text, username);

  return null;
}

module.exports = addComment;
