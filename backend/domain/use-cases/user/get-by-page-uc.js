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
    page: Joi.number()
      .positive()
      .optional(),
    limit: Joi.number()
      .positive()
      .optional()
  };

  return Joi.validate(payload, schema);
}

/**
 * Gets all the users using pagination
 * @param {Object} queryData Object with optional page and limit properties
 * @param {String} auth Auth token
 * @returns {Object} User's profile data
 */
async function getByPage(queryData, auth) {
  const { role } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

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
  return userRepository.getByPage(page, limit);
}

module.exports = getByPage;
