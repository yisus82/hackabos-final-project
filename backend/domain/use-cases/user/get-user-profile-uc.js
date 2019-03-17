'use strict';

const Joi = require('joi');
const checkAuth = require('../../auth/check-auth');
const createMediAddictedError = require('../../errors/mediaddicted-error');
const userRepository = require('../../repositories/user-repository');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validate(payload) {
  const schema = {
    username: Joi.string()
      .regex(/^[a-z0-9]{5,20}$/)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Gets an user profile
 * @param {Object} queryData Object with an username property
 * @param {String} auth Auth token
 * @returns {Object} User's profile data
 */
async function getUserProfile(queryData, auth) {
  const { role } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  try {
    await validate(queryData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  return userRepository.getUserProfile(queryData.username);
}

module.exports = getUserProfile;
