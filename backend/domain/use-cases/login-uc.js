'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const createMediAddictedError = require('../errors/mediaddicted-error');
const userRepository = require('../repositories/user-repository');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validateSchema(payload) {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Attempts to login an user
 * @param {Object} accountData User account data
 * @returns {String} Auth token
 */
async function login(accountData) {
  try {
    await validateSchema(accountData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  const userProfileData = await userRepository.findByEmail(accountData.email);

  if (!userProfileData) {
    throw createMediAddictedError(404, 'Email not found in DB');
  }

  if (!userProfileData.verifiedAt) {
    throw createMediAddictedError(403, 'User not verified');
  }

  if (!(await bcrypt.compare(accountData.password, userProfileData.password))) {
    throw createMediAddictedError(401, 'Incorrect password');
  }

  const payloadJWT = {
    username: userProfileData.username,
    email: userProfileData.email,
    role: userProfileData.role,
  };
  const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
  const token = jwt.sign(payloadJWT, process.env.AUTH_JWT_SECRET, {
    expiresIn: jwtTokenExpiration,
  });
  return token;
}

module.exports = login;
