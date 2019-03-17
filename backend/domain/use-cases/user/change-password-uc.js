'use strict';

const bcrypt = require('bcrypt');
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
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Gets an user profile
 * @param {Object} passwordData Object with a password property
 * @param {String} auth Auth token
 * @returns {Object} null if OK
 */
async function changePassword(passwordData, auth) {
  const { role, username } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  try {
    await validate(passwordData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  const saltRounds = parseInt(process.env.AUTH_BCRYPT_SALT_ROUNDS, 10);
  const securePassword = await bcrypt.hash(passwordData.password, saltRounds);

  await userRepository.changePassword(username, securePassword);
  return null;
}

module.exports = changePassword;
